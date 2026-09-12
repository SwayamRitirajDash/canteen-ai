"""
LLM Service — Google Gemini API wrapper
Handles intent extraction and recommendation explanation generation for CnteenAI.
"""

import os
import json
import re
from typing import List, Dict, Any, Optional
try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

try:
    import google.generativeai as genai
    api_key = os.getenv("GEMINI_API_KEY", "")
    if api_key:
        genai.configure(api_key=api_key)
    HAS_GENAI = True
except Exception as e:
    genai = None
    HAS_GENAI = False
    print(f"[LLM] Notice: google-generativeai not active ({e}), running in rule/fallback mode.")

SYSTEM_PROMPT = """You are CnteenAI, an intelligent dining assistant for a college canteen.
Your job is to recommend meals based on the student's:
- Budget limit (in Indian Rupees ₹)
- Mood and dining preference (low energy, comfort food, high energy, clean/healthy, etc.)
- Dietary restrictions and allergies (pure vegetarian, vegan, gluten-free, nut allergies)
- Cravings or cuisine preferences
- Available break time before their next class

Personality: Professional, concise, warm, helpful, and natural. Avoid spamming cartoon emojis.

Rules:
1. Always ask for budget if not provided (it is critical for filtering)
2. Acknowledge the student's preference or mood with empathy
3. Be transparent about trade-offs (slightly over budget, preparation time)
4. Always provide alternatives if something is unavailable
5. Keep responses concise — maximum 2 to 3 sentences before the dishes
6. If budget is very low (< ₹30), prioritize affordable snacks like Samosa or Vada Pav
7. Never return empty — always suggest at least one suitable option
"""

EXTRACT_PROMPT = """Extract the following from the user's message as JSON. 
Return ONLY valid JSON with these keys (use null if not mentioned):
{
  "budget": <number or null>,
  "mood": <one of: tired, stressed, happy, energetic, hungry, celebratory, healthy, light, null>,
  "dietary": <array of strings from: vegetarian, vegan, gluten-free, or []>,
  "allergies": <array of ingredient names to avoid, or []>,
  "cravings": <string description of food craving or null>,
  "time_available": <number of minutes or null>,
  "wants_combo": <true/false>
}

User message: "{message}"

Respond with ONLY the JSON object, no markdown, no explanation."""


def _heuristic_extract(message: str) -> Dict[str, Any]:
    """Rule & regex-based constraint extraction fallback."""
    msg = message.lower()
    res: Dict[str, Any] = {
        "budget": None,
        "mood": None,
        "dietary": [],
        "allergies": [],
        "cravings": None,
        "time_available": None,
        "wants_combo": False
    }

    # Extract budget
    budget_patterns = [
        r"(?:budget(?:\s*of|\s*is|\s*:)?\s*(?:rs\.?|inr|₹)?\s*(\d+))",
        r"(?:(?:under|below|within|max|around|upto|less than)\s*(?:rs\.?|inr|₹)?\s*(\d+))",
        r"(?:(?:rs\.?|inr|₹)\s*(\d+))",
        r"(\d+)\s*(?:rs|rupees|bucks|inr)"
    ]
    for pattern in budget_patterns:
        match = re.search(pattern, msg)
        if match:
            for g in match.groups():
                if g:
                    res["budget"] = float(g)
                    break
            if res["budget"]:
                break

    # Extract cravings & goals
    if "protein" in msg or "high protein" in msg:
        res["cravings"] = "high protein"
    elif "spicy" in msg:
        res["cravings"] = "spicy"
    elif "sweet" in msg or "dessert" in msg:
        res["cravings"] = "sweet"
    elif "snack" in msg:
        res["cravings"] = "snack"

    # Extract dietary
    if "vegan" in msg:
        res["dietary"].append("vegan")
    elif "pure veg" in msg or "vegetarian" in msg or " veg " in msg:
        res["dietary"].append("vegetarian")

    # Extract mood
    for m in ["tired", "stressed", "happy", "energetic", "hungry", "celebratory", "healthy", "light"]:
        if m in msg:
            res["mood"] = m
            break

    # Extract combo
    if "combo" in msg or "meal" in msg:
        res["wants_combo"] = True

    return res


