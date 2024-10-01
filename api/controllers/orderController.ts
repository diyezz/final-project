import { Request, Response } from 'express';
import Order from '../models/Order';
import User from '../models/User';

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, total } = req.body;
    //@ts-ignore
    const userId = req.user?._id;

    // Validate the user
    const user = await User.findById(userId);

    //@ts-ignore
    console.log(req.user?._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new order
    const newOrder = new Order({
      userId,
      items,
      total,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};
