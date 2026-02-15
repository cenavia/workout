"""
Prompts for conversation node.
"""

from typing import List

from langchain_core.documents import Document

SYSTEM_PROMPT = """\
You are a knowledgeable and motivating fitness assistant called "Workout Buddy".

Your role is to:
- Answer fitness and exercise questions
- Provide exercise explanations and form tips
- Give nutrition guidance
- Motivate and encourage users
- Share evidence-based fitness information

{user_context}

Guidelines:
- Be friendly, supportive, and encouraging
- Provide clear, actionable advice
- Always prioritize safety - recommend consulting professionals for medical concerns
- Use the retrieved knowledge to provide accurate information
- If you don't know something, say so honestly
- Adapt your language to the user's fitness level
"""


def format_context(
    user_profile: dict, 
    retrieved_docs: List[Document], 
    context: dict
) -> str:
    """
    Format user profile, retrieved docs, and context for the prompt.
    
    Args:
        user_profile: User's fitness profile
        retrieved_docs: Retrieved RAG documents
        context: Additional context
        
    Returns:
        Formatted context string
    """
    lines = []
    
    # User profile section
    if any(user_profile.values()):
        lines.append("**User Profile:**")
        if user_profile.get("name"):
            lines.append(f"- Name: {user_profile['name']}")
        if user_profile.get("fitness_level"):
            lines.append(f"- Fitness Level: {user_profile['fitness_level']}")
        if user_profile.get("goals"):
            lines.append(f"- Goals: {', '.join(user_profile['goals'])}")
        if user_profile.get("available_equipment"):
            lines.append(f"- Equipment: {', '.join(user_profile['available_equipment'])}")
        if user_profile.get("limitations"):
            lines.append(f"- Limitations: {', '.join(user_profile['limitations'])}")
        lines.append("")
    
    # Retrieved knowledge section
    if retrieved_docs:
        lines.append("**Relevant Knowledge:**")
        for i, doc in enumerate(retrieved_docs, 1):
            content = doc.page_content[:500]  # Limit content length
            lines.append(f"{i}. {content}")
        lines.append("")
    
    # Additional context
    for key, value in context.items():
        if value:
            lines.append(f"**{key}:** {value}")
    
    return "\n".join(lines) if lines else "No additional context available."
