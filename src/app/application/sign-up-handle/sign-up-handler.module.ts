import { Module } from '@nestjs/common';
import { SignUpHandler } from './sign-up-handler';
import { SignUpServiceModule } from '../../../app/service/sign-up/sign-up.service.module';
import { ChatLoggerModule } from '../../../app/infrastructure/common/utils/logger/logger.module';
import { KafkaProducerModule } from '../../infrastructure/common/publisher/producer/kafka-producer.module';

@Module({
  imports: [ChatLoggerModule, SignUpServiceModule, KafkaProducerModule],
  exports: [SignUpHandler],
  providers: [SignUpHandler],
})
export class SignUpHandlerModule {}
