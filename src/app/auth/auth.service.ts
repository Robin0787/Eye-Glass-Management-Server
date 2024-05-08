import httpStatus from "http-status";
import config from "../config";
import { TJwtPayload, TLoginUser } from "../interface/loginUser.interface";
import { AppError } from "../utils/AppError";
import createToken from "../utils/createToken";
import verifyPassword from "../utils/verifyPassword";
import { TUser, TUserRole } from "./auth.interface";
import { User } from "./auth.model";

const registerUserIntoDB = async (payload: TUser) => {
  if (await User.isUserExists(payload)) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }
  const userData = await User.create(payload);
  return userData;
};

const loginUser = async (payload: TLoginUser) => {
  const userData = await User.getUserByEmail(payload.email);
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "The user doesn't exist");
  }
  const isMatched = await verifyPassword(payload.password, userData.password);
  if (!isMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password did not match");
  }
  const jwtPayload: TJwtPayload = {
    firstName: userData?.firstName,
    email: userData?.email,
    role: userData?.role as TUserRole,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires as string
  );

  return {
    access_token: token,
  };
};

export const AuthServices = {
  registerUserIntoDB,
  loginUser,
};
