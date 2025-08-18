import httpStatus from "http-status-codes";

import { sendReponse } from "../../utils/sendResponce";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import AppError from "../../errorhelpers/AppErro";
const credntialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const logininfo = await AuthService.credentialsLogin(req.body);
    res.cookie("accessToken", logininfo.accessToken, {
      httpOnly: true,
      secure: false,
    });
    res.cookie("refreshToken", logininfo.refreshToken, {
      httpOnly: true,
      secure: false,
    });
    sendReponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: " Users Logged Successfully",
      data: logininfo,
    });
  }
);
const getNewaccesToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "No refreshtoken reseive from cookies"
      );
    }
    const tokeninfo = await AuthService.getNewaccesToken(
      refreshToken as string
    );
    res.cookie("accessToken", tokeninfo.accessToken, {
      httpOnly: true,
      secure: false,
    });

    sendReponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: " Users Logged Successfully",
      data: tokeninfo,
    });
  }
);

export const authcontrollers = {
  credntialsLogin,
  getNewaccesToken,
};
