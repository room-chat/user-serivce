import { Injectable } from '@nestjs/common';
import { Kafka, ProducerRecord } from 'kafkajs';
import { ConfigService } from '../../../config/config.service';
import { ChatLogger } from '../../utils/logger/logger';

@Injectable()
export class KafkaProducerService {

  constructor(private kafkaConfig: ConfigService, private logger: ChatLogger) {
  }

  public async send(params: ProducerRecord): Promise<any> {
    const config = this.kafkaConfig.KafkaConfig();
    const kafka = new Kafka({
      brokers: config.options.client.brokers,
      clientId: config.options.client.clientId,
    });

    const producer = kafka.producer();

    try {
      await producer.connect();
      const messages: ProducerRecord = {
        topic: params.topic,
        messages: params.messages
      };

      this.logger.log('Producer topic has send message', 'PublisherTopic');
      await producer.send(messages);
    } catch (error) {
      this.logger.log('Producer connect error', 'PublisherTopicError');
      throw new Error(error.message);
    } finally {
      await producer.disconnect();
    }
  }
}
