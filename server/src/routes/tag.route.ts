import {
  handleCreateTag,
  handleDeleteTag,
  handleGetTags,
} from "@/controllers/tag.controller";
import authenticator from "@/middlewares/authenticate";
import validator from "@/middlewares/validate";
import { createTagValidations } from "@/validators/tag.validator";
import express, { Router } from "express";
import { checkSchema } from "express-validator";

const router: Router = express.Router();

router
  .route("/")
  .get(authenticator, handleGetTags)
  .post(
    authenticator,
    checkSchema(createTagValidations),
    validator,
    handleCreateTag
  );

router.delete("/:id", authenticator, handleDeleteTag);

export default router;
