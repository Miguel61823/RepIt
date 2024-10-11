// // src/services/UserService.ts

// export interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// export class UserService {
//   private users: User[] = [
//     { id: 1, name: "John Doe", email: "john@example.com" },
//     { id: 2, name: "Jane Doe", email: "jane@example.com" }
//   ];

//   public async getUser(id: number): Promise<User | null> {
//     const user = this.users.find(u => u.id === id);
//     return user || null;
//   }

//   public async getAllUsers(): Promise<User[]> {
//     return this.users;
//   }

//   public async createUser(name: string, email: string): Promise<User> {
//     const newUser: User = {
//       id: this.users.length + 1,
//       name,
//       email
//     };
//     this.users.push(newUser);
//     return newUser;
//   }
// }