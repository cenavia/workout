"""
Modular workout agent state definition.
"""

from typing import List, Optional

from langchain_core.documents import Document
from langgraph.graph import MessagesState


class State(MessagesState):
    """
    State for the modular workout chatbot.
    
    Attributes:
        user_profile: Extracted user fitness profile
        current_intent: Detected user intent
        retrieved_docs: Documents retrieved from RAG
        workout_plan: Generated workout plan
        context: Additional context data
    """
    user_profile: dict
    current_intent: str
    retrieved_docs: List[Document]
    workout_plan: Optional[dict]
    context: dict
