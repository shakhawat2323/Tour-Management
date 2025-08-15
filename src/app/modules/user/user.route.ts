import { Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.valititon";
import { validateRequest } from "../../middleware/validetRequest";

const router = Router();
router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);
router.get("/all-user", UserControllers.getAlluser);

export const UserRoute = router;
