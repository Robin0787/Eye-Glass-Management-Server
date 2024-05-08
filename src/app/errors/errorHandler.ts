import { ErrorRequestHandler } from "express";
import { TErrorData, TErrorSource } from "../interface/error.interface";
import { AppError } from "../utils/AppError";
import sendError from "../utils/sendError";
import handleCastError from "./handleCastError";
import handleDuplicateError from "./handleDuplicateError";
import handleValidationError from "./handleValidationError";
import handleZodError from "./handleZodError";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let errorSources: TErrorSource[] = [];
  let message: string = error?.message || "Something went wrong";
  let success: boolean = false;
  let statusCode: number = 400;

  if (error.name === "ZodError") {
    const simplifiedError = handleZodError(error);
    errorSources = simplifiedError?.errorSources;
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
  } else if (error.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    errorSources = simplifiedError?.errorSources;
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
  } else if (error.name === "CastError") {
    const simplifiedError = handleCastError(error);
    errorSources = simplifiedError?.errorSources;
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
  } else if (error.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    let path = "";
    if (message === "Password did not match") {
      path = "Password";
    } else if (message === "The user doesn't exist") {
      path = "Email";
    }
    errorSources = [
      {
        path: path,
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error?.message;
    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  }

  const errorData: TErrorData = {
    success,
    message,
    errorSources,
  };

  sendError(res, statusCode, errorData);
};

export default errorHandler;
