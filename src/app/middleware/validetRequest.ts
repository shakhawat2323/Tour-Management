import { NextFunction, Request, Response } from "express";

import { AnyZodObject } from "zod";
export const validateRequest =
  (ZodSchema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("old body", req.body);
      req.body = await ZodSchema.parseAsync(req.body);
      console.log("new boday", req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
