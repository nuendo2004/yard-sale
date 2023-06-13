import { GenericError } from "./GenericErrors";

abstract class UserServiceException implements Error {
  abstract statusCode: number;
  name = "UserServiceException";
  message: string = "Unable to create a new user";
  location: string = "User";
  constructor(message: string | null, location: string | null) {
    if (message) this.message = message;
    if (location) this.location = location;
  }
  getSerializedErrors() {
    return [
      {
        message: this.message,
        field: [this.location],
      },
    ];
  }
}

class UserGenereationException extends UserServiceException {
  statusCode = 500;
  constructor(message: string | null, location: string | null) {
    super(message, location);
  }
}

class UserAuthenticationException extends UserGenereationException {
  statusCode = 400;
  constructor(message: string | null, location: string | null) {
    super(message, location);
  }
}

export { UserGenereationException, UserAuthenticationException };
