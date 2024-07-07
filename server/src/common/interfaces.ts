// GENERAL INTERFACES
// PAYLOAD INTERFACES
export interface RegisterUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface CreateTagPayload {
  name: string;
  type: "income" | "expense";
}
