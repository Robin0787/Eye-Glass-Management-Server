import httpStatus from "http-status";
import { TJwtPayload } from "../../interface/loginUser.interface";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { GlassServices } from "./glasses.service";

const addGlass = catchAsync(async (req, res) => {
  const result = await GlassServices.addGlassToDB(
    req.body,
    req!.user as TJwtPayload
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Glass added successfully",
    data: result,
  });
});

const getAllGlass = catchAsync(async (req, res) => {
  const result = await GlassServices.getAllGlassFromDB(
    req.user as TJwtPayload,
    req.query
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Glass are retrieved successfully",
    data: result,
  });
});

const getSingleGlass = catchAsync(async (req, res) => {
  const id: string = req?.params?.id;
  const result = await GlassServices.getSingleGlassFromDB(
    id,
    req.user as TJwtPayload
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Glass is retrieved successfully",
    data: result,
  });
});

const updateSingleGlass = catchAsync(async (req, res) => {
  const id: string = req?.params?.id;
  const result = await GlassServices.updateSingleGlassIntoDB(
    id,
    req.body,
    req.user as TJwtPayload
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Glass is updated successfully",
    data: result,
  });
});

const deleteSingleGlass = catchAsync(async (req, res) => {
  const id: string = req?.params?.id;
  const result = await GlassServices.deleteSingleGlassFromDB(
    id,
    req.user as TJwtPayload
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Glass deleted successfully",
    data: result,
  });
});

const deleteMultipleGlass = catchAsync(async (req, res) => {
  const result = GlassServices.deleteMultipleGlassFromDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products deleted successfully",
    data: result,
  });
});

export const GlassControllers = {
  addGlass,
  getAllGlass,
  getSingleGlass,
  deleteSingleGlass,
  updateSingleGlass,
  deleteMultipleGlass,
};