def extract_constraints(message: str) -> Dict[str, Any]:
    """Use Gemini to extract structured constraints from user message with rule fallback."""
    extracted = None
    if HAS_GENAI and os.getenv("GEMINI_API_KEY"):
        try:
            model = genai.GenerativeModel("gemini-1.5-flash")
            prompt = EXTRACT_PROMPT.format(message=message)
            response = model.generate_content(prompt)
            text = response.text.strip()
            text = re.sub(r"^```(?:json)?\s*", "", text)
            text = re.sub(r"\s*```$", "", text)
            extracted = json.loads(text)
        except Exception as e:
            print(f"[LLM] Gemini constraint extraction failed: {e}")

    fallback = _heuristic_extract(message)
    if not extracted:
        return fallback

    # Merge heuristic if Gemini missed critical budget
    if extracted.get("budget") is None and fallback.get("budget") is not None:
        extracted["budget"] = fallback["budget"]
    if not extracted.get("cravings") and fallback.get("cravings"):
        extracted["cravings"] = fallback["cravings"]
    if not extracted.get("mood") and fallback.get("mood"):
        extracted["mood"] = fallback["mood"]

    return extracted


def generate_recommendation_response(
    user_message: str,
    recommendations: List[Dict],
    constraints: Dict,
    history: List[Dict],
    fallback_mode: bool = False
) -> str:
    """Generate a clean conversational response with recommendations."""
    try:
        model = genai.GenerativeModel(
            "gemini-1.5-flash",
            system_instruction=SYSTEM_PROMPT
        )

        # Build context about recommendations
        rec_text = ""
        for i, rec in enumerate(recommendations[:3], 1):
            over = "(Slightly above budget)" if rec.get("over_budget") else ""
            rec_text += (
                f"{i}. **{rec['name']}** — ₹{rec['price']} | "
                f"Rating: {rec['rating']}/5 | Prep: {rec['prep_time_mins']} min "
                f"{over}\n"
                f"   {rec['description']}\n\n"
            )

        constraint_summary = []
        if constraints.get("budget"):
            constraint_summary.append(f"budget ₹{constraints['budget']}")
        if constraints.get("mood"):
            constraint_summary.append(f"preference: {constraints['mood']}")
        if constraints.get("dietary"):
            constraint_summary.append(f"dietary: {', '.join(constraints['dietary'])}")
        if constraints.get("cravings"):
            constraint_summary.append(f"craving: {constraints['cravings']}")

        context = ", ".join(constraint_summary) if constraint_summary else "general preferences"

        if fallback_mode:
            prompt = (
                f"The student asked: \"{user_message}\"\n\n"
                f"Their constraints: {context}\n\n"
                f"Some direct matches were over budget or unavailable. "
                f"Here are the best alternatives:\n{rec_text}\n\n"
                f"Write a brief, helpful response introducing these alternatives. Keep it clean and natural."
            )
        else:
            prompt = (
                f"The student asked: \"{user_message}\"\n\n"
                f"Their constraints: {context}\n\n"
                f"Top matches found:\n{rec_text}\n\n"
                f"Write a clean, concise response (2 sentences) explaining why the top recommendation suits their needs."
            )

        chat_history = []
        for msg in history[-4:]:
            chat_history.append({
                "role": msg["role"],
                "parts": [msg["content"]]
            })

        chat = model.start_chat(history=chat_history)
        response = chat.send_message(prompt)
        return response.text

    except Exception as e:
        print(f"[LLM] Response generation failed: {e}")
        return _fallback_response(recommendations, constraints)


def generate_no_results_response(user_message: str, constraints: Dict) -> str:
    """Generate a helpful response when no items match constraints."""
    try:
        model = genai.GenerativeModel(
            "gemini-1.5-flash",
            system_instruction=SYSTEM_PROMPT
        )
        prompt = (
            f"Student asked: \"{user_message}\"\n"
            f"Constraints: budget ₹{constraints.get('budget')}, "
            f"dietary: {constraints.get('dietary')}\n\n"
            f"No exact matches found. Write a clean 2-sentence response explaining this and asking if they would like to adjust the budget limit or explore other categories."
        )
        response = model.generate_content(prompt)
        return response.text
    except Exception:
        return (
            "I couldn't find exact matches within those strict constraints. "
            "Could you adjust your target budget or let me know if other categories work for you?"
        )


def _fallback_response(recommendations: List[Dict], constraints: Dict) -> str:
    """Rule-based clean fallback if LLM is offline."""
    if not recommendations:
        return "No exact matches found matching all criteria. Try adjusting the budget or dietary filters."
    top = recommendations[0]
    budget_str = f" within your ₹{int(constraints['budget'])} budget" if constraints.get("budget") else ""
    return (
        f"Here is a curated pick{budget_str}: **{top['name']}** at ₹{top['price']} "
        f"(Rating: {top['rating']}, ready in {top['prep_time_mins']} mins). "
        f"{top['description']}"
    )
