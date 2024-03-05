import { Controller, Post } from "@nestjs/common";
import { AuthorizedUser } from "./user-auth.controller.i";

@Controller('')
export class UserAuthController {

  @Post("/authorized-user")
  public async authorizedUser(): Promise<AuthorizedUser>{
    return;
  }
}