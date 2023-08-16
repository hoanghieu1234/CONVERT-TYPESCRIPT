import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user: {
    role: string; // Thay 'string' bằng kiểu dữ liệu thích hợp của thuộc tính 'role'
  };
}

const checkRoleUserLogin: (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => void = (req, res, next) => {
    console.log(req.user,"check role user");
    
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "You are not authorized to access this resource",
    });
  }
};

export default checkRoleUserLogin;
