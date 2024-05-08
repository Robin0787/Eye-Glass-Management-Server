import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import httpStatus from "http-status";
import errorHandler from "./app/errors/errorHandler";
import notFoundRoute from "./app/middlewares/notFoundRoute";
import router from "./app/routes/routes";
import sendResponse from "./app/utils/sendResponse";

export const app: Application = express();

dotenv.config();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Welcome to our server",
    data: {},
  });
});

app.use("/api", router);
app.use("*", notFoundRoute);
app.use(errorHandler);
