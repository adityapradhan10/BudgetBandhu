import BASE_CONST from "@/common/constants";
import { CreateTagPayload } from "@/common/interfaces";
import Logger from "@/common/Logger";
import TagService from "@/services/tag.service";
import type { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

// @desc      Create tag
// @route     POST /api/v1/tag
// @access    Private
export const handleCreateTag = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user: User = JSON.parse(req.headers.authorization ?? "");
  const data: CreateTagPayload = {
    name: req.body.name,
    type: req.body.type,
  };
  try {
    await new TagService().createTag(data, user.userId);
    res.status(201).json({
      status: 201,
      result: {},
    });
  } catch (error: any) {
    Logger.instance.error(error);
    next(createHttpError.InternalServerError());
  }
};

// @desc      Get all tags
// @route     GET /api/v1/tag
// @access    Private
export const handleGetTags = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user: User = JSON.parse(req.headers.authorization ?? "");
  try {
    const result = await new TagService().getTags(user.userId);
    res.status(200).json({
      status: 200,
      result,
    });
  } catch (error: any) {
    Logger.instance.error(error);
    next(createHttpError.InternalServerError());
  }
};

// @desc      Delete given tag
// @route     DELETE /api/v1/tag/:id
// @access    Private
export const handleDeleteTag = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user: User = JSON.parse(req.headers.authorization ?? "");
  const tagId = parseInt(req.params.id, 10);
  try {
    const result = await new TagService().deleteTag(tagId, user.userId);
    res.status(200).json({
      status: 200,
      result,
    });
} catch (error: any) {
    if (error.message === BASE_CONST.ERROR.TAG_NOT_FOUND) {
      next(createHttpError.NotFound(BASE_CONST.ERROR.TAG_NOT_FOUND));
    } else if (error.message === BASE_CONST.ERROR.UNAUTHORIZED) {
      next(createHttpError.Unauthorized());
    } else {
      Logger.instance.error(error);
      next(createHttpError.InternalServerError());
    }
  }
};
