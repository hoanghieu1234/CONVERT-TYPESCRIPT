import mongoose, { Schema } from "mongoose";
import { ICheckout } from "../Types/types";

const COLLECTION_NAME: string = "payments";
const DOCUMENT_NAME: string = "payments";

const checkoutSchema: Schema<ICheckout> = new Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Kiểu tham chiếu User cần được định nghĩa trong mongoose
      required: true,
    },
    listProduct: {
      type: [],
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

export default mongoose.model<ICheckout>(DOCUMENT_NAME, checkoutSchema);
