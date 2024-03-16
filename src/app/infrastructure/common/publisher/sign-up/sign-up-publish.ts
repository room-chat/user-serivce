import { Injectable } from '@nestjs/common';
import { KafkaProducerService } from '../producer/kafka-producer';

@Injectable()
export class SignUpPublish {
  constructor(private producer: KafkaProducerService) {}

  public async publish(topic: string, data: any): Promise<void> {
    const message = {
      topic: topic,
      messages: [{
        key: '',
        value: JSON.stringify(data)
      }]
    }
    await this.producer.send(message);
  }
}
