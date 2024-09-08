import { Router } from "express";

import UserAuthentication from "../features/user-authentication.js";
import UserManagement from "../features/user-management.js";

const router = Router();

// POST /users
router.post(
    "/",
    UserManagement.createUser
);

// PUT /users
router.put(
    "/",
    UserAuthentication.getUserMiddleware,
    UserManagement.updateUser
);

// DELETE /users
router.delete(
    "/",
    UserAuthentication.getUserMiddleware,
    UserManagement.deleteUser
);

export default router;