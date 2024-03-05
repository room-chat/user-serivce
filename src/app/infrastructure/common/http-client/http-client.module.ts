import { Module } from "@nestjs/common";
import { HttpClient } from "./http-client";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  exports: [HttpClient],
  providers: [HttpClient]
})
export class HttpClientModule {}