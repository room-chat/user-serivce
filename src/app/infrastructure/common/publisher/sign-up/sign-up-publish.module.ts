import { Module } from "@nestjs/common";
import { SignUpPublish } from "./sign-up-publish";
import { KafkaProducerModule } from "../producer/kafka-producer.module";

@Module({
  imports: [KafkaProducerModule],
  exports: [SignUpPublish],
  providers: [SignUpPublish]
})
export class SignUpPublishModule {}