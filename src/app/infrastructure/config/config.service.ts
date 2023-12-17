import { Transport } from '@nestjs/microservices';
import { KafkaConfig } from '../../../enviroment/kafka';

export class ConfigService {
  public kafkaConfig = new KafkaConfig();

  public KafkaConfig() {
    return {
      name: 'KAFKA_CONFIG',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.kafkaConfig.clientId,
          brokers: this.kafkaConfig.brokers,
        },
        consumer: {
          groupId: this.kafkaConfig.groupId,
        },
        producer: {},
      },
    };
  }
}
