"""
Workout planner node for creating personalized workout routines.
"""

from typing import List, Optional

from langchain.chat_models import init_chat_model
from langchain_core.messages import AIMessage
from pydantic import BaseModel, Field

from agents.modular.state import State
from agents.modular.nodes.workout_planner.prompt import PLANNER_PROMPT, format_workout_context


def _get_llm():
    """Lazy initialization of LLM."""
    llm = init_chat_model("openai:gpt-4o-mini", temperature=0.3)
    return llm.with_structured_output(schema=WorkoutPlan)


class Exercise(BaseModel):
    """Single exercise in a workout."""
    name: str = Field(description="Exercise name")
    sets: int = Field(description="Number of sets")
    reps: str = Field(description="Reps or duration (e.g., '12' or '30 seconds')")
    rest: str = Field(description="Rest period between sets")
    notes: Optional[str] = Field(None, description="Form tips or modifications")


class WorkoutSection(BaseModel):
    """Section of a workout (warmup, main, cooldown)."""
    name: str = Field(description="Section name")
    duration: str = Field(description="Estimated duration")
    exercises: List[Exercise] = Field(description="Exercises in this section")


class WorkoutPlan(BaseModel):
    """Complete workout plan."""
    title: str = Field(description="Workout title")
    description: str = Field(description="Brief description")
    total_duration: str = Field(description="Total estimated duration")
    difficulty: str = Field(description="Difficulty level")
    equipment_needed: List[str] = Field(description="Required equipment")
    sections: List[WorkoutSection] = Field(description="Workout sections")
    tips: List[str] = Field(description="General tips for this workout")


def workout_planner(state: State) -> dict:
    """
    Create a personalized workout plan based on user profile.
    
    Args:
        state: Current agent state
        
    Returns:
        Updated state with workout plan and response message
    """
    user_profile = state.get("user_profile", {})
    retrieved_docs = state.get("retrieved_docs", [])
    messages = state["messages"]
    last_message = messages[-1].content if messages else ""
    
    # Format context for planner
    context = format_workout_context(user_profile, retrieved_docs, last_message)
    
    prompt = PLANNER_PROMPT.format(context=context)
    
    try:
        structured_llm = _get_llm()
        workout_plan = structured_llm.invoke(prompt)
        
        # Format the workout plan as a readable message
        response_text = format_workout_response(workout_plan)
        
        return {
            "workout_plan": workout_plan.model_dump(),
            "messages": [AIMessage(content=response_text)],
        }
    except Exception as e:
        # Fallback to regular conversation if structured output fails
        fallback_llm = init_chat_model("openai:gpt-4o-mini", temperature=0.7)
        response = fallback_llm.invoke(prompt)
        return {"messages": [response]}


def format_workout_response(plan: WorkoutPlan) -> str:
    """
    Format workout plan into a readable message.
    
    Args:
        plan: Generated workout plan
        
    Returns:
        Formatted string response
    """
    lines = [
        f"# 💪 {plan.title}",
        "",
        f"*{plan.description}*",
        "",
        f"⏱️ **Duration:** {plan.total_duration}",
        f"📊 **Difficulty:** {plan.difficulty}",
        f"🏋️ **Equipment:** {', '.join(plan.equipment_needed) if plan.equipment_needed else 'None (bodyweight)'}",
        "",
    ]
    
    for section in plan.sections:
        lines.append(f"## {section.name} ({section.duration})")
        lines.append("")
        for i, exercise in enumerate(section.exercises, 1):
            lines.append(f"**{i}. {exercise.name}**")
            lines.append(f"   - {exercise.sets} sets × {exercise.reps}")
            lines.append(f"   - Rest: {exercise.rest}")
            if exercise.notes:
                lines.append(f"   - 💡 {exercise.notes}")
            lines.append("")
    
    if plan.tips:
        lines.append("## 📝 Tips")
        for tip in plan.tips:
            lines.append(f"- {tip}")
    
    lines.append("")
    lines.append("---")
    lines.append("*Remember to listen to your body and stay hydrated! Let me know if you need any modifications.*")
    
    return "\n".join(lines)
