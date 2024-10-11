// // src/controllers/UserController.ts

import { Controller, Get, Path, Post, Body, Route } from "tsoa";
import { UserService } from "./service";
import { User } from ".";

@Route('user')
export class UserController extends Controller {
//   @Get("{userId}")
//   public async getUser(@Path() userId: number): Promise<User | null> {
//     return this.userService.getUser(userId);
//   }

  @Get('')
  public async getAllUsers(): Promise<User[]> {
    return new UserService().getAllUsers();
  }

//   @Post()
//   public async createUser(@Body() requestBody: { name: string; email: string }): Promise<User> {
//     return this.userService.createUser(requestBody.name, requestBody.email);
//   }
}