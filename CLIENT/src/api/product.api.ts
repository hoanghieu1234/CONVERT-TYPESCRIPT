import axiosClient from "./AxiosClient";

class productAPI {
  static getAllProducts() {
    const url = "/api/v1/product/get-all";
    return axiosClient.get(url);
  }
  static getDetailProduct(params: string) {
    const url = `/api/v1/product/get-by-id/${params}`;
    return axiosClient.get(url);
  }
}
export default productAPI;
