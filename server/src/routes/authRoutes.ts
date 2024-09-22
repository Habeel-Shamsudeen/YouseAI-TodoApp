import { Router } from "express";
import { login, session, signup } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login",login)
router.post("/signup",signup)
router.get('/session',authMiddleware,session)

export default router