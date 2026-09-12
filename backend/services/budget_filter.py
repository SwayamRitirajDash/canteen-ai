"""
Budget & Availability Filter
Applies hard and soft constraints to filter menu items.
"""

from typing import List, Tuple
from models.menu_item import MenuItem
from models.session import UserConstraints


BUDGET_FLEX = 0.45  # Allow up to 45% soft budget overflow for premium/stretch recommendations


def apply_hard_filters(items: List[MenuItem], constraints: UserConstraints) -> List[MenuItem]:
    """Remove items that strictly violate constraints."""
    filtered = []
    for item in items:
        # Skip unavailable items
        if not item.available:
            continue

        # Allow items within budget plus soft stretch margin (min +₹25 or +45%)
        if constraints.budget:
            max_allowed = max(constraints.budget + 25, constraints.budget * (1 + BUDGET_FLEX))
            if item.price > max_allowed:
                continue

        # Skip if dietary restrictions not met
        if constraints.dietary:
            tags_lower = [t.lower() for t in item.dietary_tags]
            needed = [d.lower() for d in constraints.dietary]
            if not all(n in tags_lower for n in needed):
                continue

        # Skip if ingredient allergy matches
        if constraints.allergies:
            ingr_lower = [i.lower() for i in item.ingredients]
            allergens = [a.lower() for a in constraints.allergies]
            if any(a in ingr_lower for a in allergens):
                continue

        # Skip if prep time exceeds available time
        if constraints.time_available and item.prep_time_mins > constraints.time_available:
            continue

        filtered.append(item)

    return filtered


def tag_budget_items(items: List[MenuItem], budget: float) -> List[Tuple[MenuItem, bool]]:
    """
    Return (item, is_over_budget) tuples.
    Items within budget: False. Items slightly over (soft flex): True.
    """
    result = []
    for item in items:
        over = item.price > budget if budget else False
        result.append((item, over))
    return result


def get_best_combo(items: List[MenuItem], budget: float) -> List[MenuItem]:
    """
    Find best value combo: one main + one beverage within budget.
    Uses greedy approach — highest rated main + highest rated affordable beverage.
    """
    mains = [i for i in items if i.category not in ("Beverages", "Desserts")]
    beverages = [i for i in items if i.category == "Beverages"]

    best_combo = []
    best_score = -1

    for main in sorted(mains, key=lambda x: x.rating, reverse=True)[:5]:
        remaining = budget - main.price
        affordable_bevs = [b for b in beverages if b.price <= remaining]
        if affordable_bevs:
            best_bev = max(affordable_bevs, key=lambda x: x.rating)
            score = main.rating * 0.7 + best_bev.rating * 0.3
            if score > best_score:
                best_score = score
                best_combo = [main, best_bev]

    return best_combo


def find_alternatives(
    unavailable_name: str,
    all_items: List[MenuItem],
    category: str,
    budget: float
) -> List[MenuItem]:
    """Find similar available items when a requested item is unavailable."""
    return [
        item for item in all_items
        if item.available
        and item.category == category
        and (budget is None or item.price <= budget)
        and item.name.lower() != unavailable_name.lower()
    ][:3]
