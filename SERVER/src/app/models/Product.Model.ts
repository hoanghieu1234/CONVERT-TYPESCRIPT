import mongoose, { Schema } from "mongoose";
import {IProduct} from "../Types/types";

const COLLECTION_NAME = "products"; //bảng
const DOCUMENT_NAME = "products";
// Declare the Schema of the Mongo model

const productSchema:Schema<IProduct> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
export default mongoose.model<IProduct>(DOCUMENT_NAME, productSchema);