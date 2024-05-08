import { Model, Types } from "mongoose";

export interface TSoldProduct {
  buyerName: string;
  seller?: string;
  sellerEmail?: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice?: number;
  date: string;
}

export interface TSaleProductModel extends Model<TSoldProduct> {
  getProductByProductId: (id: string) => Promise<TSoldProduct | null>;
}
