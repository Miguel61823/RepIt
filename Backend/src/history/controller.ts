import { Controller, Get, Path, Route } from "tsoa";
import { HistoryService } from "./service";
import { History } from ".";

// Bug: path decorator 
@Route('history')
export class HistoryController extends Controller {

  // Get entire user history
  @Get("{userId}")
  public async getHistoryByAll(
    @Path() userId: string
  ): Promise<History> {
    return new HistoryService().getHistoryByAll(userId);
  };

  // Get user history by year
  @Get("{userId}/{year}")
  public async getHistoryByYear(
    @Path() userId: string,
    @Path() year: string
  ): Promise<History> {
    return new HistoryService().getHistoryByYear(userId, year);
  }
  
  // Get user history by month
  @Get("{userId}/{month}")
  public async getHistoryByMonth(
    @Path() userId: string,
    @Path() month: string
  ): Promise<History> {
    return new HistoryService().getHistoryByMonth(userId, month);
  }
  
  // Get user history by week
  @Get("{userId}/{week}")
  public async getHistoryByWeek(
    @Path() userId: string,
    @Path() month: string
  ): Promise<History> {
    return new HistoryService().getHistoryByWeek(userId, month);
  }
  
  // Get user history by day
  @Get("{userId}/{day}")
  public async getHistoryByDay(
    @Path() userId: string,
    @Path() day: string
  ): Promise<History> {
    return new HistoryService().getHistoryByDay(userId, day);
  }

}
