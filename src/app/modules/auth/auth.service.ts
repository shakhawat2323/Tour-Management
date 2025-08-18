/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from "../../errorhelpers/AppErro";
import { isActive, IUser, Role } from "../user/user.interfaces";

import httpStatus from "http-status-codes";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { generateToken, verifyToken } from "../../utils/jwt";
import {
  createNewAccessTokenWithRefreshToken,
  createUserToken,
} from "../../utils/userToken";

const credentialsLogin = async (Payload: Partial<IUser>) => {
  const { email, password } = Payload;
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email dose Not exist");
  }
  const ispasswordMatched = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );
  if (!ispasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
  }

  const userToken = createUserToken(isUserExist);

  // delete isUserExist.password;
  const { password: pass, ...rest } = isUserExist.toObject();
  return {
    accessToken: userToken.accessToken,

    refreshToken: userToken.refreshToken,
    user: rest,
  };
};
const getNewaccesToken = async (refreshToken: string) => {
  const newAccessToken = createNewAccessTokenWithRefreshToken(refreshToken);

  return {
    accessToken: newAccessToken,
  };
};
export const AuthService = {
  credentialsLogin,
  getNewaccesToken,
};
