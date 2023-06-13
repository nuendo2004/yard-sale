import express from "express";
import { ZodError, z } from "zod";
import { ZodRequestError } from "../Errors/RequestValidationError";
import User from "../models/user";
import BadRequestError from "../Errors/BadRequestError";
import Password from "../services/passwordService";
import jwt from "jsonwebtoken";

const router = express.Router();

const LoginSchema = z.object({
  email: z.string().nonempty("Email must be valid"),
  password: z.string().nonempty("Email must be valid"),
});

router.post("/signin", async (req, res, next) => {
  const safeRes = LoginSchema.safeParse(req.body);
  if (!safeRes.success) next(new ZodRequestError(safeRes.error));
  else {
    const { email, password } = req.body;
    console.log("request", req.body);
    const exist = await User.findOne({ email });
    if (!exist) {
      next(new BadRequestError("Invalid password or username"));
    } else {
      console.log("hash", exist);
      const match = Password.compare(password, exist.password);
      console.log(match);
      if (!match!) {
        throw new BadRequestError("Invalid password or username");
      }

      const userJwt = jwt.sign(
        {
          id: exist.id,
          email: exist.email,
          avatarUrl: exist.avatarUrl,
          firstName: exist.firstName,
        },
        process.env.JWT_KEY!
      );

      req.session = {
        jwt: userJwt,
      };

      res.status(200).json(exist);
    }
  }
});

export { router as signInRouter };
