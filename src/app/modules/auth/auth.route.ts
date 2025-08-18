import { Router } from "express";
import { authcontrollers } from "./auth.controller";

const router = Router();
router.post("/login", authcontrollers.credntialsLogin);
router.post("/refrefreshToken", authcontrollers.getNewaccesToken);
export const AuthRoutes = router;
