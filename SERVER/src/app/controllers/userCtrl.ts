import jwt from "jsonwebtoken";
import User from "../models/User.Model";
import { Request, Response } from "express";
import sendRegistrationEmail from "../utils/Mailer.utils";
import bcrypt from "bcrypt";
import secret from "../../configs/jwtConfig";

// interface refreshTokenData {}
let refreshTokenArr: Array<[]> = [];
// REGISTER
const registerUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { firstname, lastname, mobile, email, password } = req.body;

    // Kiểm tra xem người dùng đã tồn tại dựa trên email hoặc số điện thoại
    const existingUser = await User.findOne({
      $or: [{ email: email }, { mobile: mobile }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash mật khẩu trước khi lưu vào database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({
      firstname: firstname,
      lastname: lastname,
      mobile: mobile,
      email: email,
      password: hashedPassword,
    });

    // Lưu người dùng vào database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//LOGIN USER
const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (findUser) {
      const isPasswordMatched = await bcrypt.compare(
        password,
        findUser.password
      );
      if (isPasswordMatched) {
        const accessToken = jwt.sign(
          { email: findUser.email },
          secret.secretKey,
          {
            expiresIn: "60s",
          }
        ); // Token hết hạn trong vòng 30s , vd thêm : 30d ,30m
        console.log("------- check", accessToken);

        const refreshToken = jwt.sign(
          { email: findUser.email },
          secret.sceretKeyRefresh,
          { expiresIn: "365d" }
        ); // Tạo refreshToken để dự trữ
        refreshTokenArr.push(refreshToken as any); // push refresh token vào 1 mảng để lưu trữ
        const { password: _, ...data } = findUser.toObject(); //loại bỏ password ra khỏi phần data trả về frontend,destructuring
        res.cookie("refreshToken", refreshToken, {
          //Lưu refreshToken vào cookie khi đăng nhập thành công
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        res.status(200).json({
          data,
          accessToken,
        });
      } else {
        res
          .status(401)
          .json({ message: "Thông tin tài khoản mật khẩu không chính xác " });
      }
    } else {
      res.status(401).json({ message: "Email does not exit " });
    }
  } catch (error) {
    res.status(500).json({ message: "Interval Server Error" });
  }
};

// LOGIN ADMIN
const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const findAdmin = await User.findOne({ email });
    if (findAdmin && findAdmin.role === "admin") {
      const isPasswordMatched = await bcrypt.compare(
        password,
        findAdmin.password
      );
      if (isPasswordMatched) {
        const accessToken = jwt.sign(
          { email: findAdmin.email },
          secret.secretKey,
          {
            expiresIn: "60s",
          }
        ); // Token hết hạn trong vòng 30s , vd thêm : 30d ,30m
        console.log("------- check", accessToken);

        const refreshToken = jwt.sign(
          { email: findAdmin.email },
          secret.sceretKeyRefresh,
          { expiresIn: "365d" }
        ); // Tạo refreshToken để dự trữ
        refreshTokenArr.push(refreshToken as any); // push refresh token vào 1 mảng để lưu trữ
        const { password: _, ...data } = findAdmin.toObject(); //loại bỏ password ra khỏi phần data trả về frontend,destructuring
        res.cookie("refreshToken", refreshToken, {
          //Lưu refreshToken vào cookie khi đăng nhập thành công
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        res.status(200).json({
          data,
          accessToken,
        });
      } else {
        res
          .status(401)
          .json({ message: "Thông tin tài khoản mật khẩu không chính xác!" });
      }
    } else {
      res.status(401).json({ message: "Không có quyền truy cập" });
    }
  } catch (error) {
    res.status(500).json({ message: "Interval server error" });
  }
};

// GET ALL USER
const getAllUsers = async (_: Request, res: Response): Promise<void> => {
  try {
    const getUsers = await User.find();
    res.status(200).json(getUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách người dùng", error });
  }
};

// GET USER BY ID

const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const getaUser = await User.findById(id);
    if (getaUser) {
      res.status(200).json(getaUser);
    } else {
      res.status(404).json({ message: "Không tìm thấy ID người dùng" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lấy người dùng", error });
  }
};

// BLOCK USER
const blockUser = async (req: Request, res: Response): Promise<void> => {
  const {
    firstname,
    lastname,
    email,
    mobile,
    password,
    role,
    isBlocked,
    address,
  } = req.body;

  try {
    // Kiểm tra xem vai trò có phải là "admin" không
    if (role === "admin") {
      res.status(403).json({ message: "Vai trò 'admin' không thể bị block" });
      return;
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstname,
        lastname,
        email,
        mobile,
        password,
        role,
        isBlocked,
        address,
      },
      {
        new: true,
      }
    );
    if (updateUser) {
      // Nếu không tìm thấy người dùng với _id cụ thể, trả về thông báo lỗi
      res.status(200).json(updateUser);
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi cập nhật người dùng", error });
  }
};

// SEARCH USER
const searchUser = async (req: Request, res: Response) => {
  const { lastname } = req.body;

  try {
    const users = await User.find({
      lastname: { $regex: lastname, $options: "i" },
    });

    if (users.length === 0) {
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Lỗi khi tìm kiếm người dùng:", error);
    return res.status(500).json({ error: "Đã xảy ra lỗi server" });
  }
};

// LOGOUT
const logOut = (req: Request, res: Response): void => {
  res.clearCookie("refreshToken");
  refreshTokenArr = refreshTokenArr.filter((token) => {
    token !== req.cookies.refreshToken;
    res.status(200).json({ msg: "Logout successful" });
  });
};

//REFRESH_TOKEN
export const refreshToken = (req: Request, res: Response): void => {
  const refreshToken = req.cookies.refreshToken; // Lưu ý nhớ cài đặt cookie-parser

  if (!refreshToken) {
    res.status(401).json("Unauthenticated");
    return;
  }

  if (!refreshTokenArr.includes(refreshToken)) {
    res.status(401).json("Unauthenticated");
    return;
  }

  jwt.verify(refreshToken, secret.sceretKeyRefresh, (err, user: any) => {
    if (err) {
      res.status(400).json("refreshToken is not valid");
      return;
    }

    const { iat, exp, ...userOther } = user;
    console.log(user);

    refreshTokenArr = refreshTokenArr.filter((token) => token !== refreshToken);

    const newAccessToken = jwt.sign(userOther, secret.secretKey, {
      expiresIn: "60s",
    });
    const newRefreshToken = jwt.sign(userOther, secret.sceretKeyRefresh, {
      expiresIn: "365d",
    });
    refreshTokenArr.push(newRefreshToken as any);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({ accessToken: newAccessToken });
  });
};

export const userController = {
  registerUser,
  handleLogin,
  loginAdmin,
  getAllUsers,
  getUserById,
  blockUser,
  searchUser,
  logOut,
  refreshToken,
};
