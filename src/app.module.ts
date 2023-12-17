import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigServiceModule } from './app/infrastructure/config/config.service.module';
import { KafkaConsumerModule } from './app/controller/messaging/kafka-consumer.module';

@Module({
  imports: [ConfigServiceModule, KafkaConsumerModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
