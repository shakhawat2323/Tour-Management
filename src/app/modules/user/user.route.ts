import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();
router.post("/register", UserControllers.createUser);
router.get("/all-user", UserControllers.getAlluser);

export const UserRoute = router;
