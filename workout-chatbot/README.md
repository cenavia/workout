# workout-chatbot

AI Workout Assistant with RAG capabilities built with LangGraph and LangChain.

## Overview

This project implements an intelligent fitness chatbot that can:

- **Create personalized workout plans** based on user profiles
- **Answer fitness questions** using RAG (Retrieval-Augmented Generation)
- **Explain exercises** with proper form and technique tips
- **Track user preferences** across conversations
- **Adapt recommendations** based on equipment, fitness level, and goals

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Python | >=3.12 | Runtime |
| LangGraph | >=0.2.60 | Agent framework |
| LangChain | >=0.3.14 | LLM orchestration |
| ChromaDB | >=0.5.23 | Vector store for RAG |
| FastAPI | >=0.115.6 | REST API |
| PostgreSQL | 16 | Checkpoint storage |
| UV | latest | Package management |

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Message                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     EXTRACTOR NODE                          │
│  - Extract user profile (fitness level, goals, equipment)   │
│  - Classify intent (create_workout, explain, question...)   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     RETRIEVER NODE (RAG)                    │
│  - Query ChromaDB with enhanced context                     │
│  - Retrieve relevant workout knowledge                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     INTENT ROUTER                           │
│  create_workout/modify_workout → WORKOUT_PLANNER            │
│  other intents → CONVERSATION                               │
└─────────────────────────────────────────────────────────────┘
                    │                       │
                    ▼                       ▼
┌──────────────────────────┐  ┌──────────────────────────────┐
│    WORKOUT PLANNER       │  │       CONVERSATION           │
│  - Generate structured   │  │  - Answer questions          │
│    workout plans         │  │  - Explain exercises         │
│  - Include warmup,       │  │  - Provide motivation        │
│    main, cooldown        │  │  - General fitness chat      │
└──────────────────────────┘  └──────────────────────────────┘
                    │                       │
                    └───────────┬───────────┘
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                        Response                             │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

```
workout-chatbot/
├── src/
│   ├── agents/
│   │   ├── main.py              # Agent entry point
│   │   ├── modular/
│   │   │   ├── agent.py         # Graph definition
│   │   │   ├── state.py         # State class
│   │   │   ├── nodes/
│   │   │   │   ├── extractor/   # Profile & intent extraction
│   │   │   │   ├── retriever/   # RAG retrieval
│   │   │   │   ├── conversation/# General chat
│   │   │   │   └── workout_planner/ # Workout generation
│   │   │   └── routes/
│   │   │       └── intent/      # Intent-based routing
│   │   └── rag/
│   │       ├── vectorstore.py   # ChromaDB setup
│   │       └── ingest.py        # Document ingestion
│   └── api/
│       ├── main.py              # FastAPI endpoints
│       └── db.py                # Database config
├── notebooks/
│   └── 01-getting-started.ipynb
├── data/
│   ├── chroma/                  # Vector store (generated)
│   └── documents/               # Custom documents for RAG
├── pyproject.toml
├── langgraph.json
├── docker-compose.yml
└── justfile
```

## Quick Start

### Prerequisites

- Python 3.12+
- UV package manager
- Docker (for PostgreSQL)
- OpenAI API key

### Installation

1. **Enter the project directory:**
   ```bash
   cd workout-chatbot
   ```

2. **Install dependencies:**
   ```bash
   uv sync
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your OPENAI_API_KEY
   ```

4. **Ingest workout knowledge:**
   ```bash
   just ingest
   ```

5. **Run the agent:**
   ```bash
   just run
   ```

## Development Commands

| Command | Description |
|---------|-------------|
| `just install` | Install dependencies |
| `just install-dev` | Install with dev dependencies |
| `just run` | Start LangGraph development server |
| `just ingest` | Ingest documents into vector store |
| `just api` | Start FastAPI server |
| `just db-up` | Start PostgreSQL container |
| `just db-down` | Stop PostgreSQL container |
| `just test` | Run tests |
| `just format` | Format code with Ruff |
| `just lint` | Lint code with Ruff |

## Adding Custom Knowledge

To add your own fitness documents to the RAG system:

1. Create the documents directory:
   ```bash
   mkdir -p data/documents
   ```

2. Add PDF, TXT, or MD files with workout information

3. Run ingestion:
   ```bash
   just ingest
   ```

## API Endpoints

### Health Check
```bash
GET /health
```

### Chat
```bash
POST /chat
Content-Type: application/json

{
  "message": "Create a 30 minute workout for me",
  "thread_id": "user-123",
  "user_profile": {
    "fitness_level": "beginner",
    "available_equipment": ["dumbbells"]
  }
}
```

## Example Interactions

**Creating a Workout:**
```
User: I'm a beginner with only dumbbells. Create a 20-minute upper body workout.

Bot: # 💪 Beginner Upper Body Blast
*A quick and effective upper body routine perfect for beginners*

⏱️ Duration: 20 minutes
📊 Difficulty: Beginner
🏋️ Equipment: Dumbbells

## Warmup (3 minutes)
1. Arm Circles - 2 sets × 30 seconds
2. Shoulder Rolls - 2 sets × 30 seconds
...
```

**Asking Questions:**
```
User: What's the difference between compound and isolation exercises?

Bot: Great question! Here's the breakdown...
```

## License

MIT
