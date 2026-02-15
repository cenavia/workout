"""
FastAPI endpoints for the workout chatbot.
"""

from contextlib import asynccontextmanager
from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from agents import agent


class ChatRequest(BaseModel):
    """Request model for chat endpoint."""
    message: str
    thread_id: str
    user_profile: Optional[dict] = None


class ChatResponse(BaseModel):
    """Response model for chat endpoint."""
    response: str
    thread_id: str
    workout_plan: Optional[dict] = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler."""
    yield


app = FastAPI(
    title="Workout Chatbot API",
    description="AI Workout Assistant with RAG capabilities",
    version="0.1.0",
    lifespan=lifespan,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check() -> dict:
    """Health check endpoint."""
    return {"status": "healthy", "service": "workout-chatbot"}


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    """
    Chat with the workout assistant.
    
    Args:
        request: Chat request with message and thread_id
        
    Returns:
        ChatResponse with assistant's response
    """
    config = {"configurable": {"thread_id": request.thread_id}}
    
    # Build initial state
    initial_state = {
        "messages": [{"role": "user", "content": request.message}],
    }
    
    # Add user profile if provided
    if request.user_profile:
        initial_state["user_profile"] = request.user_profile
    
    result = agent.invoke(initial_state, config=config)
    
    last_message = result["messages"][-1]
    workout_plan = result.get("workout_plan")
    
    return ChatResponse(
        response=last_message.content,
        thread_id=request.thread_id,
        workout_plan=workout_plan,
    )


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Welcome to Workout Chatbot API",
        "docs": "/docs",
        "health": "/health",
    }
