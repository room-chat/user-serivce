export enum IStatus {
  SUCCESS = 'success',
  FAILURE = 'failure'
}

export interface AuthUserBodyReq {
  email: string;
  password: string;
}

export interface AuthorizedUserSuccess {
  userId: number;
  email: string;
  address: string;
  dayOfBirth: string;
  firstName: string;
  lastName: string;
}

export interface AuthorizedUserFromDb {
  userId: number;
  email: string;
  password: string;
}

export interface AuthorizedUserFailure {
  email: string;
  status: IStatus;
}
