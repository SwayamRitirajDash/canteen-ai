# CnteenAI — Intelligent College Canteen Recommendation System

> **TCS Hackathon 2026 — Use Case 15**
> An intelligent, conversational food recommendation portal for college students and faculty.

---

## 🚀 Quick Start

### 1. Backend

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Set your Gemini API key
copy .env.example .env
# Edit .env and add your GEMINI_API_KEY

# Run the server
python main.py
# API will be at http://localhost:8000
# Interactive docs at http://localhost:8000/docs
```

### 2. Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run the dev server
npm run dev
# App will be at http://localhost:5173
```

---

## 🏗️ Architecture

```
User Message → FastAPI /chat
  → Gemini extracts: budget, mood, dietary, cravings
  → FAISS semantic search over menu embeddings
  → Hard filter: budget + availability + dietary + allergies
  → Mood scoring: rank by mood-food affinity
  → Gemini generates friendly explanation
  → Returns: reply text + structured recommendation cards
```

## 🤖 AI Features

| Feature | Technology |
|---------|-----------|
| Natural language understanding | Gemini 1.5 Flash |
| Semantic craving search | FAISS + sentence-transformers |
| Mood-food mapping | Rule-based profile system |
| Budget filtering | Hard + soft (10% flex) |
| Combo optimization | Greedy main + beverage selector |
| Conversation memory | Session-based history (last 10 msgs) |

## 📂 Project Structure

```
canteen-ai/
├── backend/
│   ├── main.py              # FastAPI app
│   ├── data/menu.json       # 55-item synthetic menu
│   ├── models/              # Pydantic models
│   ├── services/
│   │   ├── llm_service.py   # Gemini wrapper
│   │   ├── recommender.py   # Core engine
│   │   ├── vector_search.py # FAISS semantic search
│   │   ├── budget_filter.py # Filtering logic
│   │   └── mood_mapper.py   # Mood → food mapping
│   └── routers/             # API routes
│
└── frontend/
    └── src/
        ├── components/
        │   ├── ChatWindow.jsx   # Main chat UI
        │   ├── MessageBubble.jsx
        │   ├── FoodCard.jsx     # Recommendation cards
        │   ├── MoodPicker.jsx
        │   ├── BudgetSlider.jsx
        │   └── QuickReplies.jsx
        └── pages/
            └── MenuPage.jsx     # Browse full menu
```

## 🧪 Example Conversations

> "I have ₹60 and I'm feeling tired after labs"
> → Recommends warm, filling, comfort foods within ₹60

> "Something spicy, veg only, quick"
> → Filters to veg + spicy + fast prep items

> "I want a full meal combo under ₹100"
> → Runs combo optimizer: main + beverage within budget

> "Paneer tikka please"
> → If unavailable → suggests similar alternatives

---

## 🔑 Getting a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key (free tier)
3. Add it to `backend/.env` as `GEMINI_API_KEY=your_key_here`
