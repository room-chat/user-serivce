import { Module } from "@nestjs/common";
import { KafkaConsumerHandler } from "./kafka-consumer";

@Module({
  imports: [],
  exports: [KafkaConsumerHandler],
  providers: [KafkaConsumerHandler]
})
export class KafkaConsumerModule {}