import axiosClient from "./AxiosAdmin";

class productApi {
  // get all product
  static getAllProduct() {
    const url = "api/v1/product/get-all";
    return axiosClient.get(url);
  }
  // delete product
  static deleteProduct(params: any) {
    const url = `api/v1/product/delete/${params.id}`;
    return axiosClient.delete(url, params);
  }
  // create product
  static createProduct(data: object) {
    const url = "api/v1/product/create";
    return axiosClient.post(url, data);
  }
  // update product
    static updateProduct(params:any) {
      console.log(params,'params is ?');
      const url = `api/v1/product/update/${params.id}`;
      return axiosClient.patch(url, params);
    }
}

export default productApi;
