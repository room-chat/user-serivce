import { ChatLogger } from '../../../infrastructure/common/utils/logger/logger';
import { Injectable } from '@nestjs/common';
import { SignUpUsecase } from '../../../../app/application/sign-up-usecase/sign-up.usecase';
import { CreateUserParams } from './sign-up-handler.i';

@Injectable()
export class SignUpHandler {
  constructor(private logger: ChatLogger, private signUpUsecase: SignUpUsecase) {}

  public async handle$(creatUseParams: CreateUserParams): Promise<any> {

    const data = await this.signUpUsecase.excute(creatUseParams);
    return data;
  }
}
