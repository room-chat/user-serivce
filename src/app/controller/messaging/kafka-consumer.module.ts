import { Module } from "@nestjs/common";
import { KafkaConsumerHandler } from "./kafka-consumer";
import { ChatLoggerModule } from "../../../app/infrastructure/common/utils/logger/logger.module";
import { SignUpHandlerModule } from "../../../app/application/sign-up-handle/sign-up-handler.module";

@Module({
  controllers: [KafkaConsumerHandler],
  imports: [ChatLoggerModule, SignUpHandlerModule],
  exports: [],
  providers: [KafkaConsumerHandler]
})
export class KafkaConsumerModule {}