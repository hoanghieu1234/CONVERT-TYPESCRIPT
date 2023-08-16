import express, { Express, Response, Request } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import Router from "./routers";
import path from "path";
import cors from "cors";
import { Database } from "../lib/db/mongoose.connect";
import cookieParser  from "cookie-parser";
//init Database
const instanceMongoDb = new Database();

const app: Express = express();
app.use(cookieParser());
const corsOrigin = ['https://project-reactjs-nodejs-movie-pmc7.vercel.app', 'http://localhost:5000', 'http://localhost:3000','http://localhost:8080','https://project-reactjs-nodejs-movie-tnyl.vercel.app']

//middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const corsOptions = {
  origin: corsOrigin,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
//static file
const staticDirectory = path.join(__dirname, "../../public");
app.use(express.static(staticDirectory));
//Router
Router(app);

//Handle Error

export default app;
