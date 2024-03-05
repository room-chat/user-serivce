import { Injectable } from '@nestjs/common';
import { HttpClient } from '../../../app/infrastructure/common/http-client/http-client';
import { GetUserParams } from './sign-up.service.i';
import { ConfigService } from '../../../app/infrastructure/config/config.service';
import { ChatLogger } from '../../../app/infrastructure/common/utils/logger/logger';

@Injectable()
export class SignUpService {
  constructor(private httpClient: HttpClient, private configService: ConfigService, private logger: ChatLogger) {}

  public async getUser(params: GetUserParams): Promise<any> {
    this.logger.log('Call API get User', 'GETUSER');
    const path = this.configService.HttpConfig().concat(`/user-information/${params.accountName}`);
    const user = await this.httpClient.get$(path);
    
    if(!user){
      return;
    }
    
    return user;
  }
}
