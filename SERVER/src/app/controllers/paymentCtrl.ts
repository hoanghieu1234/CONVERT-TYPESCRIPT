import { Request, Response } from "express";
import paymentInModel from "../models/Payment.Model"; // Thay thế đúng đường dẫn và kiểu dữ liệu của paymentModel
import cartModel from "../models/Cart.Model"; // Thay thế đúng đường dẫn và kiểu dữ liệu của cartModel

// CREATE PAYMENT TO USER
async function createPayment(req: Request, res: Response): Promise<void> {
  try {
    const { idUser, listProduct, total } = req.body;

    if (!idUser || !listProduct || !total) {
      res.status(400).json({ errors: "Vui lòng cung cấp đầy đủ thông tin" });
    }
    // Tạo 1 payment mới
    const newPayment = new paymentInModel({
      idUser,
      listProduct,
      total,
    });

    const savePayment = await newPayment.save();

    res.status(200).json(savePayment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create payment" });
  }
}

// GET ALL PAYMENTS
const getPayment = async (_: Request, res: Response): Promise<void> => {
  try {
    const payments = await paymentInModel.find().populate("idUser");

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: "Could not get payments" });
  }
};

// Xóa giỏ hàng dựa trên idUser
async function deleteCart(req: Request, res: Response) {
  const idUser = req.params.id;
  console.log("idUser", idUser);
  try {
    // Xóa tất cả giỏ hàng từ cơ sở dữ liệu
    await cartModel.deleteMany({ idUser });
    // Trả về phản hồi thành công
    res.status(200).json({ message: "All cart deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Could not delete payments" });
  }
}

export const paymentController = {
  createPayment,
  getPayment,
  deleteCart,
};
