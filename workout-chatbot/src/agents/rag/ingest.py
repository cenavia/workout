"""
Document ingestion script for workout knowledge base.

Run with: uv run python -m agents.rag.ingest
"""

import os
from pathlib import Path

from langchain_community.document_loaders import (
    DirectoryLoader,
    PyPDFLoader,
    TextLoader,
)
from langchain_text_splitters import RecursiveCharacterTextSplitter

from agents.rag.vectorstore import create_vectorstore, get_persist_directory


# Default workout knowledge to seed the database
DEFAULT_KNOWLEDGE = [
    {
        "content": """
# Strength Training Fundamentals

## Progressive Overload
The principle of gradually increasing the stress placed on the body during training. 
This can be achieved by:
- Increasing weight
- Increasing reps
- Increasing sets
- Decreasing rest time
- Improving form and range of motion

## Rep Ranges
- Strength: 1-5 reps (85-100% 1RM)
- Hypertrophy: 6-12 reps (67-85% 1RM)
- Endurance: 12+ reps (<67% 1RM)

## Rest Periods
- Strength training: 2-5 minutes
- Hypertrophy: 60-90 seconds
- Endurance: 30-60 seconds
""",
        "metadata": {"source": "fundamentals", "topic": "strength_training"},
    },
    {
        "content": """
# Common Exercises by Muscle Group

## Chest
- Bench Press (barbell/dumbbell)
- Push-ups (various variations)
- Dumbbell Flyes
- Cable Crossovers

## Back
- Pull-ups/Chin-ups
- Barbell/Dumbbell Rows
- Lat Pulldowns
- Deadlifts

## Shoulders
- Overhead Press
- Lateral Raises
- Front Raises
- Face Pulls

## Legs
- Squats (back/front/goblet)
- Romanian Deadlifts
- Lunges
- Leg Press
- Calf Raises

## Arms
- Bicep Curls (barbell/dumbbell)
- Tricep Dips
- Tricep Pushdowns
- Hammer Curls

## Core
- Planks
- Dead Bugs
- Russian Twists
- Leg Raises
- Ab Wheel Rollouts
""",
        "metadata": {"source": "exercises", "topic": "muscle_groups"},
    },
    {
        "content": """
# Cardio Training Guidelines

## Types of Cardio
1. **LISS (Low-Intensity Steady State)**
   - 30-60 minutes at 60-70% max heart rate
   - Good for recovery and fat burning
   - Examples: Walking, light cycling

2. **HIIT (High-Intensity Interval Training)**
   - 20-30 minutes of work/rest intervals
   - Excellent for conditioning and fat loss
   - Example: 30 seconds sprint, 90 seconds rest

3. **MISS (Moderate-Intensity Steady State)**
   - 20-40 minutes at 70-80% max heart rate
   - Balance between LISS and HIIT
   - Examples: Jogging, swimming

## Heart Rate Zones
- Zone 1 (50-60%): Recovery
- Zone 2 (60-70%): Fat burning
- Zone 3 (70-80%): Aerobic
- Zone 4 (80-90%): Anaerobic
- Zone 5 (90-100%): Maximum effort
""",
        "metadata": {"source": "cardio", "topic": "cardiovascular"},
    },
    {
        "content": """
# Workout Programming

## Training Splits
1. **Full Body (3x/week)**
   - Best for beginners
   - Hit each muscle 3x per week
   
2. **Upper/Lower (4x/week)**
   - Good for intermediate
   - 2 upper, 2 lower days

3. **Push/Pull/Legs (6x/week)**
   - Advanced split
   - High volume training

4. **Bro Split (5-6x/week)**
   - One muscle group per day
   - High volume per muscle

## Weekly Volume Guidelines
- Beginners: 10-12 sets per muscle per week
- Intermediate: 12-16 sets per muscle per week
- Advanced: 16-20+ sets per muscle per week

## Recovery
- Sleep: 7-9 hours per night
- Protein: 1.6-2.2g per kg bodyweight
- Rest days: At least 1-2 per week
- Deload: Every 4-8 weeks
""",
        "metadata": {"source": "programming", "topic": "workout_splits"},
    },
    {
        "content": """
# Beginner Workout Guidelines

## Starting Out
- Focus on form before adding weight
- Start with compound movements
- Progress slowly and consistently
- Track your workouts

## Recommended Beginner Exercises
1. Goblet Squats
2. Push-ups (modify if needed)
3. Dumbbell Rows
4. Plank holds
5. Glute Bridges
6. Lunges
7. Dumbbell Shoulder Press

## Common Mistakes to Avoid
- Ego lifting (too heavy)
- Skipping warm-up
- Inconsistent training
- Poor nutrition
- Not enough sleep
- Comparing to others

## Progression Tips
- Add 2.5-5 lbs when you can complete all sets with good form
- Master bodyweight before adding weights
- Listen to your body
- Take rest days seriously
""",
        "metadata": {"source": "beginner", "topic": "getting_started"},
    },
]


