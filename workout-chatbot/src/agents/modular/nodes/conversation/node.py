"""
Conversation node for general fitness interaction.
"""

from langchain.chat_models import init_chat_model
from langchain_core.messages import SystemMessage

from agents.modular.state import State
from agents.modular.nodes.conversation.prompt import SYSTEM_PROMPT, format_context


def _get_llm():
    """Lazy initialization of LLM."""
    return init_chat_model("openai:gpt-4o-mini", temperature=0.7)


def conversation(state: State) -> dict:
    """
    Handle general fitness conversation with user.
    
    Args:
        state: Current agent state
        
    Returns:
        Updated state with assistant response
    """
    user_profile = state.get("user_profile", {})
    retrieved_docs = state.get("retrieved_docs", [])
    context = state.get("context", {})
    
    system_content = SYSTEM_PROMPT.format(
        user_context=format_context(user_profile, retrieved_docs, context)
    )
    
    messages = [SystemMessage(content=system_content)] + state["messages"]
    llm = _get_llm()
    response = llm.invoke(messages)
    
    return {"messages": [response]}
