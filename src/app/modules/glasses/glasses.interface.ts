import { Model } from "mongoose";

export type TGender = "male" | "female" | "unisex";

export interface TGlass {
  name: string;
  image: string;
  frame: string;
  shape: string;
  lensType: string;
  frameSize: string;
  brand: string;
  price: number;
  quantity: number;
  gender: TGender;
  color: string;
  addedBy?: string;
  _id?: string;
}

export interface TGlassModel extends Model<TGlass> {
  isGlassExists: (payload: TGlass) => Promise<TGlass | null>;
  getGlassById: (id: string) => Promise<TGlass | null>;
}
