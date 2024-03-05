import { EventPattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { EventMessageArg, consumer } from './kafka-consumer.i';
import { ChatLogger } from '../../../app/infrastructure/common/utils/logger/logger';
import { SignUpHandler } from '../../../app/application/sign-up-handle/sign-up-handler';

@Controller()
export class KafkaConsumerHandler {
  constructor(private logger: ChatLogger, private signUpHandler: SignUpHandler) {}

  @EventPattern(consumer.chatTopic)
  public async EventMessaging(@Payload() payload: EventMessageArg) {
    const event = payload.eventName;

    switch(event){
      case "create-user": {
        this.logger.log("Handle Create User has been call", "CreateUserEvent");
        await this.signUpHandler.handle$();
      }
    }
  }
}
