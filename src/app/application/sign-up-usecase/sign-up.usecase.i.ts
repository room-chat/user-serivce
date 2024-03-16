export interface SignUpRes {
  message?: string;
  code?: string;
  data?: {
    email: string;
  };
}

export interface CreateUserParams {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  address?: string;
  dayOfBirth?: string;
}
