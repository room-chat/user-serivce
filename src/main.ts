import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaOptions, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from './app/infrastructure/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const kafkaOptions = app.get(ConfigService).KafkaConfig();
  app.connectMicroservice<MicroserviceOptions>(kafkaOptions as KafkaOptions);
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
  