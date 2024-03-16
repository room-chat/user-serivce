import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthorizedUserFromDb, AuthorizedUserSuccess, AuthUserBodyReq, AuthorizedUserFailure, IStatus } from './user-auth.controller.i';
import { Request } from 'express';
import { AxiosRequestConfig } from 'axios';
import { HttpClient } from '../../../../app/infrastructure/common/http-client/http-client';
import { ConfigService } from '../../../../app/infrastructure/config/config.service';
import { AuthorizedUserService } from '../../../../app/service/authorized-user/authorized-user';
import { ChatLogger } from '../../../../app/infrastructure/common/utils/logger/logger';

@Controller()
export class UserAuthController {
  constructor(private http: HttpClient, private configService: ConfigService, private authUserService: AuthorizedUserService, private logger: ChatLogger) {}

  @Post('/authorized-user')
  public async authorizedUser(@Req() req: Request, @Body() authUserBodyReq: AuthUserBodyReq): Promise<AuthorizedUserSuccess | AuthorizedUserFailure> {
    const url = `${this.configService.HttpConfig().dbHttpUrl.authorized}`;
    const config: AxiosRequestConfig = {
      headers: {},
    };
    const authParam = {
      email: authUserBodyReq.email,
    };

    const getUserForAuth = (await this.http.post$(url, config, authParam)).data as AuthorizedUserFromDb;

    const isValid = this.authUserService.authorizedUser$(authUserBodyReq.password, getUserForAuth[0].password);

    if (isValid) {
      const urlGetUserInfo = `${this.configService.HttpConfig().dbHttpUrl.getUserInfor}`.replace(':email', authUserBodyReq.email);
      const getUserInfo = (await this.http.get$(urlGetUserInfo, config)).data as AuthorizedUserSuccess;

      this.logger.log('Authorzied Success');
      return getUserInfo;
    }

    this.logger.log('Authorzied Failure');
    return {
      email: getUserForAuth.email,
      status: IStatus.FAILURE,
    };
  }
}
