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
}