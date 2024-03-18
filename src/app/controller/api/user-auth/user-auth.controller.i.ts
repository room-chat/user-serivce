import { StatusCode } from "../../../infrastructure/utils/constant";

export interface AuthUserBodyReq {
  email: string;
  password: string;
}

export interface AuthorizedUserRes {
  message: string[],
  code: StatusCode,
  data?: AuthorizedUser,
}

export interface AuthorizedUser {
  userId?: number;
  email?: string;
  address?: string;
  dayOfBirth?: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthorizedUserFromDb {
  userId: number;
  email: string;
  password: string;
}
