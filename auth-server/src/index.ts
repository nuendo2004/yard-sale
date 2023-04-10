import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/currentuser";
import { signUpRouter } from "./routes/signup";
import { signOutRouter } from "./routes/signout";
import { signInRouter } from "./routes/signin";

const app = express();
app.use(json());
app.use("/api/user", currentUserRouter);
app.use("/api/user", signInRouter);
app.use("/api/user", signOutRouter);
app.use("/api/user", signUpRouter);

app.get("/api/user/current", (req, res) => {
  res.send("Hi there");
});

app.listen(1000, () => {
  console.log("listening on port 1000...");
});
