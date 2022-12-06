import { z } from 'zod';

export const accountSchema = z.object({
  /** EIMユーザーのDocument ID */
  id: z.string(),
  /** 氏名 */
  name: z.string(),
  /** メールアドレス */
  email: z.string(),
  /** 所属 */
  organization: z.string(),
});

export type Account = z.infer<typeof accountSchema>;

export class AccountModel {
  public readonly value: Account;
  constructor(value: Account) {
    const parsed = accountSchema.parse(value);
    this.value = parsed;
  }
}
