abstract class DatabaseAccessError extends Error {
  statusCode = 500;
  constructor() {
    super("Date access failed...");
    Object.setPrototypeOf(this, DatabaseAccessError.prototype);
  }
  abstract getSerializedErrors(): {
    message: string;
    field: (string | number)[];
  }[];
}

// class MongooseValidationError extends DatabaseAccessError {
//   override name = "Mongoose";
//   override statusCode = 400;

// }
