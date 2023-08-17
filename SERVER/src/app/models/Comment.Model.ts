import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../Types/types";
import { IProduct } from "../Types/types";

const COLLECTION_NAME = "comments";
const DOCUMENT_NAME = "Comment";

interface IComment extends Document {
  user: IUser["_id"];
  product: IProduct["_id"];
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema: Schema<IComment> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export default mongoose.model<IComment>(DOCUMENT_NAME, commentSchema);
