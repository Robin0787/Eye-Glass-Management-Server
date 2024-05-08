import { Schema, model } from "mongoose";
import config from "../config";
import hashPassword from "../utils/hashPassword";
import { TUser, TUserModel } from "./auth.interface";

const userSchema = new Schema<TUser, TUserModel>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "manager"],
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  this.password = await hashPassword(user.password, Number(config.salt_rounds));
  next();
});

userSchema.post("save", async function (doc, next) {
  doc.password = "********";
  next();
});

userSchema.statics.getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

userSchema.statics.isUserExists = async (data: TUser) => {
  return await User.findOne(data);
};

export const User = model<TUser, TUserModel>("user", userSchema);
