import httpStatus from "http-status";
import { TJwtPayload } from "../../interface/loginUser.interface";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SaleServices } from "./sale.service";

const addSaleProduct = catchAsync(async (req, res) => {
  const result = await SaleServices.addSaleProductIntoDB(
    req.body,
    req.user as TJwtPayload
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product sold successfully",
    data: result,
  });
});

const getSoldProducts = catchAsync(async (req, res) => {
  const result = await SaleServices.getSoldProductsFromDB(
    req.user as TJwtPayload
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Product are retrieved successfully",
    data: result,
  });
});

const getSalesHistory = catchAsync(async (req, res) => {
  const result = await SaleServices.getSalesHistoryFromDB(
    req.user as TJwtPayload
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sales history are retrieved successfully",
    data: result,
  });
});

export const SaleControllers = {
  addSaleProduct,
  getSoldProducts,
  getSalesHistory,
};
