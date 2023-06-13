import express from "express";
import { ZodError, z } from "zod";
import { ZodRequestError } from "../Errors/RequestValidationError";
import User from "../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();

const UserSchema = z.object({
  email: z
    .string()
    .min(5, "Email must be more than 5 characters")
    .max(128)
    .email("Invalid email format"),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long" })
    .max(50, { message: "Password should be less than 50 characters long" })
    .regex(/[a-zA-Z]/, {
      message: "Password should contain at least one letter",
    })
    .regex(/[0-9]/, { message: "Password should contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password should contain at least one special character",
    }),
  avatarUrl: z.string().optional(),
  firstName: z.string(),
  lastName: z.string().optional(),
});

type User = z.infer<typeof UserSchema>;

router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const response = UserSchema.safeParse(req.body);
  console.log(response);
  if (!response.success) next(new ZodRequestError(response.error));
  else {
    const { email, password, avatarUrl, firstName, lastName } = req.body;
    const existed = await User.findOne({ email });
    if (existed) {
      next(new Error("Account with the same email already exist"));
      return;
    }

    const user = User.build({
      email,
      password,
      avatarUrl,
      firstName,
      lastName,
    });
    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        avatarUrl: user.avatarUrl,
        firstName: user.firstName,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).json(user);
  }
});

export { router as signUpRouter };
