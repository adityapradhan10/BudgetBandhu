import { handleRegisterUser } from "@/controllers/user.controller";
import validator from "@/middlewares/validator";
import { registerValidations } from "@/validators/user.validator";
import express, { Router } from "express";
import { checkSchema } from "express-validator";

const router: Router = express.Router();

router.route("/").post(
  checkSchema(registerValidations),
  validator,
  handleRegisterUser
);

export default router;
