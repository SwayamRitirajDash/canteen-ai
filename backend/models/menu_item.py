from pydantic import BaseModel
from typing import List, Optional


class MenuItem(BaseModel):
    id: str
    name: str
    category: str
    price: float
    calories: int
    protein_g: Optional[int] = 10
    prep_time_mins: int
    dietary_tags: List[str]
    ingredients: List[str]
    mood_tags: List[str]
    available: bool
    rating: float
    portion: str
    description: str


class MenuResponse(BaseModel):
    canteen_name: str
    last_updated: str
    items: List[MenuItem]
