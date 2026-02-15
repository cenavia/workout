"""
Extractor node for user profile and fitness data extraction.
"""

from typing import Optional, Literal

from langchain.chat_models import init_chat_model
from pydantic import BaseModel, Field

from agents.modular.state import State
from agents.modular.nodes.extractor.prompt import prompt_template


class UserProfile(BaseModel):
    """
    Extracted user fitness profile.
    """
    name: Optional[str] = Field(None, description="User's name if mentioned")
    fitness_level: Optional[Literal["beginner", "intermediate", "advanced"]] = Field(
        None, description="User's fitness level"
    )
    goals: list[str] = Field(default_factory=list, description="Fitness goals")
    available_equipment: list[str] = Field(
        default_factory=list, description="Available workout equipment"
    )
    limitations: list[str] = Field(
        default_factory=list, description="Physical limitations or injuries"
    )
    preferred_duration: Optional[int] = Field(
        None, description="Preferred workout duration in minutes"
    )
    workout_type: Optional[str] = Field(
        None, description="Preferred workout type (strength, cardio, flexibility, etc.)"
    )


class ExtractionResult(BaseModel):
    """
    Complete extraction result.
    """
    profile: UserProfile
    intent: Literal[
        "create_workout",
        "modify_workout", 
        "explain_exercise",
        "nutrition_advice",
        "progress_tracking",
        "general_question",
        "greeting"
    ] = Field(description="Detected user intent")


def _get_llm():
    """Lazy initialization of LLM."""
    llm = init_chat_model("openai:gpt-4o-mini", temperature=0)
    return llm.with_structured_output(schema=ExtractionResult)


def extractor(state: State) -> dict:
    """
    Extract user profile and intent from messages.
    
    Args:
        state: Current agent state
        
    Returns:
        Updated state with extracted profile and intent
    """
    messages = state["messages"]
    last_message = messages[-1].content if messages else ""
    
    # Get existing profile to merge
    existing_profile = state.get("user_profile", {})
    
    prompt = prompt_template.format(
        message=last_message,
        existing_profile=existing_profile
    )
    
    structured_llm = _get_llm()
    result = structured_llm.invoke(prompt)
    
    # Merge with existing profile (keep existing values if new ones are None)
    merged_profile = {
        "name": result.profile.name or existing_profile.get("name"),
        "fitness_level": result.profile.fitness_level or existing_profile.get("fitness_level"),
        "goals": result.profile.goals or existing_profile.get("goals", []),
        "available_equipment": result.profile.available_equipment or existing_profile.get("available_equipment", []),
        "limitations": result.profile.limitations or existing_profile.get("limitations", []),
        "preferred_duration": result.profile.preferred_duration or existing_profile.get("preferred_duration"),
        "workout_type": result.profile.workout_type or existing_profile.get("workout_type"),
    }
    
    return {
        "user_profile": merged_profile,
        "current_intent": result.intent,
    }
