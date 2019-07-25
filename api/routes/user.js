import express from "express";
import checkAuth from '../middleware/check-auth'

import { user_signup, user_login, user_delete } from "../controllers/user";

const router = express.Router();

router.post("/signup", user_signup);

router.post("/login", user_login);

router.delete("/:userId", checkAuth, user_delete);

export default router;
