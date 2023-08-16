import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import secret from "../../configs/jwtConfig";

const checkAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Lấy phần header 'Authorization' từ request
  const authHeader: string | undefined = req.header("Authorization");

  // Kiểm tra xem header 'Authorization' có tồn tại không
  if (!authHeader) {
    return res.sendStatus(401); // Unauthorized
  }

  // Kiểm tra xem header 'Authorization' có chứa từ khóa 'Bearer' không
  const tokenParts: string[] = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.sendStatus(401); // Unauthorized
  }

  const token: string = tokenParts[1];
  // Giải mã token và kiểm tra tính hợp lệ
  jwt.verify(
    token,
    secret.secretKey,
    (err : any, user: any) => {
      if (err) {
        console.log(err);
        return res.status(403).json("Token is not valid"); // Forbidden
      }

      // Lưu thông tin người dùng vào request để sử dụng ở middleware tiếp theo
      (req as any).user = user;

      // Cho phép request tiếp tục sang middleware hoặc route tiếp theo
      next();
      return;
    }
  );
  return;
};

export default checkAuthentication;
