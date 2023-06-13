import { IUser } from "../models/user";
import jwt from "jsonwebtoken";

class AuthService {
  sign(user: IUser) {
    jwt.sign(
      {
        id: user.id,
        email: user.email,
        avatarUrl: user.avatarUrl,
        firstName: user.firstName,
      },
      process.env.JWT_KEY!
    );
  }
}
