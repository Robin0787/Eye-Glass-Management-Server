import mongoose from "mongoose";
import { TErrorSource } from "../interface/error.interface";

const handleCastError = (error: mongoose.Error.CastError) => {
  const errorSources: TErrorSource[] = [
    { path: error.path, message: error.message },
  ];

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};

export default handleCastError;
