import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { EventMessage } from './kafka-consumer.i';

@Controller()
export class KafkaConsumerHandler {
  constructor() {}

  @MessagePattern('CHAT-MESSAGING')
  public async EventCommit(@Payload() payload: EventMessage) {
    console.log('=====', payload);
  }
}
