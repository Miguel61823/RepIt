export interface Workout {
  userId: string
  date: string
  exercises: Exercise[]
}

export interface Exercise {
  name: string
  sets: Set[]
}

export interface Set {
  order: number
  exercise: string
  weight: number
  machine: string
  reps: number
}