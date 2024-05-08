import httpStatus from "http-status";
import mongoose from "mongoose";
import { USER_ROLE } from "../../constant/userRole";
import { TJwtPayload } from "../../interface/loginUser.interface";
import { AppError } from "../../utils/AppError";
import { TGlass } from "../glasses/glasses.interface";
import { Glass } from "../glasses/glasses.model";
import { TSoldProduct } from "./sale.interface";
import { SoldProduct } from "./sale.model";

const addSaleProductIntoDB = async (
  payload: TSoldProduct,
  user: TJwtPayload
) => {
  if (payload.seller) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can't pass the seller field with the body"
    );
  } else if (payload.sellerEmail) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can't pass the sellerEmail field with the body"
    );
  } else if (payload.totalPrice) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can't pass the totalPrice field with the body"
    );
  }

  let product: TGlass | null = null;
  if (user.role === "user") {
    product = await Glass.findOne({
      _id: payload.product,
      addedBy: user.email,
    });
    if (!product) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "You are not authorized to sell this product"
      );
    }
  } else if (user.role === "manager") {
    product = await Glass.findById(payload.product);
  }

  if (!product) {
    throw new AppError(httpStatus.BAD_REQUEST, "This product doesn't exist");
  }

  const saleQuantity = payload.quantity;
  const availableProducts = product.quantity as number;

  const totalPriceOfProducts = product.price * payload.quantity;
  payload.totalPrice = totalPriceOfProducts;

  if (saleQuantity > availableProducts) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There are ${product.quantity} products in the inventory. You can't sell more than ${product.quantity} pieces`
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await Glass.findByIdAndUpdate(
      product._id,
      {
        $inc: { quantity: -saleQuantity },
      },
      { session }
    );

    if (!result) {
      throw new AppError(httpStatus.FORBIDDEN, "Something went wrong");
    }
    payload.seller = user.firstName;
    payload.sellerEmail = user.email;
    const addedProduct = await SoldProduct.create([payload], { session });
    await session.commitTransaction();
    await session.endSession();
    return addedProduct;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error.message || "Something went wrong"
    );
  }
};

const getSoldProductsFromDB = async (user: TJwtPayload) => {
  if (user.role === "manager") {
    const result = await SoldProduct.find().populate("product");
    return result;
  } else if (user.role === "user") {
    const result = await SoldProduct.find({ sellerEmail: user.email }).populate(
      "product"
    );
    return result;
  }
};

const getSalesHistoryFromDB = async (user: TJwtPayload) => {
  let result = [];
  if (user.role === USER_ROLE.manager) {
    result = await SoldProduct.aggregate([
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: "$totalPrice" },
          totalProductSold: { $sum: "$quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          totalSaleAmount: 1,
          totalProductSold: 1,
        },
      },
    ]);
  } else {
    result = await SoldProduct.aggregate([
      {
        $match: {
          sellerEmail: user.email,
        },
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: "$totalPrice" },
          totalProductSold: { $sum: "$quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          totalSaleAmount: 1,
          totalProductSold: 1,
        },
      },
    ]);
  }
  return result[0];
};

export const SaleServices = {
  addSaleProductIntoDB,
  getSoldProductsFromDB,
  getSalesHistoryFromDB,
};
