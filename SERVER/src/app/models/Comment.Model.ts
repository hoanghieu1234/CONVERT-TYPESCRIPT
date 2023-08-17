import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../Types/types";
import { IProduct } from "../Types/types";

const COLLECTION_NAME = "comments";
const DOCUMENT_NAME = "Comment";

interface IComment extends Document {
  idUser: IUser["_id"];
  idProduct: IProduct["_id"];
  content: string;

}

const commentSchema: Schema<IComment> = new Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    idProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export default mongoose.model<IComment>(DOCUMENT_NAME, commentSchema);
