import { Controller, Get, Path, Route } from "tsoa";
import { HistoryService } from "./service";
import { Workout } from ".";

@Route('history')
export class HistoryController extends Controller {
  // If 'getHistory..()' is by specified date, it will be parsed in services

  // Get entire user history
  @Get("{userId}")
  public async getHistoryByID(
    @Path() userId: string
  ): Promise<Workout[] | null> {
    return new HistoryService().getHistoryByID(userId);
  };


  // // Get user history by year
  // @Get("{userId}/{date}")
  // public async getHistoryByYear(
  //   @Path() userId: string,
  //   @Path() date: string
  // ): Promise<Workout[] | null> {
  //   return new HistoryService().getHistoryByYear(userId, date);
  // }
  
  // // Get user history by month
  // @Get("{userId}/{date}")
  // public async getHistoryByMonth(
  //   @Path() userId: string,
  //   @Path() date: string
  // ): Promise<Workout[] | null> {
  //   return new HistoryService().getHistoryByMonth(userId, date);
  // }
  
  // // Get user history by week
  // @Get("{userId}/{date}")
  // public async getHistoryByWeek(
  //   @Path() userId: string,
  //   @Path() date: string
  // ): Promise<Workout[] | null> {
  //   return new HistoryService().getHistoryByWeek(userId, date);
  // }
  
  // // Get user history by day
  // @Get("{userId}/{date}")
  // public async getHistoryByDay(
  //   @Path() userId: string,
  //   @Path() date: string
  // ): Promise<Workout[] | null> {
  //   return new HistoryService().getHistoryByDay(userId, date);
  // }

}
