import { ParamSchema } from "express-validator";

export const createTagValidations: Record<string, ParamSchema> = {
  name: {
    trim: true,
    notEmpty: true,
  },
  type: {
    trim: true,
    custom: {
      options: (value) => ["income", "expense"].includes(value),
    },
  },
};
