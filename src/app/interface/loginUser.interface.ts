export type TLoginUser = {
  email: string;
  password: string;
};

export type TUserRole = "user" | "manager";

export type TJwtPayload = {
  firstName: string;
  email: string;
  role: TUserRole;
};
