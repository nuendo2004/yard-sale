import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../Errors/RequestValidationError";
import { GenericError } from "../Errors/GenericErrors";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  if (error instanceof RequestValidationError) {
    console.log("error found");
    res.status(error.statusCode).send(error.getSerializedErrors());
  } else if (error instanceof GenericError) {
    console.log("error found");
    res.status(error.statusCode).send(error.getSerializedErrors());
  } else
    res.status(500).send({
      errors: [{ message: error.message, field: ["unknown"] }],
    });
};
