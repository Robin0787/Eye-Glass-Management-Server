import { ZodError } from "zod";
import { TErrorSource } from "../interface/error.interface";

interface TErrorReturn {
  errorSources: TErrorSource[];
  statusCode: number;
  message: string;
}

const handleZodError = (error: ZodError): TErrorReturn => {
  const errorSources: TErrorSource[] = error.issues.map((issue) => {
    const path = issue.path[issue?.path.length - 1].toString();

    return {
      path,
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    errorSources,
    statusCode,
    message: "Validation Error",
  };
};

export default handleZodError;
