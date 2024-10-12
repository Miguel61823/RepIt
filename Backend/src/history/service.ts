import { pool } from "../db";
import { WorkoutInstance } from ".";

export class HistoryService {

  public async getHistoryByAll(userId: string): Promise<WorkoutInstance[] | null> {
    /** notes:
     * Get all workout instances from workout instance table
     * possible db table: WORKOUTINSTANCE?
     * (
     * id: {id of workout},
     * userId: {id of user},
     * dateCompleted: {date in iso format},
     * exercises: {list of exercises of WorkoutInstance}
     * )
     */

    const workoutList: WorkoutInstance[] = [];

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
