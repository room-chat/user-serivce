import { Module } from "@nestjs/common";
import { UserAuthControllerModule } from "./user-auth/user-auth.controller.module";

@Module({
  imports: [UserAuthControllerModule]
})
export class RestControllerModule {}