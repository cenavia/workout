"""
Prompts for workout planner node.
"""

from typing import List

from langchain_core.documents import Document
from langchain_core.prompts import PromptTemplate

PLANNER_PROMPT = """\
You are an expert fitness coach creating a personalized workout plan.

{context}

Create a complete, structured workout plan that includes:

1. **Warmup Section** (5-10 minutes)
   - Dynamic stretches and mobility work
   - Light cardio to raise heart rate

2. **Main Workout Section**
   - Exercises appropriate for the user's level
   - Proper progression and intensity
   - Clear sets, reps, and rest periods

3. **Cooldown Section** (5 minutes)
   - Static stretches
   - Breathing exercises

Guidelines:
- Match difficulty to user's fitness level
- Only use available equipment (or suggest bodyweight alternatives)
- Respect any physical limitations
- Align with user's goals
- Include form tips for safety
- Keep total duration within user's preference if specified
"""


def format_workout_context(
    user_profile: dict,
    retrieved_docs: List[Document],
    user_request: str
) -> str:
    """
    Format context for workout planning.
    
    Args:
        user_profile: User's fitness profile
        retrieved_docs: Retrieved workout knowledge
        user_request: User's specific request
        
    Returns:
        Formatted context string
    """
    lines = [f"**User Request:** {user_request}", ""]
    
    # User profile
    lines.append("**User Profile:**")
    lines.append(f"- Fitness Level: {user_profile.get('fitness_level', 'Not specified')}")
    
    goals = user_profile.get('goals', [])
    lines.append(f"- Goals: {', '.join(goals) if goals else 'General fitness'}")
    
    equipment = user_profile.get('available_equipment', [])
    lines.append(f"- Available Equipment: {', '.join(equipment) if equipment else 'Bodyweight only'}")
    
    limitations = user_profile.get('limitations', [])
    if limitations:
        lines.append(f"- ⚠️ Limitations/Injuries: {', '.join(limitations)}")
    
    duration = user_profile.get('preferred_duration')
    if duration:
        lines.append(f"- Preferred Duration: {duration} minutes")
    
    workout_type = user_profile.get('workout_type')
    if workout_type:
        lines.append(f"- Preferred Type: {workout_type}")
    
    lines.append("")
    
    # Retrieved knowledge
    if retrieved_docs:
        lines.append("**Reference Knowledge:**")
        for doc in retrieved_docs[:3]:  # Limit to top 3 docs
            content = doc.page_content[:300]
            lines.append(f"- {content}")
        lines.append("")
    
    return "\n".join(lines)
