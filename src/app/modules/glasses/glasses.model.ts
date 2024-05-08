import { Schema, model } from "mongoose";
import { TGlass, TGlassModel } from "./glasses.interface";

const glassSchema = new Schema<TGlass, TGlassModel>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  frame: {
    type: String,
    required: true,
  },
  shape: {
    type: String,
    required: true,
  },
  lensType: {
    type: String,
    required: true,
  },
  frameSize: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "unisex"],
    },
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  addedBy: {
    type: String,
    required: false,
  },
});

glassSchema.statics.isGlassExists = async (payload: TGlass) => {
  return await Glass.findOne(payload);
};
glassSchema.statics.getGlassById = async (id: string) => {
  return await Glass.findById(id);
};

export const Glass = model<TGlass, TGlassModel>("glass", glassSchema);
