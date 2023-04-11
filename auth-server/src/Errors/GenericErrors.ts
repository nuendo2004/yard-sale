abstract class GenericError extends Error {
  statusCode = 500;
  constructor() {
    super();
  }
  abstract getSerializedErrors(): {
    message: string;
    field: (string | number)[];
  }[];
}

class NotFoundError extends GenericError {
  override statusCode = 404;
  constructor() {
    super();
  }
  public getSerializedErrors() {
    return [
      {
        message: "Page not found",
        field: ["Item response"],
      },
    ];
  }
}

export { GenericError, NotFoundError };
