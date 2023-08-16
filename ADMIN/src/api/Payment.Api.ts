import axiosClient from "./AxiosAdmin";

class paymentApi {
  // get all product
  static getPayment() {
    const url = "api/v1/payment/get-all";
    return axiosClient.get(url);
  }
}

export default paymentApi;
