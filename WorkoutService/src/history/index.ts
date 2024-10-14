/**
 * 
 * An instance of a workout, completed by a specific user.
 * 
 * @interface WorkoutInstance
 * @field {number} workoutId: Reference id of the workout
 * @field {string} userId: Id of the user of this workout instance
 * @field {string} dataCompleted: Completion date of this workout instance
 * @field {ExerciseInstance[]} exercises: List of exercises of the original workout
 */
export interface WorkoutInstance {
  workoutId: number;
  name: string;
  userId: string;
  dateCompleted: string;
  exercises: ExerciseInstance[];
}

/**
 * 
 * An exercise instance associated with its respective WorkoutInstance.
 * 
 * @interface ExerciseInstance
 * @field {number} exerciseId: Reference id of the exercise
 * @field {string} name: Name of the exercise
 * @field {number} number: current iteration of exercise in workout
 * @field {SetInstance[]} sets: List of sets done for this exercise instance
 */
export interface ExerciseInstance {
  exerciseId: number;
  name: string;
  number: number;
  sets: SetInstance[];
}

/**
 * 
 * An set instance associated with its respective ExerciseInstance.
 * 
 * @interface SetInstance
 * @field {number} order: The current set iteration for its exercise instance
 * @field {number} weight: The weight used for this set instance
 * @field {number} reps: The reps completed for this set instance
 * @field {string} machine: The machine used for this set instance
 */
export interface SetInstance {
  order: number;
  weight: number;
  reps: number;
  machine: string;
  exercise: string;
}
