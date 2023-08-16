import React, { useEffect, useState } from "react";
import paymentApi from "../../api/Payment.Api";
import { PaymentItem } from "../../types/type";

import "./index.css";
const OrderManager: React.FC = () => {
  const [payment, setPayment] = useState<PaymentItem[]>([]);
  // console.log(123, payment);

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    paymentApi
      .getPayment()
      .then((res) => {
        console.log(res);
        
        // Khi api trả dữ liệu thành công, cập nhật state payments
        setPayment(res.data);
      })
      .catch((error) => {
        console.error("Error fetching payment data:", error);
      });
  }, []);

  return (
    <div className="wrapper-home">
      <div className="content-home">
        <div className="order-list">
          <h2>Manager Order</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Quantity</th>
                <th>Product</th>
                <th>Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {payment?.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.idUser.lastname}</td>
                  <td>{item.idUser.mobile}</td>
                  <td>{item.idUser.email}</td>
                  <td>{item.total}</td>
                  <td>
                    {item?.listProduct.map((pro) => {
                      return pro.idProduct.category;
                    })}
                  </td>
                  <td>
                    {item?.listProduct.map((pro) => {
                      return pro.idProduct.createdAt;
                    })}
                  </td>
                  <td>
                    {" "}
                    {item.listProduct.map((pro) => {
                      return pro.idProduct.price;
                    })}
                    $
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManager;
