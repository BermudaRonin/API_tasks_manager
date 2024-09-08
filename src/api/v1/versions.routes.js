import { Router } from "express";

import authRoutes from "./routes/auth-routes.js";
import usersRoutes from "./routes/users-routes.js";

const router = Router();

router.get("/", (req, res) => res.send("Version 1 ON !"));

router.use("/user", usersRoutes);
router.use("/auth", authRoutes);

export default router;