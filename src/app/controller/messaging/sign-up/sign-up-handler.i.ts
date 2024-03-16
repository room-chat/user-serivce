export interface CreateUserParams{
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  address?: string;
  dayOfBirth?: string;
}