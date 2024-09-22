import { Router } from "express";
import { login, logout, session, signup } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login",login)
router.post('/logout', logout);
router.post("/signup",signup)
router.get('/session',authMiddleware,session)

export default router