import jwt from "jsonwebtoken";
import { TJwtPayload } from "../interface/loginUser.interface";

const createToken = (
  jwtPayload: TJwtPayload,
  secret_token: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret_token, { expiresIn });
};

export default createToken;
