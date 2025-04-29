import express, { RequestHandler } from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", register as RequestHandler);
router.post("/login", login as RequestHandler);
router.get("/logout", logout as RequestHandler);
router.post("/forgot-password", forgotPassword as RequestHandler);

export default router;
