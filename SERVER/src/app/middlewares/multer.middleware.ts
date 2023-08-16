import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void; // hieu la type tham so truyen vao cua thang muter
type FileNameCallback = (error: Error | null, filename: string) => void;


// tạo ra nơi lưu trữ ảnh 
export const fileStorage = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    cb: DestinationCallback
  ): void => {
    cb(null, "./public/images");
  },
  filename: (
    _req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ): void => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

//cau hinh file mà sẽ cho quyền được upload
export const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//tạo ra ra middleware để thực thi phần upload 
const upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("image");

export { upload };