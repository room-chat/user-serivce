import { KafkaConfig } from "../../../../../enviroment/kafka";

export const topics = new KafkaConfig().producerTopics;
{}
export enum ChatKafkaResultTopic{
  CREAT_USER_RESULT = 'create-user-result'
}

export interface IMessage {
  key: string;
  value: string;
}

export enum PubResult {
  SUCCESS = 'success',
  FAILURE = 'failure'
}