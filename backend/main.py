"""
FastAPI Main Application — CanteenBot Backend
"""

import json
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.menu_item import MenuItem
from services import recommender
from routers import chat, menu as menu_router


def load_menu_data() -> list[MenuItem]:
    """Load menu from JSON file."""
    data_path = os.path.join(os.path.dirname(__file__), "data", "menu.json")
    with open(data_path, "r", encoding="utf-8") as f:
        raw = json.load(f)
    return [MenuItem(**item) for item in raw["items"]]


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup: load menu and build FAISS index."""
    print("[Startup] Loading menu data...")
    items = load_menu_data()
    recommender.load_menu(items)
    menu_router.set_menu(items)
    print(f"[Startup] Ready! {len(items)} items loaded.")
    yield
    print("[Shutdown] Goodbye!")


app = FastAPI(
    title="CanteenBot API",
    description="AI-powered college canteen recommendation system",
    version="1.0.0",
    lifespan=lifespan
)

# CORS — allow React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(chat.router)
app.include_router(menu_router.router)


@app.get("/")
async def root():
    return {
        "service": "CanteenBot API",
        "status": "running",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
