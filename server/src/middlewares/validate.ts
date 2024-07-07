import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import createHttpError from "http-errors";

export default (req: Request, res: Response, next: NextFunction): void => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    next(
      createHttpError.UnprocessableEntity(
        `Invalid value for ${
          errors.array()[0].param
        }. Please provide values in proper format`
      )
    );
  } else {
    next();
  }
};
