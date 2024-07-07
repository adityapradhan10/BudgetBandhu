import BASE_CONST from "@/common/constants";
import { LoginUserPayload } from "@/common/interfaces";
import Logger from "@/common/Logger";
import AuthService from "@/services/auth.service";
import type { User } from "@prisma/client";
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
    res
      .cookie("token", result, {
        httpOnly: true,
        maxAge: 7200000,
      })
      .status(200)
      .json({
        status: 200,
        result: {},
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

// @desc      Get authenticated user
// @route     GET /api/v1/auth
// @access    Private
export const handleGetAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user: User = JSON.parse(req.headers.authorization ?? "");
  res.status(200).json({
    status: 200,
    result: {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });
};
