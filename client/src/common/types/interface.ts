export interface ActionError {
  rejectValue: { message: string };
}

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AccountSlice {
  loading: boolean;
  user: User | null;
  error: string | null;
}
