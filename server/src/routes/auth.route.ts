import { handleUserLogin } from "@/controllers/auth.controller";
import validator from "@/middlewares/validator";
import { loginValidations } from "@/validators/auth.validator";
import express, { Router } from "express";
import { checkSchema } from "express-validator";

const router: Router = express.Router();

router.route("/").post(
  checkSchema(loginValidations),
  validator,
  handleUserLogin
);

export default router;
