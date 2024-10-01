import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import bookRoutes from "./routes/bookRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import logerMiddleware from "./middleware/logerMiddleware";

dotenv.config();

connectDB();

const app = express();
const corsConfig = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE'
};

app.use(logerMiddleware);
app.use(cors(corsConfig));
app.use(express.json());
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

export default app;