def load_documents_from_directory(directory: str) -> list:
    """
    Load documents from a directory.
    
    Args:
        directory: Path to documents directory
        
    Returns:
        List of loaded documents
    """
    documents = []
    
    # Load PDFs
    pdf_loader = DirectoryLoader(
        directory,
        glob="**/*.pdf",
        loader_cls=PyPDFLoader,
        show_progress=True,
    )
    
    # Load text files
    txt_loader = DirectoryLoader(
        directory,
        glob="**/*.txt",
        loader_cls=TextLoader,
        show_progress=True,
    )
    
    # Load markdown files
    md_loader = DirectoryLoader(
        directory,
        glob="**/*.md",
        loader_cls=TextLoader,
        show_progress=True,
    )
    
    try:
        documents.extend(pdf_loader.load())
    except Exception as e:
        print(f"Warning: Could not load PDFs: {e}")
    
    try:
        documents.extend(txt_loader.load())
    except Exception as e:
        print(f"Warning: Could not load text files: {e}")
    
    try:
        documents.extend(md_loader.load())
    except Exception as e:
        print(f"Warning: Could not load markdown files: {e}")
    
    return documents


def create_default_documents() -> list:
    """
    Create documents from default knowledge base.
    
    Returns:
        List of Document objects
    """
    from langchain_core.documents import Document
    
    return [
        Document(page_content=item["content"], metadata=item["metadata"])
        for item in DEFAULT_KNOWLEDGE
    ]


def main():
    """Main ingestion function."""
    print("🏋️ Starting workout knowledge ingestion...")
    
    # Create data directory if it doesn't exist
    persist_dir = Path(get_persist_directory())
    persist_dir.mkdir(parents=True, exist_ok=True)
    
    documents = []
    
    # Check for custom documents directory
    docs_dir = Path("./data/documents")
    if docs_dir.exists():
        print(f"📁 Loading documents from {docs_dir}...")
        custom_docs = load_documents_from_directory(str(docs_dir))
        documents.extend(custom_docs)
        print(f"   Loaded {len(custom_docs)} custom documents")
    
    # Add default knowledge
    print("📚 Adding default workout knowledge...")
    default_docs = create_default_documents()
    documents.extend(default_docs)
    print(f"   Added {len(default_docs)} default documents")
    
    # Split documents
    print("✂️ Splitting documents...")
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )
    splits = text_splitter.split_documents(documents)
    print(f"   Created {len(splits)} chunks")
    
    # Create vector store
    print("🔢 Creating vector store...")
    vectorstore = create_vectorstore(splits)
    print(f"   Vector store created at {persist_dir}")
    
    print("✅ Ingestion complete!")
    print(f"   Total documents: {len(documents)}")
    print(f"   Total chunks: {len(splits)}")


if __name__ == "__main__":
    main()
