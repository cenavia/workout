"""
RAG retriever node for workout and fitness knowledge.
"""

import os
from typing import List

from langchain_core.documents import Document

from agents.modular.state import State
from agents.rag.vectorstore import get_vectorstore


def retriever(state: State) -> dict:
    """
    Retrieve relevant workout documents based on user query and profile.
    
    Args:
        state: Current agent state
        
    Returns:
        Updated state with retrieved documents
    """
    messages = state["messages"]
    last_message = messages[-1].content if messages else ""
    user_profile = state.get("user_profile", {})
    current_intent = state.get("current_intent", "")
    
    # Build enhanced query with context
    query_parts = [last_message]
    
    if user_profile.get("fitness_level"):
        query_parts.append(f"fitness level: {user_profile['fitness_level']}")
    
    if user_profile.get("workout_type"):
        query_parts.append(f"workout type: {user_profile['workout_type']}")
    
    if user_profile.get("goals"):
        query_parts.append(f"goals: {', '.join(user_profile['goals'])}")
    
    enhanced_query = " | ".join(query_parts)
    
    # Skip retrieval for simple greetings
    if current_intent == "greeting":
        return {"retrieved_docs": []}
    
    try:
        vectorstore = get_vectorstore()
        docs = vectorstore.similarity_search(enhanced_query, k=4)
    except Exception as e:
        # If vector store is not initialized, return empty docs
        print(f"Warning: Could not retrieve documents: {e}")
        docs = []
    
    return {"retrieved_docs": docs}
