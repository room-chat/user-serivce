import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthorizedUserFromDb, AuthUserBodyReq, AuthorizedUserRes, AuthorizedUser } from './user-auth.controller.i';
import { Request } from 'express';
import { AxiosRequestConfig } from 'axios';
import { HttpClient } from '../../../../app/infrastructure/common/http-client/http-client';
import { ConfigService } from '../../../../app/infrastructure/config/config.service';
import { AuthorizedUserService } from '../../../../app/service/authorized-user/authorized-user';
import { ChatLogger } from '../../../../app/infrastructure/common/utils/logger/logger';
import { StatusCode } from '../../../infrastructure/utils/constant';

@Controller()
export class UserAuthController {
  constructor(private http: HttpClient, private configService: ConfigService, private authUserService: AuthorizedUserService, private logger: ChatLogger) {}

  @Post('/authorized-user')
  public async authorizedUser(@Req() req: Request, @Body() authUserBodyReq: AuthUserBodyReq): Promise<AuthorizedUserRes> {
    const url = `${this.configService.HttpConfig().dbHttpUrl.authorized}`;
    const config: AxiosRequestConfig = {
      headers: {},
    };
    const authParam = {
      email: authUserBodyReq.email,
    };

    try{
      const getUserForAuth = (await this.http.post$(url, config, authParam)).data as AuthorizedUserFromDb;

      if(!getUserForAuth){
        const unauthorizedUserRes = {
          message: ['unauthorizedUser'],
          code: StatusCode.UNAUTHORIZED,
          data: {
            email: authUserBodyReq.email
          },
        };

        this.logger.log(`There is no user exist: ${authUserBodyReq.email}`, "GETUSERAUTH");
        return unauthorizedUserRes;
      }
  
      const isValid = await this.authUserService.authorizedUser$(authUserBodyReq.password, getUserForAuth[0].password);
  
      if (isValid) {
        const urlGetUserInfo = `${this.configService.HttpConfig().dbHttpUrl.getUserInfor}`.replace(':email', authUserBodyReq.email);
        const getUserInfo = (await this.http.get$(urlGetUserInfo, config)).data as AuthorizedUser;
  
        this.logger.log('Authorzied Success');
        
        const resultAuthorized: AuthorizedUserRes = {
          message: ['authorizedUserSuccess'],
          code: StatusCode.SUCCESS,
          data: getUserInfo,
        }
        return resultAuthorized;
      }
    } catch(e){
      this.logger.error("Authorized User has been error", e.message, {data: { email: authUserBodyReq.email }});

      throw new Error();
    }
  }
}
