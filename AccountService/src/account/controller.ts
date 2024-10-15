import {
  Body,
  Query,
  Controller,
  Post,
  Get,
  Response,
  Route,
  Put,
  Path,
} from 'tsoa';


import { Account } from '.';
import { AccountService } from './service';

function isEmptyObj(obj: object) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

@Route('account')
export class AccountController extends Controller{
  @Get('')
  public async getAll(
  ): Promise<Account[]> {
    return new AccountService().getAll()
  }

  @Post('')
  public async addAccount(
    @Body() userData: Account,
  ): Promise<Account|undefined>{
    return new AccountService().getByEmail(userData.email)
      .then(async (found: Account | undefined): Promise<Account|undefined> => {
        if (found) {
          console.log("This email is already related to a different account");
          this.setStatus(409); //409??
          return undefined
        } else {
          return await new AccountService().addAccount(userData);
        }
      })
  }


}