import { ParamSchema } from "express-validator";

export const registerValidations: Record<string, ParamSchema> = {
  firstName: {
    trim: true,
    notEmpty: true,
    isAlpha: true,
  },
  lastName: {
    trim: true,
    notEmpty: true,
    isAlpha: true,
  },
  email: {
    trim: true,
    isEmail: true,
  },
  password: {
    isLength: { options: { min: 6 } },
  },
};
