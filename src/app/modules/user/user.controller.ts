/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status-codes";
import { UserServics } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import { sendReponse } from "../../utils/sendResponce";
import { envVars } from "../../config/env";
import { verifyToken } from "../../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServics.createUser(req.body);

    sendReponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Created Successfully",
      data: user,
    });
  }
);
const UpdateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    // const token = req.headers.authorization;
    // const verifiedToken = verifyToken(
    //   token as string,
    //   envVars.JWT_ACCESS_SECRET
    // ) as JwtPayload;
    const verifiedToken = req.user;
    const payload = req.body;
    const user = await UserServics.updateUser(userId, payload, verifiedToken);

    sendReponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Updated Successfully",
      data: user,
    });
  }
);

const getAlluser = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServics.getAlluser();

    // res.status(httpStatus.OK).json({
    //   success: true,
    //   message: "All Users Retrived Successfully",
    //   data: users,
    // });
    sendReponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Users Retrived Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

export const UserControllers = {
  createUser,
  getAlluser,
  UpdateUser,
};
