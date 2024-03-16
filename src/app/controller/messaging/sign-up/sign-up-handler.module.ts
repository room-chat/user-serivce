import { Module } from '@nestjs/common';
import { SignUpHandler } from './sign-up-handler';
import { ChatLoggerModule } from '../../../infrastructure/common/utils/logger/logger.module';
import { SignUpUsecaseModule } from '../../../../app/application/sign-up-usecase/sign-up.usecase.module';

@Module({
  imports: [ChatLoggerModule, SignUpUsecaseModule],
  exports: [SignUpHandler],
  providers: [SignUpHandler],
})
export class SignUpHandlerModule {}
