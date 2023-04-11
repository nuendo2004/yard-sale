import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../Errors/RequestValidationError";
import { GenericError } from "../Errors/GenericErrors";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof RequestValidationError) {
    res.status(error.statusCode).send(error.getSerializedErrors());
  } else if (error instanceof RequestValidationError) {
    res.send(500).send({
      errors: "errr",
    });
  } else if (error instanceof GenericError) {
    res.status(error.statusCode).send(error.getSerializedErrors());
  } else
    res.status(500).send({
      errors: [{ message: error.message, field: ["unknown"] }],
    });

  next();
};
