import { Module } from "@nestjs/common";
import { UserAuthController } from "./user-auth.controller";
import { HttpClientModule } from "../../../../app/infrastructure/common/http-client/http-client.module";
import { ConfigServiceModule } from "../../../../app/infrastructure/config/config.service.module";
import { AuthorizedUserServiceModule } from "../../../../app/service/authorized-user/authorized-user.module";
import { ChatLoggerModule } from "../../../../app/infrastructure/common/utils/logger/logger.module";

@Module({
  imports: [HttpClientModule, ConfigServiceModule, ChatLoggerModule, AuthorizedUserServiceModule],
  controllers: [UserAuthController],
})
export class UserAuthControllerModule{}