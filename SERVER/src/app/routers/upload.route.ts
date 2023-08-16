import {Express, Response, Request} from 'express';
import { upload } from '../middlewares/multer.middleware';
export default (app: Express) => {
    app.post("/api/v1/upload", upload, (req: Request, res: Response) => {
        //http://localhost:8080/images/duong-dan-anh.png
        //req.protocol => http 
        //req.get('host') => localhost 
        // req.files.filename => "duong-dan-anh.
        const url = req.protocol + '://' + req.get('host') + "/images/" + req.file!.filename

        res.status(200).json({
            message: "upload successful",
            image: url
        })
    })
}