import bcrypt from "bcrypt";

const hashPassword = async (password: string, saltRounds: number) => {
  return await bcrypt.hash(password, saltRounds);
};

export default hashPassword;
