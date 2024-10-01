import mongoose, { Schema, Document } from "mongoose";

interface IOrderItem {
  _id: string;
  title: string;
  quantity: number;
  price: number;
}

interface IOrder extends Document {
  userId: string;
  items: IOrderItem[];
  total: number;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  userId: { type: String, required: true, ref: "User" },
  items: [
    {
      _id: { type: String, required: true },
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
})

const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
