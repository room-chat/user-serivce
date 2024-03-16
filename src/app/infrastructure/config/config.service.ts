import { Transport } from '@nestjs/microservices';
import { KafkaConfig } from '../../../enviroment/kafka';
import { Partitioners } from 'kafkajs';
import { Injectable } from '@nestjs/common';
import { HttpConfig } from '../../../enviroment/http';

@Injectable()
export class ConfigService {
  public readonly kafkaConfig: KafkaConfig;
  public readonly httpConfig: HttpConfig;

  constructor() {
    this.kafkaConfig = new KafkaConfig();
    this.httpConfig = new HttpConfig();
  }

  public KafkaConfig() {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.kafkaConfig.clientId,
          brokers: this.kafkaConfig.brokers,
          ssl: this.kafkaConfig.ssl,
          sasl: undefined,
        },
        consumer: {
          groupId: this.kafkaConfig.groupId,
        },
        producer: {
          createPartitioner: Partitioners.LegacyPartitioner,
        },
      },
    };
  }

  public HttpConfig() {
    return {
      dbHttpUrl: {
        getUserInfor: `${this.httpConfig.dbManageHttp}/user-information/:email`,
        authorized: `${this.httpConfig.dbManageHttp}/authorized-user`,
        createUser: `${this.httpConfig.dbManageHttp}/create-user`,
      },
    };
  }
}
