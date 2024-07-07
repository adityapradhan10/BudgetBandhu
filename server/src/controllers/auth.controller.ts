import BASE_CONST from "@/common/constants";
import { LoginUserPayload } from "@/common/interfaces";
import Logger from "@/common/Logger";
import AuthService from "@/services/auth.service";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

// @desc      Login user
// @route     POST /api/v1/auth
// @access    Public
export const handleUserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const data: LoginUserPayload = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const result = await new AuthService().userLogin(data);
    res.status(200).json({
      status: 200,
      result: {
        token: result,
      },
    });
  } catch (error: any) {
    switch (error.message) {
      case BASE_CONST.ERROR.USER_NOT_FOUND:
        next(createHttpError.NotFound(BASE_CONST.ERROR.USER_NOT_FOUND));
        break;
      case BASE_CONST.ERROR.INVALID_CRED:
        next(createHttpError.Unauthorized(BASE_CONST.ERROR.INVALID_CRED));
        break;
      default:
        Logger.instance.error(error);
        next(createHttpError.InternalServerError());
        break;
    }
  }
};
