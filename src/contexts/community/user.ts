import { z } from 'zod';
import { accountSchema } from '~/contexts/accounts/accountModel';

export const userSchema = accountSchema.pick({
  id: true,
  name: true,
  email: true,
  organization: true,
});

export class User implements z.infer<typeof userSchema> {
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
