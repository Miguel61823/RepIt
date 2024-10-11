// // src/services/UserService.ts

import { pool } from "../db";
import {User} from ".";

export class UserService {
  // public async getUser(id: number): Promise<User | null> {
  //   const user = this.users.find(u => u.id === id);
  //   return user || null;
  // }

  public async getAllUsers(): Promise<User[]> {
    let select = `
    SELECT * FROM user`;
    const query = {
      text: select,
      values: [],
    };
    const {rows} = await pool.query(query);
    const users = [];
    for (const row of rows){
      users.push(row);
    };
    return users;
  }

  // public async createUser(name: string, email: string): Promise<User> {
  //   const newUser: User = {
  //     id: this.users.length + 1,
  //     name,
  //     email
  //   };
  //   this.users.push(newUser);
  //   return newUser;
  // }
}