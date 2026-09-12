"""
Mood → Food Preference Mapper
Maps user's mood/emotional state to food categories and characteristics.
"""

from typing import Dict, List


MOOD_PROFILES: Dict[str, Dict] = {
    "tired": {
        "preferred_categories": ["South Indian", "Combos", "Snacks", "Beverages"],
        "preferred_mood_tags": ["comfort", "warm", "filling", "tired", "quick"],
        "avoid_tags": ["light", "diet"],
        "preferred_nutrients": "high-carb",
        "beverage_suggestion": "Masala Chai",
        "description": "warm and comforting food to restore energy",
        "emoji": "😴"
    },
    "stressed": {
        "preferred_categories": ["Desserts", "Snacks", "Beverages", "Combos"],
        "preferred_mood_tags": ["comfort", "sweet", "quick", "stressed", "nostalgic"],
        "avoid_tags": ["spicy", "heavy"],
        "preferred_nutrients": "comfort-carbs",
        "beverage_suggestion": "Masala Chai",
        "description": "comfort foods that ease tension",
        "emoji": "😤"
    },
    "happy": {
        "preferred_categories": ["Specials", "North Indian", "Chinese", "Desserts"],
        "preferred_mood_tags": ["celebratory", "indulgent", "happy", "fun"],
        "avoid_tags": ["diet", "plain"],
        "preferred_nutrients": "balanced",
        "beverage_suggestion": "Cold Coffee",
        "description": "celebratory and indulgent treats",
        "emoji": "😊"
    },
    "energetic": {
        "preferred_categories": ["Healthy", "South Indian", "Specials", "Beverages"],
        "preferred_mood_tags": ["energetic", "protein", "healthy", "light"],
        "avoid_tags": ["heavy", "indulgent"],
        "preferred_nutrients": "protein-rich",
        "beverage_suggestion": "Fresh Lime Soda",
        "description": "energising and protein-rich options",
        "emoji": "💪"
    },
    "hungry": {
        "preferred_categories": ["Combos", "North Indian", "Specials"],
        "preferred_mood_tags": ["filling", "hungry", "large", "energetic"],
        "avoid_tags": ["light", "small", "snack"],
        "preferred_nutrients": "high-calorie",
        "beverage_suggestion": "Lassi",
        "description": "large filling meals to satisfy serious hunger",
        "emoji": "🤩"
    },
    "celebratory": {
        "preferred_categories": ["Specials", "North Indian", "Desserts", "Beverages"],
        "preferred_mood_tags": ["celebratory", "indulgent", "happy", "fun", "sweet"],
        "avoid_tags": ["plain", "diet"],
        "preferred_nutrients": "treat",
        "beverage_suggestion": "Mango Shake",
        "description": "special treats for a festive mood",
        "emoji": "🎉"
    },
    "healthy": {
        "preferred_categories": ["Healthy", "South Indian", "Specials"],
        "preferred_mood_tags": ["healthy", "light", "protein", "diet", "refreshing"],
        "avoid_tags": ["indulgent", "fried", "heavy"],
        "preferred_nutrients": "low-calorie",
        "beverage_suggestion": "Buttermilk",
        "description": "nutritious and light options",
        "emoji": "🥗"
    },
    "light": {
        "preferred_categories": ["Healthy", "Snacks", "Beverages", "South Indian"],
        "preferred_mood_tags": ["light", "quick", "refreshing", "healthy"],
        "avoid_tags": ["heavy", "filling", "indulgent"],
        "preferred_nutrients": "low-calorie",
        "beverage_suggestion": "Fresh Lime Soda",
        "description": "light bites that won't slow you down",
        "emoji": "🌿"
    },
    "default": {
        "preferred_categories": ["South Indian", "North Indian", "Snacks", "Combos"],
        "preferred_mood_tags": ["comfort", "filling", "quick"],
        "avoid_tags": [],
        "preferred_nutrients": "balanced",
        "beverage_suggestion": "Masala Chai",
        "description": "popular well-balanced options",
        "emoji": "🍽️"
    }
}

# Keyword → mood mapping for NLU fallback
MOOD_KEYWORDS: Dict[str, List[str]] = {
    "tired": ["tired", "exhausted", "sleepy", "fatigue", "drained", "low energy", "weary"],
    "stressed": ["stressed", "anxious", "exam", "pressure", "tension", "worried", "nervous"],
    "happy": ["happy", "excited", "good mood", "great", "cheerful", "joyful"],
    "energetic": ["energetic", "active", "pumped", "workout", "gym", "exercise"],
    "hungry": ["hungry", "starving", "very hungry", "famished", "haven't eaten"],
    "celebratory": ["celebrate", "birthday", "party", "treat", "special", "occasion"],
    "healthy": ["healthy", "diet", "fitness", "nutritious", "clean eating", "weight loss"],
    "light": ["light", "not much", "small", "little", "quick", "just a bite"]
}


def detect_mood(text: str) -> str:
    """Detect mood from user input text using keyword matching."""
    text_lower = text.lower()
    for mood, keywords in MOOD_KEYWORDS.items():
        if any(kw in text_lower for kw in keywords):
            return mood
    return "default"


def get_mood_profile(mood: str) -> Dict:
    """Return food preference profile for a given mood."""
    return MOOD_PROFILES.get(mood.lower(), MOOD_PROFILES["default"])


def get_mood_score(item_mood_tags: List[str], mood: str) -> float:
    """Score how well an item matches the given mood (0–1)."""
    profile = get_mood_profile(mood)
    preferred = set(profile["preferred_mood_tags"])
    avoid = set(profile["avoid_tags"])

    # Penalise items with avoided tags
    if any(tag in avoid for tag in item_mood_tags):
        return 0.0

    matches = sum(1 for tag in item_mood_tags if tag in preferred)
    return matches / max(len(preferred), 1)
