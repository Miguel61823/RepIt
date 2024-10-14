import {} from 'tsoa';

import { Account } from '.';
import { AccountService } from './service';
 
@Route('account')
export class AccountController extends Controller{
  @Get('')
  public async getAll(
  ): Promise<Account[]> {
    return new AccountService().getAll()
  }
}