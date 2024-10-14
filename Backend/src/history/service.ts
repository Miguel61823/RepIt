import { pool } from "../db";
import { WorkoutInstance } from ".";

export class HistoryService {

  public async getHistoryByAll(userId: string): Promise<WorkoutInstance[] | null> {
    /**
     * - From db, get all rows of workout_instance (workout history)
     * - 
     * - (not done)
     */

    const workoutList: WorkoutInstance[] = [];
    
    const selectWorkouts = `SELECT * FROM workout_instance WHERE user_id = ${userId}`;
    const selectExercises = ``;
    const selectSets = ``;

    const queryWorkout = { text: selectWorkouts, values: [] };
    const queryExercises = { text: selectExercises, values: [] };
    const querySets = { text: selectSets, values: [] };

    const workoutsRes = await pool.query(queryWorkout);
    const exercisesRes = await pool.query(queryExercises);    
    const setRes = await pool.query(querySets);

    return workoutList;
  };

  public async getHistoryByYear(userId: string, date: string): Promise<WorkoutInstance[] | null> {



    const workoutList: WorkoutInstance[] = [];

    return workoutList;
  };
  
  public async getHistoryByMonth(userId: string, date: string): Promise<WorkoutInstance[] | null> {
    
    const workoutList: WorkoutInstance[] = [];
    
    return workoutList;
  };

  public async getHistoryByWeek(userId: string, date: string): Promise<WorkoutInstance[] | null> {
    
    const workoutList: WorkoutInstance[] = [];
    
    return workoutList;
  };

  public async getHistoryByDay(userId: string, date: string): Promise<WorkoutInstance[] | null> {
    
    const workoutList: WorkoutInstance[] = [];
    
    return workoutList;
  };

}
