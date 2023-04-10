import express from "express";
import { z } from "zod";

const router = express.Router();

const UserSchema = z.object({
  email: z
    .string()
    .min(5, "Email must be more than 5 characters")
    .max(128)
    .email(""),
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
});

type User = z.infer<typeof UserSchema>;

router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  res.send(UserSchema.safeParse(req.body));
});

export { router as signUpRouter };
