import { handleGetAuthUser, handleUserLogin } from "@/controllers/auth.controller";
import authenticator from "@/middlewares/authenticate";
import validator from "@/middlewares/validate";
import { loginValidations } from "@/validators/auth.validator";
import express, { Router } from "express";
import { checkSchema } from "express-validator";

const router: Router = express.Router();

router
  .route("/")
  .get(authenticator, handleGetAuthUser)
  .post(checkSchema(loginValidations), validator, handleUserLogin);

export default router;
