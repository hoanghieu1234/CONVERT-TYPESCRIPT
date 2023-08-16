import axiosClient from "./AxiosClient";

class PaymentAPI {
  static postCartToPayment(data: any) {
    const url = "api/v1/payment";
    return axiosClient.post(url, data);
  }
  static deleteCartToPayment(id: string) {
    const url = `api/v1/payment/delete/${id}`;
    return axiosClient.delete(url);
  }
}
export default PaymentAPI;
