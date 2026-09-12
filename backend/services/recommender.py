"""
Core Recommendation Engine
Orchestrates: LLM extraction → vector search → mood scoring → budget filter → LLM explanation
"""

import json
from typing import List, Dict, Any, Optional
from models.menu_item import MenuItem
from models.session import UserConstraints, RecommendedItem
from services import mood_mapper, budget_filter, vector_search, llm_service


# Global menu store (loaded once at startup)
_all_items: List[MenuItem] = []


def load_menu(items: List[MenuItem]):
    """Load menu items and build vector index."""
    global _all_items
    _all_items = items
    vector_search.build_index(items)
    print(f"[Recommender] Loaded {len(items)} menu items.")


def _score_item(item: MenuItem, constraints: UserConstraints) -> float:
    """Composite score: mood match + rating + budget proximity."""
    mood_score = mood_mapper.get_mood_score(item.mood_tags, constraints.mood or "default")
    rating_score = item.rating / 5.0
    
    # Budget proximity: closer to budget ceiling = higher score (use it up)
    if constraints.budget:
        budget_ratio = item.price / constraints.budget
        budget_score = 1.0 - abs(0.8 - budget_ratio)  # Sweet spot at 80% of budget
        budget_score = max(0.0, budget_score)
    else:
        budget_score = 0.5

    return (mood_score * 0.4) + (rating_score * 0.4) + (budget_score * 0.2)


def recommend(
    user_message: str,
    history: List[Dict],
    existing_constraints: Optional[Dict] = None
) -> Dict[str, Any]:
    """
    Main recommendation pipeline.
    Returns: { reply, recommendations, constraints_extracted }
    """
    # ── Step 1: Extract constraints from user message ──────────────────────
    raw = llm_service.extract_constraints(user_message)

    # Merge with existing session constraints (carry forward known info)
    if existing_constraints:
        for key, val in existing_constraints.items():
            if raw.get(key) is None and val is not None:
                raw[key] = val

    constraints = UserConstraints(
        budget=raw.get("budget"),
        mood=raw.get("mood") or mood_mapper.detect_mood(user_message),
        dietary=raw.get("dietary") or [],
        allergies=raw.get("allergies") or [],
        cravings=raw.get("cravings"),
        time_available=raw.get("time_available")
    )

    # ── Step 2: Semantic search for craving / general query ────────────────
    query = constraints.cravings or user_message
    semantic_candidates = vector_search.search(query, top_k=20)

    # Union with all items if semantic search returns few results
    candidate_pool = semantic_candidates if len(semantic_candidates) >= 10 else _all_items

    # ── Step 3: Apply hard filters ─────────────────────────────────────────
    filtered = budget_filter.apply_hard_filters(candidate_pool, constraints)

    fallback_mode = False
    if not filtered:
        # Relax dietary filter if nothing found
        relaxed_constraints = constraints.copy()
        relaxed_constraints.dietary = []
        filtered = budget_filter.apply_hard_filters(_all_items, relaxed_constraints)
        fallback_mode = True

    # ── Step 4: Score and rank ─────────────────────────────────────────────
    scored = sorted(filtered, key=lambda item: _score_item(item, constraints), reverse=True)

    # ── Step 5: Check combo request or budget mix ──────────────────────────
    wants_combo = raw.get("wants_combo", False) or "combo" in user_message.lower()
    combo_items: List[MenuItem] = []
    if wants_combo and constraints.budget:
        combo_items = budget_filter.get_best_combo(filtered, constraints.budget)

    if combo_items:
        top_items = combo_items
    elif constraints.budget:
        within_budget = [i for i in scored if i.price <= constraints.budget]
        over_budget_pool = [i for i in scored if i.price > constraints.budget]
        
        # Pick top 2 within budget + 1 high-value over-budget stretch option
        selected = []
        if within_budget:
            selected.extend(within_budget[:2])
        if over_budget_pool:
            # Sort over-budget pool by protein and rating for best upgrade value
            best_stretch = sorted(
                over_budget_pool,
                key=lambda x: (x.protein_g or 0) * 0.6 + x.rating * 4.0,
                reverse=True
            )[0]
            selected.append(best_stretch)
        
        # Fallback if less than 3
        for item in scored:
            if item not in selected and len(selected) < 3:
                selected.append(item)
        top_items = selected
    else:
        top_items = scored[:3]

    # ── Step 6: Build recommendation objects ───────────────────────────────
    recs: List[RecommendedItem] = []
    rec_dicts = []
    for item in top_items:
        is_over = bool(constraints.budget and item.price > constraints.budget)
        exceed_amt = round(item.price - constraints.budget, 2) if is_over else 0.0
        rec = RecommendedItem(
            item_id=item.id,
            name=item.name,
            price=item.price,
            category=item.category,
            rating=item.rating,
            prep_time_mins=item.prep_time_mins,
            dietary_tags=item.dietary_tags,
            calories=item.calories,
            protein_g=item.protein_g,
            description=item.description,
            reason=_build_reason(item, constraints, is_over),
            over_budget=is_over,
            exceed_amount=exceed_amt
        )
        recs.append(rec)
        rec_dicts.append({
            **rec.dict(),
            "over_budget": is_over,
            "exceed_amount": exceed_amt
        })

    # ── Step 7: Generate LLM conversational reply ──────────────────────────
    if not recs:
        reply = llm_service.generate_no_results_response(user_message, raw)
    else:
        reply = llm_service.generate_recommendation_response(
            user_message=user_message,
            recommendations=rec_dicts,
            constraints=raw,
            history=history,
            fallback_mode=fallback_mode
        )

    return {
        "reply": reply,
        "recommendations": [r.dict() for r in recs],
        "constraints_extracted": raw
    }


def _build_reason(item: MenuItem, constraints: UserConstraints, over_budget: bool) -> str:
    """Build a sharp, transparent 'WHY' rationale for why this item fits."""
    reasons = []

    # Protein rationale
    if item.protein_g and item.protein_g >= 14:
        reasons.append(f"High protein ({item.protein_g}g) power meal")
    elif item.protein_g and item.protein_g >= 8:
        reasons.append(f"Balanced {item.protein_g}g protein")

    # Budget rationale
    if constraints.budget and not over_budget:
        savings = int(constraints.budget - item.price)
        if savings > 0:
            reasons.append(f"Saves ₹{savings} under your ₹{int(constraints.budget)} budget")
        else:
            reasons.append(f"Exact match for your ₹{int(constraints.budget)} limit")
    elif over_budget:
        reasons.append(f"₹{int(item.price - constraints.budget)} over budget but top quality ⭐{item.rating}")

    # Mood / craving rationale
    if constraints.mood:
        profile = mood_mapper.get_mood_profile(constraints.mood)
        if any(tag in profile["preferred_mood_tags"] for tag in item.mood_tags):
            reasons.append(f"Optimal for feeling {constraints.mood}")

    # Speed & Calorie rationale
    if item.calories <= 300:
        reasons.append(f"Calorie-conscious ({item.calories} kcal)")
    if item.prep_time_mins <= 5:
        reasons.append(f"Ready in {item.prep_time_mins}m rush-friendly")

    return " • ".join(reasons) if reasons else f"Nutrient-dense {item.category} option with {item.calories} kcal & {item.protein_g}g protein"
