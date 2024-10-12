/**
 * /
 * An instance of a workout, completed by a specific user.
 * 
 * @interface WorkoutInstance
 * @field {number} workoutId: Id of the workout (not the instance)
 * @field {string} userId: Id of the user of this workout instance
 * @field {string} dataCompleted: Completion date of this workout instance
 * @field {ExerciseInstance[]} exercises: List of exercises of the original workout
 */
export interface WorkoutInstance {
  workoutId: number;
  userId: string;
  dateCompleted: string;
  exercises: ExerciseInstance[];
}

/**
 * 
 * An exercise instance associated with its respective WorkoutInstance.
 * 
 * @interface ExerciseInstance
 * @field {number} exerciseId: Id of the exercise (not the instance)
 * @field {string} name: Name of the exercise
 * @field {SetInstance[]} sets: List of sets done for this exercise instance
 */
export interface ExerciseInstance {
  exerciseId: number;
  name: string;
  sets: SetInstance[];
}

/**
 * 
 * An set instance associated with its respective ExerciseInstance.
 * 
 * @interface SetInstance
 * @field {number} exerciseId: Id of the exercise
 * @field {number} order: The current set iteration for its exercise instance
 * @field {string} exercise: Name of the exercise
 * @field {number} weight: The weight used for this set instance
 * @field {number} reps: The reps completed for this set instance
 * @field {string} machine: The machine used for this set instance
 */
export interface SetInstance {
  exerciseId: number;
  order: number;
  exercise: string;
  weight: number;
  reps: number;
  machine: string;
}
