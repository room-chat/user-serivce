import { KafkaConfig } from "src/enviroment/kafka";

export const topics = new KafkaConfig().producerTopics;
{}
export enum ChatKafkaResultTopic{
  CREAT_USER = 'create-user-result'
}

export interface IMessage {
  key: string;
  value: string;
}