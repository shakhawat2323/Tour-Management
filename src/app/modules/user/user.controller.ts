import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status-codes";
import { UserServics } from "./user.service";
import AppError from "../../errorhelpers/AppErro";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // throw new AppError(httpStatus.BAD_REQUEST, "fake error");
    const user = await UserServics.createUser(req.body);

    res.status(httpStatus.CREATED).json({
      message: "User Created Successfully",
      user,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

export const UserControllers = {
  createUser,
};
