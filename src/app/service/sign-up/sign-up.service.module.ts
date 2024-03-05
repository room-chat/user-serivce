import { Module } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { ConfigServiceModule } from '../../infrastructure/config/config.service.module';
import { HttpClientModule } from '../../infrastructure/common/http-client/http-client.module';
import { ChatLoggerModule } from '../../infrastructure/common/utils/logger/logger.module';

@Module({
  imports: [ConfigServiceModule, HttpClientModule, ChatLoggerModule],
  exports: [SignUpService],
  providers: [SignUpService],
})
export class SignUpServiceModule {}
