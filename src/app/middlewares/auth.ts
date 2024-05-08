import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TUserRole } from "../auth/auth.interface";
import { User } from "../auth/auth.model";
import config from "../config";
import { AppError } from "../utils/AppError";
import catchAsync from "../utils/catchAsync";

export interface TJwtPayload {
  firstName: string;
  email: string;
  role: TUserRole;
  iat: number;
  exp: number;
}

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;
    if (!token) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
    const decoded: TJwtPayload = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as TJwtPayload;

    if (!decoded) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }

    const user = await User.getUserByEmail(decoded.email);
    if (!user) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
