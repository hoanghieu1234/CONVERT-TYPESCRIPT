import CartModel from "../models/Cart.Model";
import { Request, Response } from "express";

// ADD TO CART
const userCart = async (req: Request, res: Response) => {
  const { idProduct, idUser } = req.body;
  try {
    const cartItem = await CartModel.findOne({
      idUser: idUser,
      idProduct: idProduct,
    }).populate("idProduct");
    if (cartItem) {
      cartItem.quantity += 1; // Tăng số lượng lên 1
      await cartItem.save();
      res.status(200).json({
        msg: "Sản phẩm đã tồn tại trong giỏ hàng và số lượng đã được tăng lên 1",
      });
    } else {
      // Nếu chưa tồn tại, thêm nó vào giỏ hàng
      const newCartItem = new CartModel({
        idUser: idUser,
        idProduct: idProduct,
        quantity: 1, // Đặt số lượng ban đầu là 1
      });
      await newCartItem.save();
      res.status(200).json({ msg: "Đã thêm thành công" });
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra" });
  }
};

//  GET CART
const getCartItem = async (req: Request, res: Response) => {
  const idUser = req.params.id as string; // Chắc chắn idUser là một chuỗi
  try {
    const cartItems = await CartModel.find({ idUser }).populate("idProduct");
    console.log(cartItems,"product-tesst");
    
    if (cartItems.length > 0) {
      res.status(200).json(cartItems);
    } else {
      res.status(200).json({ msg: "Giỏ hàng trống" });
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra" });
  }
};

// DELETE CART
const deleteCartItem = async (req: Request, res: Response) => {
  const idProduct = req.params.id as string; // Chắc chắn idProduct là một chuỗi
  try {
    const deletedItem = await CartModel.findOneAndDelete({ idProduct });
    if (deletedItem) {
      res.status(200).json({ message: "Đã xóa sản phẩm khỏi giỏ hàng" });
    } else {
      res.status(404).json({ message: "Không tìm thấy mục trong giỏ hàng" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Đã có lỗi xảy ra" });
  }
};

// UPDATE QUANTITY IN CART
const updateCartItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const newQuantity = Number(req.body.quantity);
    console.log(2222, req.body.quantity);
    try {
      const updatedCart = await CartModel.findOneAndUpdate(
        { _id: id },
        { quantity: newQuantity }
      );
  
      if (!updatedCart) {
         res.status(404).json({ msg: "Cart not found" });
      }
  
      res.status(200).json({ msg: "Update successfully" });
    } catch (error) {
      res.status(400).json({ msg: "Error" });
    }
  };

export const cartController = {
  getCartItem,
  userCart,
  deleteCartItem,
  updateCartItem
};
