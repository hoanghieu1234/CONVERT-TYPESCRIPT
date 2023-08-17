import axiosClient from "./AxiosClient";

class commentAPI {
  static userPostComment(param: any) {
    const url = "/api/v1/post-comments";
    return axiosClient.post(url, param);
  }
  static getComment() {
    const url = "/api/v1/get-comments";
    return axiosClient.get(url);
  }
  
}

export default commentAPI;
