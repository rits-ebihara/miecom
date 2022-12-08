import { z } from 'zod';
import { accountSchema } from '~/contexts/accounts/accountModel';

export const userSchema = accountSchema.pick({
  id: true,
  name: true,
  email: true,
  organization: true,
});

class UserModelImpl implements z.infer<typeof userSchema> {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly organization: string;

  constructor(value: z.infer<typeof userSchema>) {
    const parsed = userSchema.parse(value);
    this.id = parsed.id;
    this.name = parsed.name;
    this.email = parsed.email;
    this.organization = parsed.organization;
  }
}

export type UserModel = UserModelImpl;

export const createUser = (value: z.infer<typeof userSchema>): UserModel => {
  return new UserModelImpl(value);
};

export const getCurrentUser = async (): Promise<UserModel> => ({
  id: 'u01234567890123456789',
  email: 'u001@example.com',
  name: 'ユーザー1',
  organization: '組織1',
});
