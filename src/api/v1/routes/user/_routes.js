import { Router } from "express";

import getUserMiddleware from "../auth/getUser.mw.js";

import createUser from "./createUser.js";
import updateUser from "./updateUser.js";
import deleteUser from "./deleteUser.js";


const userRoutes = Router();

userRoutes.post("/", createUser); // DONE
userRoutes.patch("/", getUserMiddleware, updateUser); // TODO
userRoutes.delete("/", getUserMiddleware, deleteUser); // TODO

export default userRoutes;