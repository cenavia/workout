"""
Prompts for extractor node.
"""

from langchain_core.prompts import PromptTemplate

TEMPLATE = """\
You are a fitness assistant analyzing user messages to extract relevant information.

Extract the following from the user's message:

**User Profile:**
- name: User's name if they mention it
- fitness_level: beginner, intermediate, or advanced
- goals: List of fitness goals (weight loss, muscle gain, endurance, flexibility, etc.)
- available_equipment: Equipment they have access to (dumbbells, barbell, gym, bodyweight only, etc.)
- limitations: Physical limitations or injuries
- preferred_duration: Workout duration preference in minutes
- workout_type: Type of workout they prefer (strength, cardio, HIIT, yoga, etc.)

**Intent Classification:**
- create_workout: User wants a new workout plan or routine
- modify_workout: User wants to change an existing workout
- explain_exercise: User wants explanation of an exercise or technique
- nutrition_advice: User asks about diet or nutrition
- progress_tracking: User wants to track or discuss progress
- general_question: General fitness question
- greeting: Simple greeting or introduction

**Existing Profile (merge with new information):**
{{ existing_profile }}

**User Message:**
{{ message }}

Extract all available information. If something is not mentioned, leave it as null.
Prioritize new information over existing profile data when there's a conflict.
"""

prompt_template = PromptTemplate.from_template(
    TEMPLATE,
    template_format="jinja2"
)
