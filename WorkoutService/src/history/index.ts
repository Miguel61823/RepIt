/**
 * 
 * A workout, completed by a specific user.
 * 
 * @interface Workout
 * @field {number} workoutId: Reference id of the workout
 * @field {string} userId: Id of the user of this workout 
 * @field {string} dataCompleted: Completion date of this workout 
 * @field {Exercise[]} exercises: List of exercises of the original workout
 */
export interface Workout {
  id: number;
  name: string;
  userId: string;
  dateCompleted: string;
  exercises: Exercise[];
}

/**
 * 
 * An exercise associated with its respective Workout.
 * 
 * @interface Exercise
 * @field {number} exerciseId: Reference id of the exercise
 * @field {string} name: Name of the exercise
 * @field {number} number: current iteration of exercise in workout
 * @field {Set[]} sets: List of sets done for this exercise 
 */
export interface Exercise {
  id: number;
  name: string;
  number: number;
  sets: Set[];
}

/**
 * 
 * A set associated with its respective Exercise.
 * 
 * @interface Set
 * @field {number} order: The current set iteration for its exercise 
 * @field {number} weight: The weight used for this set 
 * @field {number} reps: The reps completed for this set 
 * @field {string} machine: The machine used for this set 
 */
export interface Set {
  id: number;
  order: number;
  weight: number;
  reps: number;
  machine: string;
  exercise: string;
}
