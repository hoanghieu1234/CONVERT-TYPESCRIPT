import { Express } from "express";
import { cartController } from "../controllers/cartCtrl";
import checkAuthentication from "../middlewares/checkauthen.middleware";

export default (app: Express) => {
  app.post("/api/v1/add-cart",checkAuthentication ,cartController.userCart);
  app.get("/api/v1/get-cart/:id", cartController.getCartItem);
  app.put("/api/v1/cart/quantity/:id", cartController.updateCartItem);
  app.delete("/api/v1/delete-cart/:id", cartController.deleteCartItem)
};
