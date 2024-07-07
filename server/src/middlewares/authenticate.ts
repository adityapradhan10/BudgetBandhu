import UserService from "@/services/user.service";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { JwtPayload, verify } from "jsonwebtoken";

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = (req.headers.authorization ?? "").replace("Bearer ", "");
  const privateKey = process.env.PRIVATE_KEY as string;
  const data = verify(token, privateKey) as JwtPayload;
  const email = data.payload.user;

  const user = await new UserService().getUserByEmail(email);
  if (!user) {
    next(createHttpError.Unauthorized());
  } else {
    req.headers.authorization = JSON.stringify(user);
    next();
  }
};
