import { Router } from "express";

import UserAuthentication from "../features/user-authentication.js";
import EmailVerification from "../features/email-verification.js";
import PasswordReset from "../features/password-reset.js";

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

// POST /auth/email
router.post(
    "/email",
    UserAuthentication.getUserMiddleware,
    EmailVerification.sendVerification,
);

// POST /auth/reset/:emailToken
router.post(
    "/reset/:resetToken",
    PasswordReset.confirmVerification,
);

// POST /auth/reset
router.post(
    "/reset",
    PasswordReset.sendVerification,
);



export default router;