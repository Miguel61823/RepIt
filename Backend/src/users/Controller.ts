// src/controllers/UserController.ts

import { Controller, Get, Path, Post, Body, Route } from "tsoa";
import { User, UserService } from "../services/UserService";

@Route("users")
export class UserController extends Controller {
  private userService: UserService = new UserService();

  @Get("{userId}")
  public async getUser(@Path() userId: number): Promise<User | null> {
    return this.userService.getUser(userId);
  }

  @Get()
  public async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  public async createUser(@Body() requestBody: { name: string; email: string }): Promise<User> {
    return this.userService.createUser(requestBody.name, requestBody.email);
  }
}