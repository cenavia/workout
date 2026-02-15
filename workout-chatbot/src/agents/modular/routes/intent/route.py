"""
Intent routing for modular workout agent.
"""

from typing import Literal

from agents.modular.state import State


def intent_route(state: State) -> Literal["workout_planner", "conversation"]:
    """
    Route based on user intent.
    
    Args:
        state: Current agent state
        
    Returns:
        Next node name
    """
    current_intent = state.get("current_intent", "general_question")
    
    # Intents that should go to workout planner
    workout_intents = {"create_workout", "modify_workout"}
    
    if current_intent in workout_intents:
        return "workout_planner"
    
    # All other intents go to general conversation
    return "conversation"
