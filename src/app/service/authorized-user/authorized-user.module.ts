import { Module } from "@nestjs/common";
import { ChatLoggerModule } from "../../../app/infrastructure/common/utils/logger/logger.module";
import { AuthorizedUserService } from "./authorized-user";

@Module({
  imports: [ChatLoggerModule],
  exports: [AuthorizedUserService],
  providers: [AuthorizedUserService]
})
export class AuthorizedUserServiceModule {}