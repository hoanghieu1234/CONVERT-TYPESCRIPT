import { Express } from "express";
import { userController } from "../controllers/userCtrl";
import checkAuthentication from "../middlewares/checkauthen.middleware";

export default (app: Express) => {
  app.post("/api/v1/user/register", userController.registerUser);
  app.post("/api/v1/user/login", userController.handleLogin);
  app.post("/api/v1/user/login-admin", userController.loginAdmin);
  app.get("/api/v1/user/get-all", userController.getAllUsers);
  app.get("/api/v1/user/get-by-id/:id", userController.getUserById);
  app.patch("/api/v1/user/blocked-user/:id",userController.blockUser);
  app.post("/api/v1/user/search", userController.searchUser);
  app.post("/api/v1/user/logout", checkAuthentication,userController.logOut);
  app.post("/api/v1/user/refresh-token",userController.refreshToken)
};
