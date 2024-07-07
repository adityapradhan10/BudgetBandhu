import errorHandler from "@/middlewares/error";
import auth from "@/routes/auth.route";
import tag from "@/routes/tag.route";
import user from "@/routes/user.route";
import express, { Application, NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export default (): Application => {
  const app: Application = express();

  app.use(express.json());
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/user", user);
  app.use("/api/v1/tag", tag);

  app.use((req: Request, res: Response, next: NextFunction): void => {
    next(createHttpError.NotFound());
  });

  app.use(errorHandler);

  return app;
};
