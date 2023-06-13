import { GenericError } from "./GenericErrors";

class BadRequestError extends GenericError {
  statusCode = 400;
  message: string;
  constructor(message: string) {
    super();
    this.message = message;
  }
  getSerializedErrors() {
    return [{ message: this.message, field: ["Input"] }];
  }
}

export default BadRequestError;
