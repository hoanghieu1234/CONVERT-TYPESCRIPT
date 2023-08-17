import React, { useEffect, useRef, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Meta from "../../components/Meta/Meta";
import { AiFillDelete } from "react-icons/ai";
import cartAPI from "../../api/cart.api";
import "./Cart.css";
import { Link } from "react-router-dom";
import PaymentAPI from "../../api/payment.api";
import { useDispatch } from "react-redux";
import { updateState } from "../../redux/reduce/updateSlice";
import ConfirmModal from "../../components/confirm/Confirm";

interface CartItem {
  _id: string;
  idProduct: {
    _id: string;
    price: number;
    image: string;
    title: string;
    category: string;
  };
  quantity: number;
}

const Cart = () => {
  const idUser: any = JSON.parse(localStorage.getItem("userLogin") as string)
    .data?._id;
  console.log("idUser", idUser);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [_deleteItemId, setDeleteItemId] = useState<string | null>(null); // Store the item ID to delete
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // State for showing the confirm modal
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);
  const [subTotal, setSubtotal] = useState(0);
  const idRef = useRef<any>();
  const [_isCheckoutSuccessful, setIsCheckoutSuccessful] = useState(false);
  const dispatch = useDispatch();

  // GET API CART
  const getCartItems = async (id: string) => {
    const items: any = await cartAPI.getCartItem(id);

    if (items.data && Array.isArray(items.data)) {
      const result = items.data.reduce((total: number, item: any) => {
        return total + item.idProduct.price * item.quantity;
      }, 0);

      setSubtotal(result);
    }
    setCartItems(items.data);

    if (items.data && Array.isArray(items.data)) {
      const newSubTotal = items.data.reduce((total: number, item: any) => {
        return total + item.idProduct.price * item.quantity;
      }, 0);
      setSubtotal(newSubTotal);
    }
  };

  useEffect(() => {
    if (idUser) {
      getCartItems(idUser);
    }
  }, [idUser, isUpdate]);

  // KHỞI TẠO TOTAL / QUANTITY
  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: string
  ) => {
    const newQty = parseInt(e.target.value, 10);
    try {
      await cartAPI.updateQuantity(productId, { quantity: newQty });
      setIsUpdate(!isUpdate);
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng sản phẩm", error);
    }
  };

  // Handle the modal open and delete confirmation
  const handleConfirmDelete = (id: string) => {
    idRef.current = id;
    setIsConfirmModalOpen(true);
  };
  // Handle actual delete after confirmation
  const handleConfirmedDelete = async () => {
    if (idRef.current) {
      await handleDelete(idRef.current);
      setDeleteItemId(null);
      setIsConfirmModalOpen(false);
      dispatch(updateState(false as any));
    }
  };

  // XOÁ SẢN PHẨM TRONG CART
  const handleDelete = async (id: string) => {
    try {
      const response = await cartAPI.deleteProductInCart(id);
      if (response) {
        setIsUpdate(!isUpdate);

        const updatedCartItems = [...cartItems];
        const index = updatedCartItems.findIndex((item) => item._id === id);
        console.log(index, 123);

        if (index == -1) {
          updatedCartItems.splice(index, 1);
        }

        // Cập nhật trạng thái với danh sách sản phẩm mới
        setCartItems(updatedCartItems);

        // Cập nhật lại tổng tiền (subtotal) sau khi xóa sản phẩm
        setSubtotal((prevSubtotal) => {
          const deletedItem = updatedCartItems.find((item) => item._id === id);
          if (deletedItem && deletedItem.quantity !== undefined) {
            return (
              prevSubtotal -
              (deletedItem.idProduct?.price || 0) * deletedItem.quantity
            );
          } else {
            return prevSubtotal;
          }
        });

        // Nếu danh sách sản phẩm mới là rỗng, tổng tiền sẽ là 0
        if (updatedCartItems.length === 0) {
          setSubtotal(0);
        }
      }
      dispatch(updateState(false as any));
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm", error);
    }
  };

  // call api cart qua checkout
  const handlePostCheckout = async () => {
    try {
      if (cartItems.length > 0) {
        console.log(cartItems);
        const paymentData = {
          idUser: idUser,
          listProduct: cartItems,
          total: subTotal,
        };
        await PaymentAPI.postCartToPayment(paymentData);
        await PaymentAPI.deleteCartToPayment(idUser);
        setIsCheckoutSuccessful(true);
        setCartItems([]);
        setSubtotal(0);
        dispatch(updateState(false as any));
        // Show payment confirmation
        setShowPaymentConfirmation(true);
      }
    } catch (error) {
      console.error("Lỗi khi đặt hàng", error);
    }
  };
  console.log("cartItems", cartItems);

  return (
    <>
      {idUser ? (
        <>
          <Meta title={"Cart"} />
          <BreadCrumb title="Cart" />
          <section className="cart-wrapper home-wrapper-2 py-5">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                    <h4 className="cart-col-1">PRODUCT</h4>
                    <h4 className="cart-col-2">PRICE</h4>
                    <h4 className="cart-col-3">QUANTITY</h4>
                    <h4 className="cart-col-4">TOTAL</h4>
                  </div>
                  {/* product 1 */}
                  {cartItems?.length > 0 &&
                    cartItems?.map((items) => {
                      return (
                        <div
                          className="cart-data  py-3 mb-2 d-flex justify-content-between align-items-center"
                          key={items.idProduct._id}
                        >
                          <div className="cart-col-1 d-flex align-items-center gap-15">
                            <div className="w-25">
                              <img
                                src={items?.idProduct?.image}
                                className="img-fluid"
                                alt="product"
                              />
                            </div>
                            <div className="w-75">
                              <p>title: {items?.idProduct?.title}</p>
                              <p>category: {items?.idProduct?.category}</p>
                            </div>
                          </div>
                          <div className="cart-col-2 ">
                            <h5 className="price mb-0">
                              {items?.idProduct?.price} $
                            </h5>
                          </div>
                          <div className="cart-col-3 d-flex align-items-center gap-15">
                            <div>
                              <input
                                className="form-control"
                                type="number"
                                name=""
                                placeholder="0"
                                min={1}
                                max={15}
                                value={items.quantity}
                                onChange={(e) => handleChange(e, items._id)}
                              />
                            </div>
                            <div
                              onClick={() =>
                                handleConfirmDelete(items?.idProduct?._id)
                              }
                            >
                              <AiFillDelete className="text-danger fs-4" />
                            </div>
                          </div>
                          <div className="cart-col-4 ">
                            <h5 className="price mb-0">
                              {items.idProduct.price * items.quantity} $
                            </h5>
                          </div>
                        </div>
                      );
                    })}
                  {/* Display Payment Confirmation */}
                  {showPaymentConfirmation && (
                    <div className="payment-confirmation">
                      <p>Đã thanh toán đơn hàng!</p>
                      <img src="/images/empty-cart.jpg" alt="Empty Cart" />
                    </div>
                  )}
                  <div className="col-12 py-2 mt-4">
                    <div className="d-flex justify-content-between align-items-baseline">
                      <div>
                        <Link to="/product" className="button">
                          Continue to Shopping
                        </Link>
                      </div>

                      <div className="product-checkout d-flex flex-column align-items-start">
                        <h4>Subtotal: {subTotal.toFixed(2)}$</h4>
                        <p>Taxes and shipping calculated at checkout</p>
                        <button className="button" onClick={handlePostCheckout}>
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <ConfirmModal
            show={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={handleConfirmedDelete}
          />
        </>
      ) : (
        <p> Đăng nhập</p>
      )}
    </>
  );
};

export default Cart;
