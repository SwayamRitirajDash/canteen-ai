"""Chat API router — /api/chat"""

from fastapi import APIRouter, HTTPException
from models.session import ChatRequest, ChatResponse
from services import recommender

router = APIRouter(prefix="/api", tags=["chat"])

# In-memory session store: { session_id: { history, constraints } }
_sessions: dict = {}


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Main conversational endpoint.
    Accepts a user message and conversation history,
    returns LLM reply + structured recommendations.
    """
    session_id = request.session_id

    # Retrieve or create session
    if session_id not in _sessions:
        _sessions[session_id] = {"history": [], "constraints": {}}

    session = _sessions[session_id]

    # Add user message to history
    history = session["history"]
    history.append({"role": "user", "content": request.message})

    # Run recommendation pipeline
    result = recommender.recommend(
        user_message=request.message,
        history=history,
        existing_constraints=session["constraints"]
    )

    # Save extracted constraints to session
    if result.get("constraints_extracted"):
        for k, v in result["constraints_extracted"].items():
            if v is not None:
                session["constraints"][k] = v

    # Add assistant reply to history
    history.append({"role": "model", "content": result["reply"]})

    # Trim history to last 10 messages
    session["history"] = history[-10:]

    return ChatResponse(
        session_id=session_id,
        reply=result["reply"],
        recommendations=result.get("recommendations", []),
        constraints_extracted=result.get("constraints_extracted", {})
    )


@router.delete("/chat/{session_id}")
async def clear_session(session_id: str):
    """Clear a chat session."""
    _sessions.pop(session_id, None)
    return {"message": "Session cleared"}
