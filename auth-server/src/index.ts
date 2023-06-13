import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/currentuser";
import { signUpRouter } from "./routes/signup";
import { signOutRouter } from "./routes/signout";
import { signInRouter } from "./routes/signin";
import { errorHandler } from "./middleware/ErrorHandler";
import cookieSession from "cookie-session";
import { NotFoundError } from "./Errors/GenericErrors";
import mongoose from "mongoose";

const app = express();
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use("/api/user", currentUserRouter);
app.use("/api/user", signInRouter);
app.use("/api/user", signOutRouter);
app.use("/api/user", signUpRouter);

// app.use("*", async (req, res, next) => {
//   next(new NotFoundError());
// });
app.use(errorHandler);

app.get("/api/user/current", (req, res) => {
  res.send("Hi there");
});

const startup = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("Critical, JWT_KEY is not defined..");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to mongodb at port 27017...");
  } catch (err) {
    console.log(err);
  }
  app.listen(1000, () => {
    console.log("listening on port 1000...");
  });
};

startup();
