export interface TErrorSource {
  path: string;
  message: string;
}

export interface TErrorData {
  success: boolean;
  message: string;
  errorSources: TErrorSource[];
  error?: Error;
}
