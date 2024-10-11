export interface History {
  userId: string;
  workouts: Workout[];
}

export interface Workout {
  userId: string;
  date: string;
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  sets: Set[];
}

export interface Set {
  order: number;
  weight: number;
  reps: number;
  machine: string;
}
