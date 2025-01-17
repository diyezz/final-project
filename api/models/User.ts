import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  _id: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
