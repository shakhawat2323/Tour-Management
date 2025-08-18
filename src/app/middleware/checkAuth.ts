import { NextFunction, Request, Response } from "express";
import AppError from "../errorhelpers/AppErro";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../modules/user/user.interfaces";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppError(403, "No Token Recived");
      }
      const verifyedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      if (!authRoles.includes(verifyedToken.role)) {
        console.log(verifyedToken);
        throw new AppError(
          403,
          `You are not a not authorization ${verifyedToken}`
        );
      }
      if ((verifyedToken as JwtPayload).role !== Role.ADMIN) {
        throw new AppError(403, "No Token Recived");
      }
      req.user = verifyedToken;
      console.log(verifyedToken);

      next();
    } catch (error) {
      next(error);
    }
  };
