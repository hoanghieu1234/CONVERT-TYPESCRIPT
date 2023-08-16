import { Express } from "express";
import {paymentController} from "../controllers/paymentCtrl";

export default (app: Express) => {
  app.post("/api/v1/payment", paymentController.createPayment);
  app.get("/api/v1/payment/get-all", paymentController.getPayment);
  app.delete("/api/v1/payment/delete/:id", paymentController.deleteCart);
};
