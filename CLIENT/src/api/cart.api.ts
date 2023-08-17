import axiosClient from "./AxiosClient";

class cartAPI {
  static userAddToCart(param: any) {
    const url = "/api/v1/add-cart";
    return axiosClient.post(url, param);
  }
  static getCartItem(id: string) {
    const url = `/api/v1/get-cart/${id}`;
    return axiosClient.get(url);
  }
  static updateQuantity(id: string, data: any) {
    const url = `/api/v1/cart/quantity/${id}`;
    return axiosClient.put(url, data);
  }
  static deleteProductInCart(id: string) {
    const url = `/api/v1/delete-cart/${id}`;
    return axiosClient.delete(url);
  }
}

export default cartAPI;
