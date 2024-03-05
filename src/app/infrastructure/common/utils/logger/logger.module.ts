import { Module } from "@nestjs/common";
import { ChatLogger } from "./logger";

@Module({
  imports: [],
  exports: [ChatLogger],
  providers: [ChatLogger]
})
export class ChatLoggerModule {}