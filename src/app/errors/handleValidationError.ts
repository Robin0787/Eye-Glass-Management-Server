import mongoose from "mongoose";
import { TErrorSource } from "../interface/error.interface";

const handleValidationError = (error: mongoose.Error.ValidationError) => {
  let errorSources: TErrorSource[] = [];
  errorSources = Object.values(error.errors).map((issue) => {
    return {
      path: issue.path,
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleValidationError;
