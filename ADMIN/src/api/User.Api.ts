import axios from "axios";
import { ISearchUser } from "../types/type";
import BaseAxios from "./AxiosAdmin";

class userApi {
  // login admin
  static login(param: object) {
    const url = "http://localhost:8080/api/v1/user/login-admin";
    return axios.post(url, param);
  }
  // get all users
  static getAllUser() {
    const url = "/api/v1/user/get-all";
    return BaseAxios.get(url);
  }
  // block admin
  static blockUser(id: number, data: any) {
    const url = `api/v1/user/blocked-user/${id}`;
    return BaseAxios.patch(url, data);
  }
  // Get user by id
  static getUserById(id: number) {
    const url = `api/v1/user/get-by-id/${id}`;
    return BaseAxios.get(url);
  }
  // Search user
  static searchUser(data: ISearchUser) {
    const url = "api/v1/user/search";
    return BaseAxios.post(url, data);
  }
  // Logout Administrator
  static logout() {
    const url = "api/v1/user/logout";
    return BaseAxios.post(url);
  }
}

export default userApi;
