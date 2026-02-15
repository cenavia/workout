"""
Database configuration and checkpointer setup.
"""

import os
from functools import lru_cache

from dotenv import load_dotenv
from langgraph.checkpoint.postgres import PostgresSaver

load_dotenv()


@lru_cache
def get_database_url() -> str:
    """Get database URL from environment."""
    return os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:postgres@localhost:5432/workout-chatbot"
    )


def get_checkpointer() -> PostgresSaver:
    """
    Create and return a PostgreSQL checkpointer.
    
    Returns:
        PostgresSaver: Configured checkpointer instance
    """
    return PostgresSaver.from_conn_string(get_database_url())
