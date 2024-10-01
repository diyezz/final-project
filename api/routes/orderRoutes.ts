import express from "express";
import { createOrder } from "../controllers/orderController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/add", authMiddleware, createOrder);

export default router;
