import * as fs from 'fs';
import { SASLOptions } from 'kafkajs';
import * as path from 'path';

export type EnvConfig = {
  KAFKA_CONFIG: string;
};

export type ConsumerTopic = {
  chatTopic: string;
};

export type ProducerTopic = {
  chatTopic: string;
};

export type IConf = {
  clientId: string;
  brokers: string[];
  groupId: string;
  consumerTopics: ConsumerTopic;
  producerTopic: ProducerTopic;
  ssl: boolean;
  sasl: SASLOptions;
};

export class KafkaConfig {
  public readonly dir = path.join(__dirname, '../asset/config/config-file.json');
  public readonly nameConfig = 'kafka';

  public clientId = 'pbx-chat';
  public groupId = 'pbx-chat';
  public brokers = [];
  public consumerTopics = {
    chatTopic: 'CHAT-MESSAGING-TOPIC',
  };
  public producerTopics = {
    chatTopic: 'CHAT-MESSAGING-TOPIC',
  };
  public ssl = false;
  public sasl: SASLOptions = {
    mechanism: "plain",
    username: "",
    password: ""
  };

  constructor(env: EnvConfig = process.env as EnvConfig) {
    let conf: IConf;
    try {
      conf = JSON.parse(fs.readFileSync(env.KAFKA_CONFIG || this.dir, 'utf-8'))[this.nameConfig] as IConf;
    } catch (e) {
      console.log(e);
    }
    this.clientId = conf.clientId || this.clientId;
    this.groupId = conf.groupId || this.groupId;
    this.brokers = conf.brokers || this.brokers;
    this.consumerTopics = conf.consumerTopics || this.consumerTopics;
    this.producerTopics = conf.producerTopic || this.producerTopics;
    this.ssl = conf.ssl || this.ssl;
    this.sasl = !conf.sasl ? undefined : conf.sasl; 
  }
}
