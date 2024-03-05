import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { ConfigService } from '../../../config/config.service';
import { IMessage } from './kafka-producer.i';
import { ChatLogger } from '../../utils/logger/logger';

@Injectable()
export class KafkaProducerService {

  constructor(private kafkaConfig: ConfigService, private logger: ChatLogger) {
  }

  public async send(topic: string, message: IMessage): Promise<any> {
    const config = this.kafkaConfig.KafkaConfig();
    const kafka = new Kafka({
      brokers: config.options.client.brokers,
      clientId: config.options.client.clientId,
    });

    const producer = kafka.producer();

    try {
      await producer.connect();
      const messages = [
        {
          key: message.key,
          value: message.value
        }
      ];

      this.logger.log('Producer topic has send message', 'PublisherTopic');
      await producer.send({ topic, messages });
    } catch (error) {
      this.logger.log('Producer connect error', 'PublisherTopicError');
      throw new Error(error.message);
    } finally {
      await producer.disconnect();
    }
  }
}
