import { Request, Response } from "express";
import User from "../models/User";
import Order from "../models/Order";
import { AuthenticatedRequest } from "./userController";

export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { items, total } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(404).json({ message: "User not found | Incorrect ID" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newOrder = new Order({
      userId,
      items,
      total
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to creat order' });
  }
}