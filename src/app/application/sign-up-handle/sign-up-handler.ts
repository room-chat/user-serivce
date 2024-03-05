import { SignUpService } from '../../../app/service/sign-up/sign-up.service';
import { ChatLogger } from '../../../app/infrastructure/common/utils/logger/logger';
import { Injectable } from '@nestjs/common';
import { IMessage, Topics } from '../../infrastructure/common/publisher/producer/kafka-producer.i';
import { KafkaProducerService } from '../../infrastructure/common/publisher/producer/kafka-producer';

@Injectable()
export class SignUpHandler {
  constructor(private logger: ChatLogger, private signUpService: SignUpService, private producer: KafkaProducerService) {}

  public async handle$(): Promise<any> {
    const data = await this.signUpService.getUser({ accountName: 'examle2_account@email.com' });
    if (!data) {
      const message: IMessage = {
        value: 'No user was found',
      };
      this.logger.log("User wasn't found", 'GETUSER');
      await this.producer.publisher(Topics.CHAT_TOPIC, message);
    }

    this.logger.log('User has found', 'GETUSER');
    return data;
  }
}
