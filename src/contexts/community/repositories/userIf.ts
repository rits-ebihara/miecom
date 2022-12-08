import { IUserIF } from '../user/IUserIF';
import { UserModel } from '../user/userModel';

class UserIF implements IUserIF {
  async getUserById(_id: string): Promise<UserModel | null> {
    throw new Error('Method not implemented.');
  }
}

export const createUserIF = (): IUserIF => {
  return new UserIF();
};
