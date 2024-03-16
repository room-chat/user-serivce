import { Injectable } from '@nestjs/common';
import { HttpClient } from '../../../app/infrastructure/common/http-client/http-client';
import { AxiosRequestConfig } from 'axios';
import { GetUserParams, UserInforParams } from './sign-up.service.i';
import { ConfigService } from '../../../app/infrastructure/config/config.service';
import { ChatLogger } from '../../../app/infrastructure/common/utils/logger/logger';
import { SignUpRes } from '../../../app/application/sign-up-usecase/sign-up.usecase.i';

import { Utils } from '../../infrastructure/utils/utils';

@Injectable()
export class SignUpService {

  private utils = new Utils();

  constructor(private httpClient: HttpClient, private configService: ConfigService, private logger: ChatLogger) {
  }

  public async getUser(params: GetUserParams): Promise<any> {
    this.logger.log('Call API get User', 'GETUSER');
    const path = this.configService.HttpConfig().dbHttpUrl.getUserInfor.replace(':email', params.email);
    const user = await this.httpClient.get$(path);

    if (!user) {
      return;
    }

    return user;
  }

  public async createUser(userInfor: UserInforParams): Promise<SignUpRes> {
    const hashPassword = await this.utils.hashPassword(userInfor.password);

    const reduceUser = {
      ...userInfor,
      password: hashPassword,
    };
    const config: AxiosRequestConfig = {
      headers: {},
    };

    const path = this.configService.HttpConfig().dbHttpUrl.createUser;

    const createUser = (await this.httpClient.post$(path, config, reduceUser)).data as SignUpRes;

    return createUser;
  }
}
