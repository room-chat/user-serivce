import { Module } from '@nestjs/common';
import { ConfigServiceModule } from '../../../config/config.service.module';
import { ChatLoggerModule } from '../../utils/logger/logger.module';
import { KafkaProducerService } from './kafka-producer';

@Module({
  imports: [ConfigServiceModule, ChatLoggerModule],
  exports: [KafkaProducerService],
  providers: [KafkaProducerService],
})
export class KafkaProducerModule {}
