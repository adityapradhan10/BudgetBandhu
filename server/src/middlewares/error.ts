import BASE_CONST from "@/common/constants";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

export default (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let status = error.status;
  let message = error.message;
  if (!error.status) {
    status = 500;
    message = BASE_CONST.ERROR.INTERNAL_SERVER;
  }
  res.status(status);
  res.send({
    status,
    result: {
      message,
    },
  });
};
