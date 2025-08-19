import { Router } from "express";
import { authcontrollers } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interfaces";

const router = Router();
router.post("/login", authcontrollers.credntialsLogin);
router.post("/refrefreshToken", authcontrollers.getNewaccesToken);
router.post("/logout", authcontrollers.logout);
router.post(
  "/reset-password",
  checkAuth(...Object.values(Role)),
  authcontrollers.resetPassword
);
export const AuthRoutes = router;
