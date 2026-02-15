"""
Vector store configuration for RAG.
"""

import os
from functools import lru_cache

from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings

load_dotenv()


def get_persist_directory() -> str:
    """Get the Chroma persist directory."""
    return os.getenv("CHROMA_PERSIST_DIRECTORY", "./data/chroma")


def get_embeddings() -> OpenAIEmbeddings:
    """Get the embeddings model."""
    return OpenAIEmbeddings(model="text-embedding-3-small")


@lru_cache
def get_vectorstore() -> Chroma:
    """
    Get or create the Chroma vector store.
    
    Returns:
        Chroma: Vector store instance
    """
    persist_dir = get_persist_directory()
    
    return Chroma(
        collection_name="workout_knowledge",
        embedding_function=get_embeddings(),
        persist_directory=persist_dir,
    )


def create_vectorstore(documents: list) -> Chroma:
    """
    Create a new vector store with documents.
    
    Args:
        documents: List of Document objects to add
        
    Returns:
        Chroma: New vector store instance
    """
    persist_dir = get_persist_directory()
    
    return Chroma.from_documents(
        documents=documents,
        embedding=get_embeddings(),
        collection_name="workout_knowledge",
        persist_directory=persist_dir,
    )
