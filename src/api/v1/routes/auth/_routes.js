import { Router } from "express";

import getUserMiddleware from "./getUser.mw.js";

import loginUser from "./loginUser.js";
import getUser from "./getUser.js";
import verifyEmail from "./verifyEmail.js";
import confirmEmail from "./confirmEmail.js";

const authRoutes = Router();

authRoutes.post("/", loginUser);
authRoutes.get("/", getUserMiddleware, getUser);
authRoutes.get("/email", getUserMiddleware, verifyEmail);
authRoutes.post("/email", getUserMiddleware, confirmEmail);
// authRoutes.post("/password", authController.forgotPassword); // TODO

export default authRoutes;