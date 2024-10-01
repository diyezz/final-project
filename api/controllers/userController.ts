import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Order from "../models/Order";

export interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
  };
}

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const generatedID = new Date().getTime().toString();

    const user = await User.create({
      _id: generatedID,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (err) {
    //@ts-ignore
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    //@ts-ignore
    res.status(500).json({ message: err.message });
  }
};

export const userProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const user = await User.findById(userId, "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found"});
    }
    const orders = await Order.find({ userId });
    res.status(200).json({
      profile: {
        email: user.email,
        _id: user._id
      },
      orders
    })
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Failed to retrieve profile' });
  }
}
