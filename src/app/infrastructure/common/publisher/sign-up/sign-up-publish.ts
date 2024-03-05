import { Injectable } from '@nestjs/common';
import { KafkaProducerService } from '../producer/kafka-producer';

@Injectable()
export class SignUpPublish {
  constructor(private producer: KafkaProducerService) {}

  public async publish(params): Promise<void> {
    const message = {
      key: params.key,
      value: params.value
    }
    await this.producer.send(params.topic, message);
  }
}
