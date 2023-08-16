import { Express } from "express";
import { productController } from "../controllers/productCtrl";
import {upload} from "../middlewares/multer.middleware";
export default (app: Express) => {
  app.get("/api/v1/product/get-all", productController.getAllProduct);
  app.get("/api/v1/product/get-by-id/:id", productController.getaProduct);
  app.post("/api/v1/product/create", upload, productController.createProduct);
  app.patch("/api/v1/product/update/:id",upload, productController.updateProduct);
  app.delete("/api/v1/product/delete/:id", productController.deleteProduct);
};
