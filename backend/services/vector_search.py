"""
Vector Search Service using FAISS
Builds a semantic index over menu items for natural-language craving search.
"""

import json
import os
import numpy as np
from typing import List
from models.menu_item import MenuItem

# Lazy imports to avoid slow startup if not needed
_index = None
_items: List[MenuItem] = []
_model = None


def _load_model():
    global _model
    if _model is None:
        from sentence_transformers import SentenceTransformer
        _model = SentenceTransformer("all-MiniLM-L6-v2")
    return _model


def _item_to_text(item: MenuItem) -> str:
    """Convert a menu item to a rich text string for embedding."""
    return (
        f"{item.name}. {item.description}. "
        f"Category: {item.category}. "
        f"Tags: {', '.join(item.mood_tags + item.dietary_tags)}. "
        f"Ingredients: {', '.join(item.ingredients)}."
    )


def build_index(menu_items: List[MenuItem]):
    """Build FAISS index from all menu items."""
    global _index, _items
    _items = menu_items
    try:
        import faiss
        model = _load_model()
        texts = [_item_to_text(item) for item in menu_items]
        embeddings = model.encode(texts, show_progress_bar=False)
        embeddings = np.array(embeddings, dtype="float32")

        dimension = embeddings.shape[1]
        _index = faiss.IndexFlatIP(dimension)  # Inner product = cosine on normalized vecs
        faiss.normalize_L2(embeddings)
        _index.add(embeddings)
        print(f"[VectorSearch] FAISS index built with {len(menu_items)} items.")
    except Exception as e:
        print(f"[VectorSearch] Notice: FAISS vector indexing disabled ({e}). Using keyword matcher.")
        _index = None


def search(query: str, top_k: int = 10) -> List[MenuItem]:
    """Semantic search: return top_k most relevant items for query."""
    global _index, _items
    if not _items:
        return []

    if _index is not None:
        try:
            import faiss
            model = _load_model()
            query_embedding = model.encode([query], show_progress_bar=False)
            query_embedding = np.array(query_embedding, dtype="float32")
            faiss.normalize_L2(query_embedding)

            distances, indices = _index.search(query_embedding, top_k)
            results = []
            for idx in indices[0]:
                if 0 <= idx < len(_items):
                    results.append(_items[idx])
            return results
        except Exception as e:
            print(f"[VectorSearch] FAISS search fallback: {e}")

    # Fallback keyword match
    q_words = set(query.lower().split())
    scored = []
    for item in _items:
        text = _item_to_text(item).lower()
        score = sum(1 for w in q_words if w in text)
        if score > 0:
            scored.append((score, item))
    scored.sort(key=lambda x: x[0], reverse=True)
    return [item for _, item in scored[:top_k]] or _items[:top_k]
