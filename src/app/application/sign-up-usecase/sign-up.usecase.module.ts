import { Module } from "@nestjs/common";
import { SignUpPublishModule } from "../../../app/infrastructure/common/publisher/sign-up/sign-up-publish.module";
import { ChatLoggerModule } from "../../../app/infrastructure/common/utils/logger/logger.module";
import { SignUpServiceModule } from "../../../app/service/sign-up/sign-up.service.module";
import { SignUpUsecase } from "./sign-up.usecase";

@Module({
  imports: [ChatLoggerModule, SignUpServiceModule, SignUpPublishModule],
  exports: [SignUpUsecase],
  providers: [SignUpUsecase]
})
export class SignUpUsecaseModule {}