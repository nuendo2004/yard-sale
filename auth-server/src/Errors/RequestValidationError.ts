import { ZodError } from "zod";

abstract class RequestValidationError extends Error {
  statusCode = 500;
  constructor() {
    super("Request failed, invalid request parameters");
  }
  abstract getSerializedErrors(): {
    message: string;
    field: (string | number)[];
  }[];
}

class ZodRequestError extends RequestValidationError {
  override statusCode = 400;
  constructor(public errors: ZodError) {
    super();
  }

  public getSerializedErrors() {
    return this.errors.issues.map((err) => ({
      message: err.message,
      field: err.path,
    }));
  }
}

export { ZodRequestError, RequestValidationError };
