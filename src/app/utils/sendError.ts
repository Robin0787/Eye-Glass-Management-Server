import { Response } from "express";
import { TErrorData } from "../interface/error.interface";

const sendError = (
  res: Response,
  statusCode: number,
  errorData: TErrorData
) => {
  res.status(statusCode).send(errorData);
};

export default sendError;
