import { pool } from "../db";
import { Workout } from ".";

export class HistoryService {

  public async getHistoryByID(userId: string): Promise<Workout[] | null> {
    /**
     * - From db, get all rows of workout (workout history)
     * - 
     * - Given a userID, find and return all workouts that correspond to that userID
     */

    const workouts= [];
    
    // each workout will have exercise list, and sets in jsonb
    const select = `SELECT * FROM workout WHERE user_id = $1`;

    const query = {
      text: select,
      values: [userId]
    }
    const {rows} = await pool.query(query)

    for (const row of rows) {
      workouts.push(row)
    }
    return workouts 
  };

  /// maybe we stop here and use front end stuff to get only specific workouts?????

  // public async getHistoryByYear(userId: string, date: string): Promise<WorkoutInstance[] | null> {



  //   const workoutList: WorkoutInstance[] = [];

  //   return workoutList;
  // };
  
  // public async getHistoryByMonth(userId: string, date: string): Promise<WorkoutInstance[] | null> {
    
  //   const workoutList: WorkoutInstance[] = [];
    
  //   return workoutList;
  // };

  // public async getHistoryByWeek(userId: string, date: string): Promise<WorkoutInstance[] | null> {
    
  //   const workoutList: WorkoutInstance[] = [];
    
  //   return workoutList;
  // };

  // public async getHistoryByDay(userId: string, date: string): Promise<WorkoutInstance[] | null> {
    
  //   const workoutList: WorkoutInstance[] = [];
    
  //   return workoutList;
  // };

}
