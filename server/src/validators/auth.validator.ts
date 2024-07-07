import { ParamSchema } from "express-validator";

export const loginValidations: Record<string, ParamSchema> = {
  email: {
    trim: true,
    isEmail: true,
  },
  password: {
    isLength: { options: { min: 6 } },
  },
};
