// import stuff




@Route("history")
export class UserController extends Controller {
  private historyService: HistoryService = new HistoryService();

  // get entire user history
  @Get("{userId}")
  public async getUserHistory(@Path() userId: number): Promise<History | null> {
    return this.historyService.getUserHistory(userId);
  }

  // get user history by month/year
  // get user history by week
  // get user history by day
  // get user history by year



  @Get()
  public async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  public async createUser(@Body() requestBody: { name: string; email: string }): Promise<User> {
    return this.userService.createUser(requestBody.name, requestBody.email);
  }
}