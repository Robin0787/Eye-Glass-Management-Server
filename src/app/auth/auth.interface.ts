import { Model } from "mongoose";
import { USER_ROLE } from "../constant/userRole";

export type TUserRole = keyof typeof USER_ROLE;

export interface TUser {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  role?: string;
}

export interface TUserModel extends Model<TUser> {
  getUserByEmail: (email: string) => Promise<TUser | null>;
  isUserExists: (dat: TUser) => Promise<TUser | null>;
}
