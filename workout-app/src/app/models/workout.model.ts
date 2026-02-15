export interface Exercise {
  id: string;
  name: string;
  description?: string;
  muscleGroup: MuscleGroup;
  equipment?: string;
  videoUrl?: string;
  imageUrl?: string;
}

export enum MuscleGroup {
  CHEST = 'CHEST',
  BACK = 'BACK',
  LEGS = 'LEGS',
  SHOULDERS = 'SHOULDERS',
  ARMS = 'ARMS',
  CORE = 'CORE',
  CARDIO = 'CARDIO'
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number; // in seconds
  restTime?: number; // in seconds
  notes?: string;
}

export interface Workout {
  id: string;
  userId: string;
  name: string;
  description?: string;
  exercises: WorkoutExercise[];
  duration?: number; // total duration in minutes
  calories?: number;
  difficulty?: DifficultyLevel;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum DifficultyLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export interface CreateWorkoutDto {
  name: string;
  description?: string;
  exercises: WorkoutExercise[];
  difficulty?: DifficultyLevel;
  tags?: string[];
}

export interface UpdateWorkoutDto {
  name?: string;
  description?: string;
  exercises?: WorkoutExercise[];
  difficulty?: DifficultyLevel;
  tags?: string[];
}
