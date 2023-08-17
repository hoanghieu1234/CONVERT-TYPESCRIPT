import { Express } from "express";
import { commentController } from "../controllers/commentCtrl";
import checkAuthentication from "../middlewares/checkauthen.middleware";
// import checkAuthentication from "../middlewares/checkauthen.middleware";

export default (app: Express) => {
  app.post("/api/v1/post-comments",checkAuthentication,commentController.createComment);
  app.get("/api/v1/get-comments",commentController.getComments);
};
