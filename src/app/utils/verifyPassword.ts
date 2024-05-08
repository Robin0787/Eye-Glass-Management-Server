import bcrypt from "bcrypt";

const verifyPassword = async (password: string, hashedPass: string) => {
  return await bcrypt.compare(password, hashedPass);
};

export default verifyPassword;
