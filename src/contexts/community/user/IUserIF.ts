import { UserModel } from './userModel';

export interface IUserIF {
  getUserById: (id: string) => Promise<UserModel | null>;
}
