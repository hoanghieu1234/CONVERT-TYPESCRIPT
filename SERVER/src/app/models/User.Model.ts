import mongoose, { Schema } from "mongoose";
import { IUser } from "../Types/types";

const COLLECTION_NAME = "users";
const DOCUMENT_NAME = "User";
const userSchema: Schema<IUser> = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: [
        {
          productId: mongoose.Schema.Types.ObjectId,
          quantity: Number,
        },
      ],
      default: [],
    },
    address: {
      type: String,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export default mongoose.model<IUser>(DOCUMENT_NAME, userSchema);
