from pydantic import BaseModel
from typing import List, Optional, Dict, Any


class Message(BaseModel):
    role: str  # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    session_id: str
    message: str
    history: Optional[List[Message]] = []


class UserConstraints(BaseModel):
    budget: Optional[float] = None
    mood: Optional[str] = None
    dietary: Optional[List[str]] = []
    allergies: Optional[List[str]] = []
    cravings: Optional[str] = None
    time_available: Optional[int] = None  # minutes


class RecommendedItem(BaseModel):
    item_id: str
    name: str
    price: float
    category: str
    rating: float
    prep_time_mins: int
    dietary_tags: List[str]
    calories: int
    protein_g: Optional[int] = 10
    description: str
    reason: str  # why this item was recommended
    over_budget: Optional[bool] = False
    exceed_amount: Optional[float] = 0.0


class ChatResponse(BaseModel):
    session_id: str
    reply: str
    recommendations: Optional[List[RecommendedItem]] = []
    constraints_extracted: Optional[Dict[str, Any]] = {}
