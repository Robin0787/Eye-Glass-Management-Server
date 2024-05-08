import { Schema, model } from "mongoose";
import { TSaleProductModel, TSoldProduct } from "./sale.interface";

const soldProductSchema = new Schema<TSoldProduct, TSaleProductModel>(
  {
    buyerName: {
      type: String,
      required: true,
    },
    seller: {
      type: String,
      required: true,
    },
    sellerEmail: {
      type: String,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "glass",
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

soldProductSchema.statics.getProductByProductId = async (id: string) => {
  return await SoldProduct.findOne({ product: id });
};

export const SoldProduct = model<TSoldProduct, TSaleProductModel>(
  "soldProduct",
  soldProductSchema
);
