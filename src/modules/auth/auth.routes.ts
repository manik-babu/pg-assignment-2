import { Router } from "express";
import authController from "./auth.controller";

// app.use("/api/v1/auth", authRouter);
const router = Router();

router.post('/signup', authController.signup);

export const authRouter = router;