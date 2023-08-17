import { Request, Response } from "express";
import CommentModel from "../models/Comment.Model"; // Đảm bảo đường dẫn đúng với vị trí file Comment model

// Controller để tạo mới Comment
const createComment = async (req: Request, res: Response) => {
  try {
    const { idUser, idProduct, content } = req.body;

    // Tạo Comment mới
    const newComment = new CommentModel({
      idUser,
      idProduct,
      content,
    });
    // Lưu Comment vào cơ sở dữ liệu
    await newComment.save();
    res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ success: false, error: "Error creating comment" });
  }
};

// Controller để lấy danh sách Comment
const getComments = async (req: Request, res: Response) => {
  const idProduct = req.params.id;
  console.log("ibProduct",req);
  try {
    // Lấy danh sách Comment từ cơ sở dữ liệu
    const comments = await CommentModel.find({ idProduct: idProduct }).populate(
      "idUser"
    );

    console.log(comments,123);
    
    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error("Error getting comments:", error);
    res.status(500).json({ success: false, error: "Error getting comments" });
  }
};

export const commentController = {
  createComment,
  getComments,
};
