import * as bcrypt from 'bcrypt';

export class Utils {
  constructor() {}

  public async hashPassword(password: string): Promise<string> {
    const saltOrRounds = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, saltOrRounds);

    return hash;
  }

  public async isMatch(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}
