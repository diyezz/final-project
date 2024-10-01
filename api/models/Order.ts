import { Schema, model, Document } from 'mongoose';

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderDocument extends Document {
  userId: string; // Reference to the user who created the order
  items: OrderItem[];
  total: number;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  userId: { type: String, required: true, ref: 'User' },
  items: [
    {
      _id: { type: String, required: true },
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = model<OrderDocument>('Order', OrderSchema);

export default Order;
