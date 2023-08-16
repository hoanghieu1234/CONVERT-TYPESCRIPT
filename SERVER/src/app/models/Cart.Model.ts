import mongoose, {  Schema } from "mongoose";
import { Cart } from "../Types/types";


const COLLECTION_NAME = "carts";
const DOCUMENT_NAME = "carts";



const cartSchema: Schema <Cart> = new Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    idProduct: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    quantity: { type: mongoose.Schema.Types.Number, required: true, default: 1 },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

export default mongoose.model<Cart>(DOCUMENT_NAME, cartSchema);
