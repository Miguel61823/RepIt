import { Account } from ".";
import { pool } from "../db";


export class AccountService {
  public async getAll(): Promise<Account[]> {
    let select = ``
    const query = {
      text: select,
      values: [],
    }
    const {rows} = await pool.query(query)
    const accounts = []
    for (const row of rows){
      accounts.push(row)
    }
    return accounts
  }

  public async addAccount(userData: Account): Promise<Account>{
    let select =
    `INSERT INTO member(email, first_name, last_name)
     VALUES ($1, $2, $3)
     RETURNING *`;

    const query = {
      text: select,
      values: [userData.email, userData.first_name, userData.last_name]
    }
    const {rows}  = await pool.query(query)
    return rows[0];
  }

  public async getByEmail(email: string): Promise<Account> {
    let select =  `
    SELECT * FROM member
    WHERE email = $1`

    const query = {
      text: select,
      values: [email],
    }

    const {rows} = await pool.query(query)
    return rows[0]
  }
}