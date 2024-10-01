import express from "express";
import { createOrder } from "../controllers/orderController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authMiddleware, createOrder);

export default router;
