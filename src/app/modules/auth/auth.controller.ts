import httpStatus from "http-status-codes";

import { sendReponse } from "../../utils/sendResponce";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import AppError from "../../errorhelpers/AppErro";
import { setAuthCookie } from "../../utils/setcookies";
import { JwtPayload } from "jsonwebtoken";
const credntialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const logininfo = await AuthService.credentialsLogin(req.body);

    console.log(logininfo);
    // res.cookie("accessToken", logininfo.accessToken, {
    //   httpOnly: true,
    //   secure: false,
    // });
    // res.cookie("refreshToken", logininfo.refreshToken, {
    //   httpOnly: true,
    //   secure: false,
    // });
    setAuthCookie(res, logininfo);
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

    // res.cookie("accessToken", tokeninfo.accessToken, {
    //   httpOnly: true,
    //   secure: false,
    // });
    setAuthCookie(res, tokeninfo);
    sendReponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "New Access Token Retrived Successfully",
      data: tokeninfo,
    });
  }
);
const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    sendReponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged Logut Successfully",
      data: null,
    });
  }
);
const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user;

    await AuthService.resetPassword(
      oldPassword,
      newPassword,
      decodedToken as JwtPayload
    );
    sendReponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged Logut Successfully",
      data: null,
    });
  }
);

export const authcontrollers = {
  credntialsLogin,
  getNewaccesToken,
  logout,
  resetPassword,
};
