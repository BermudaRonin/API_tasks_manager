import { Router } from "express";

import UserAuthentication from "../features/user-authentication.js";
import EmailVerification from "../features/email-verification.js";

const router = Router();

// POST /auth/
router.post(
    "/",
    UserAuthentication.loginUser,
);

// GET /auth/
router.get(
    "/",
    UserAuthentication.getUserMiddleware,
    UserAuthentication.getUser,
);

// POST /auth/email/:emailToken
router.post(
    "/email/:emailToken",
    UserAuthentication.getUserMiddleware,
    EmailVerification.confirmVerification,
);

// GET /auth/email
router.post(
    "/email",
    UserAuthentication.getUserMiddleware,
    EmailVerification.sendVerification,
);




export default router;