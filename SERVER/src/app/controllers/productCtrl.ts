import Product from "../models/Product.Model";
// const User = require("../models/userModel");
// const slugify = require("slugify");
import validateMongoDbId from "../utils/validateMongodbId";
import { Request, Response } from "express";

//create product
const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { title, price, category, image, quantity } = req.body;

  try {
    const newProduct = new Product({
      title,
      price,
      category,
      image,
      quantity,
    });

    const saveProduct = await newProduct.save();
    res.status(200).json(saveProduct);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update sản phẩm
const updateProduct = async (req: Request, res: Response): Promise<void> => {
  // Lấy thông tin sản phẩm cần cập nhật ở HTTP
  const { id } = req.params; // cái id mà sản phẩm truyền vào param và server sẽ nhận id từ param và sử lí
  const { title, price, category, image, quantity } = req.body;
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        price,
        category,
        image,
        quantity,
      },
      { new: true }
    );
    res.json(updateProduct);
  } catch (error) {
    res.status(500).json({ error: "Đã có lỗi khi cập nhật sản phẩm" });
  }
};

// Xóa sản phẩm
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productDelete = await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ data: productDelete });
  } catch (error) {
    res.status(500).json({ msg: "Server loi" });
  }
};

// GET A PRODUCT
const getaProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
};

// GET ALL PRODUCT
const getAllProduct = async (req: Request, res: Response): Promise<void> => {
  console.log(req);
  try {
    const getAllProducts = await Product.find();
    console.log("all product", getAllProducts);
    res.json(getAllProducts);
  } catch (error) {
    throw new Error(error);
  }
};

// const addToWishlist = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   const { prodId } = req.body;
//   console.log(123, prodId);
//   try {
//     const user = await User.findById(_id);
//     const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
//     if (alreadyadded) {
//       let user = await User.findByIdAndUpdate(
//         _id,
//         {
//           $pull: { wishlist: prodId },
//         },
//         {
//           new: true,
//         }
//       );
//       res.json(user);
//     } else {
//       let user = await User.findByIdAndUpdate(
//         _id,
//         {
//           $push: { wishlist: prodId },
//         },
//         {
//           new: true,
//         }
//       );
//       res.json(user);
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// const rating = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   const { star, prodId, comment } = req.body;
//   try {
//     const product = await Product.findById(prodId);
//     let alreadyRated = product.ratings.find(
//       (userId) => userId.postedby.toString() === _id.toString()
//     );
//     if (alreadyRated) {
//       const updateRating = await Product.updateOne(
//         {
//           ratings: { $elemMatch: alreadyRated },
//         },
//         {
//           $set: { "ratings.$.star": star, "ratings.$.comment": comment },
//         },
//         {
//           new: true,
//         }
//       );
//     } else {
//       const rateProduct = await Product.findByIdAndUpdate(
//         prodId,
//         {
//           $push: {
//             ratings: {
//               star: star,
//               comment: comment,
//               postedby: _id,
//             },
//           },
//         },
//         {
//           new: true,
//         }
//       );
//     }
//     const getallratings = await Product.findById(prodId);
//     let totalRating = getallratings.ratings.length;
//     let ratingsum = getallratings.ratings
//       .map((item) => item.star)
//       .reduce((prev, curr) => prev + curr, 0);
//     let actualRating = Math.round(ratingsum / totalRating);
//     let finalproduct = await Product.findByIdAndUpdate(
//       prodId,
//       {
//         totalrating: actualRating,
//       },
//       { new: true }
//     );
//     res.json(finalproduct);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

export const productController = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  // addToWishlist,
  // rating,
};
