"""Menu API router — /api/menu"""

from fastapi import APIRouter, Query
from typing import List, Optional
from models.menu_item import MenuItem
from services import recommender as rec_service

router = APIRouter(prefix="/api", tags=["menu"])

# Will be set at startup from main.py
_menu_items: List[MenuItem] = []


def set_menu(items: List[MenuItem]):
    global _menu_items
    _menu_items = items


@router.get("/menu", response_model=List[MenuItem])
async def get_menu(
    category: Optional[str] = Query(None),
    dietary: Optional[str] = Query(None),
    max_price: Optional[float] = Query(None),
    available_only: bool = Query(True)
):
    """Get all menu items with optional filters."""
    items = _menu_items

    if available_only:
        items = [i for i in items if i.available]
    if category:
        items = [i for i in items if i.category.lower() == category.lower()]
    if dietary:
        items = [i for i in items if dietary.lower() in [t.lower() for t in i.dietary_tags]]
    if max_price:
        items = [i for i in items if i.price <= max_price]

    return items


@router.get("/menu/categories")
async def get_categories():
    """Get all unique categories."""
    cats = sorted(set(i.category for i in _menu_items))
    return {"categories": cats}


@router.get("/menu/{item_id}", response_model=MenuItem)
async def get_item(item_id: str):
    """Get a single menu item by ID."""
    for item in _menu_items:
        if item.id == item_id:
            return item
    from fastapi import HTTPException
    raise HTTPException(status_code=404, detail="Item not found")
