import { Express } from "express";
import productRoute from "./product.route";
import userRoute from "./user.route";
import paymentRoute from "./payment.route";
import uploadRoute from "./upload.route";
import cartRoute from "./cart.route";

export default function Router(app: Express) {
  productRoute(app);
  userRoute(app);
  paymentRoute(app);
  uploadRoute(app)
  cartRoute(app);
}
