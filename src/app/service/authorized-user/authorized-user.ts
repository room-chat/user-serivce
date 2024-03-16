import { Injectable } from '@nestjs/common';
import { ChatLogger } from '../../../app/infrastructure/common/utils/logger/logger';
import { Utils } from '../../infrastructure/utils/utils';

@Injectable()
export class AuthorizedUserService {
  private utils: Utils;

  constructor(private logger: ChatLogger) {
    this.utils = new Utils();
  }

  public async authorizedUser$(rawPassword: string, hashPassword: string) {
    const isMatch = await this.utils.isMatch(rawPassword, hashPassword);
    return isMatch;
  }
}
