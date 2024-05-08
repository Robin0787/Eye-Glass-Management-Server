import { Response } from "express";

export interface TMeta {
  page: number;
  limit: number;
  totalPage: number;
  totalData: number;
}

export interface TResponseData {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}

const sendResponse = (res: Response, payload: TResponseData) => {
  res.status(payload.statusCode).send({
    success: payload.success,
    message: payload.message,
    data: payload.data,
  });
};

export default sendResponse;
