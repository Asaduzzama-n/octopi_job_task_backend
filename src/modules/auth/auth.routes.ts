import express from "express";
import validateRequest from "../middlewares/validateRequest";
import { AuthValidation } from "./auth.helpers";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post(
  "/register",
  validateRequest(AuthValidation.createUserZodSchema),
  AuthController.createUser
);

router.get("/user", AuthController.getLoggedInUser);

router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);
export const authRoutes = router;
