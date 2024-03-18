import { Injectable } from "@nestjs/common";
import { CreateUserParams, SignUpRes } from "./sign-up.usecase.i";
import { ChatLogger } from "../../../app/infrastructure/common/utils/logger/logger";
import { ChatKafkaResultTopic, PubResult } from "../../../app/infrastructure/common/publisher/producer/kafka-producer.i";
import { SignUpService } from "../../../app/service/sign-up/sign-up.service";
import { SignUpPublish } from "../../../app/infrastructure/common/publisher/sign-up/sign-up-publish";

@Injectable()
export class SignUpUsecase{

  constructor(private logger: ChatLogger, private signUpService: SignUpService, private producer: SignUpPublish){}

  public async excute(userParam: CreateUserParams): Promise<SignUpRes> {
    this.logger.log("Excute register new user");

    const data = await this.signUpService.getUser({ email: userParam.email });
    if (data) {
      this.logger.log('User has found', 'GETUSER');
      const message = {
        result: PubResult.FAILURE,
        data
      };
      await this.producer.publish(ChatKafkaResultTopic.CREAT_USER_RESULT, message);
    }
    
    this.logger.log("Create user processing", 'GETUSER');

    const createUser = await this.signUpService.createUser(userParam);
    const message = {
      result: PubResult.SUCCESS,
      data: createUser.data
    };
    await this.producer.publish(ChatKafkaResultTopic.CREAT_USER_RESULT, message);
    return createUser;
  }
}