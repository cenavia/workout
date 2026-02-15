"""
Modular workout agent graph definition.
"""

from typing import TypedDict

from langgraph.graph import StateGraph, START, END

from agents.modular.state import State
from agents.modular.nodes.extractor.node import extractor
from agents.modular.nodes.retriever.node import retriever
from agents.modular.nodes.conversation.node import conversation
from agents.modular.nodes.workout_planner.node import workout_planner
from agents.modular.routes.intent.route import intent_route


def make_graph(config: TypedDict = None):
    """
    Create and compile the modular workout agent graph.
    
    Args:
        config: Optional configuration with checkpointer
        
    Returns:
        Compiled StateGraph
    """
    config = config or {}
    checkpointer = config.get("checkpointer", None)
    
    builder = StateGraph(State)
    
    # Add nodes
    builder.add_node("extractor", extractor)
    builder.add_node("retriever", retriever)
    builder.add_node("conversation", conversation)
    builder.add_node("workout_planner", workout_planner)
    
    # Define edges
    builder.add_edge(START, "extractor")
    builder.add_edge("extractor", "retriever")
    builder.add_conditional_edges("retriever", intent_route)
    builder.add_edge("workout_planner", END)
    builder.add_edge("conversation", END)
    
    return builder.compile(checkpointer=checkpointer)


agent = make_graph()
