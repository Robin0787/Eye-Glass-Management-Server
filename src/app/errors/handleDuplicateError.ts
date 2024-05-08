import { TErrorSource } from "../interface/error.interface";

const handleDuplicateError = (error: any) => {
  // Extract value within double quotes using regex;
  const match = error.message.match(/"([^"]*)"/);
  // The extracted value will be in the first capturing group;
  const extractedMessage = match && match[1];

  const errorSources: TErrorSource[] = [
    {
      path: error.keyValue,
      message: `${extractedMessage} is already exists!!`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleDuplicateError;
