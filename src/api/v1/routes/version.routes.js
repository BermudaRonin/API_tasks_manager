import { Router } from "express";

import authRoutes from "./auth/_routes.js";
import userRoutes from "./user/_routes.js";

const versionRoutes = Router();

versionRoutes.get("/", (req, res) => res.send("Version 1 ON !"));

versionRoutes.use("/users", userRoutes);
versionRoutes.use("/auth", authRoutes);

export default versionRoutes;