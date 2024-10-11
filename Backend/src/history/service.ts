import { pool } from "../db";
import { History, Workout } from ".";

export class HistoryService {

  public async getHistoryByAll(userId: string): Promise<History> {
    
    const workoutList: Workout[] = [];
    return {
      userId: userId,
      workouts: workoutList,
    };
  };

  public async getHistoryByYear(userId: string, year: string): Promise<History> {

    const workoutList: Workout[] = [];
    return {
      userId: userId,
      workouts: workoutList,
    };
  };
  
  public async getHistoryByMonth(userId: string, month: string): Promise<History> {
    
    const workoutList: Workout[] = [];
    return {
      userId: userId,
      workouts: workoutList,
    };
  }

  public async getHistoryByWeek(userId: string, week: string): Promise<History> {
    
    const workoutList: Workout[] = [];
    return {
      userId: userId,
      workouts: workoutList,
    };
  }

  public async getHistoryByDay(userId: string, day: string): Promise<History> {
    
    const workoutList: Workout[] = [];
    return {
      userId: userId,
      workouts: workoutList,
    };
  }

}
