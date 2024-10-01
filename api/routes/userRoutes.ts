import express from "express";
import { registerUser, loginUser, userProfile } from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/profile", authMiddleware, userProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
