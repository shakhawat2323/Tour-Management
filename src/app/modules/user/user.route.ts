import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.valititon";
import { validateRequest } from "../../middleware/validetRequest";
import AppError from "../../errorhelpers/AppErro";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Role } from "./user.interfaces";

import { envVars } from "../../config/env";
import { checkAuth } from "../../middleware/checkAuth";

const router = Router();
router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);
router.get(
  "/all-user",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),

  UserControllers.getAlluser
);

router.patch(
  ":id",
  validateRequest(createUserZodSchema),
  checkAuth(...Object.values(Role)),
  UserControllers.UpdateUser
);
export const UserRoute = router;
