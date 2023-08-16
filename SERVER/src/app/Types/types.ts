import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  image: string;
}

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
  role: string;
  isBlocked: boolean;
  cart: any[]; // Thay any[] bằng kiểu dữ liệu phù hợp cho cart
  address: string;
  wishlist: mongoose.Schema.Types.ObjectId[];
  refreshToken: string;
}

export interface ICheckout extends Document {
  idUser: mongoose.Schema.Types.ObjectId;
  listProduct: any[]; // Bạn có thể cụ thể kiểu dữ liệu của listProduct nếu biết
  total: number;
}

export interface Cart extends Document {
  idUser: mongoose.Schema.Types.ObjectId;
  idProduct: mongoose.Schema.Types.ObjectId;
  quantity: number;
}