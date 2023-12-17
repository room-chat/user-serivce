import * as fs from 'fs';
import * as path from 'path';

export type EnvConfig = {
  directPath: string;
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
};

export class KafkaConfig {
  public readonly dir = path.join(__dirname, '../../src/asset/config/config-file.json');
  public readonly nameConfig = 'kafka';

  public clientId = 'pbx-chat';
  public groupId = 'pbx-chat';
  public brokers = [];
  public consumerTopics = {
    chatTopic: 'CHAT-MESSAGING',
  };
  public producerTopics = {
    chatTopic: 'CHAT-MESSAGING',
  };

  constructor() {
    let conf: IConf;
    try {
      conf = JSON.parse(fs.readFileSync(this.dir, 'utf-8'))[this.nameConfig] as IConf;
    } catch (e) {
      console.log(e);
    }

    this.clientId = conf.clientId || this.clientId;
    this.groupId = conf.groupId || this.groupId;
    this.brokers = conf.brokers || this.brokers;
    this.consumerTopics = conf.consumerTopics || this.consumerTopics;
    this.producerTopics = conf.producerTopic || this.producerTopics;
  }
}
