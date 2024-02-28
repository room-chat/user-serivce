import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaConsumerModule } from './app/controller/messaging/kafka-consumer.module';
import { ConfigServiceModule } from './app/infrastructure/config/config.service.module';
import { RestControllerModule } from './app/controller/api/rest-controller.module';

@Module({
  imports: [KafkaConsumerModule, ConfigServiceModule, RestControllerModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
