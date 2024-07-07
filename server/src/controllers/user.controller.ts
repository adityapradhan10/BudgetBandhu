import BASE_CONST from "@/common/constants";
import { RegisterUserPayload } from "@/common/interfaces";
import Logger from "@/common/Logger";
import UserService from "@/services/user.service";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

// @desc      Register user
// @route     POST /api/v1/user
// @access    Public
export const handleRegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const data: RegisterUserPayload = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const userResult = await new UserService().createUser(data);
    res.status(201).json({
      status: 201,
      result: {
        userEmail: userResult,
      },
    });
  } catch (error: any) {
    if (error.message === BASE_CONST.ERROR.USER_EXISTS) {
      next(createHttpError.BadRequest(BASE_CONST.ERROR.USER_EXISTS));
    } else {
      Logger.instance.error(error);
      next(createHttpError.InternalServerError());
    }
  }
};
