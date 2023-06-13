import mongoose from "mongoose";
import Password from "../services/passwordService";

interface IUser {
  email: string;
  password: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
}

interface IUserModel extends mongoose.Model<IUserDocument> {
  build: (user: IUser) => IUserDocument;
}

interface IUserDocument extends mongoose.Document {
  email: string;
  password: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (email: string) => {
          const regex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          email.match(regex);
        },
        meassage: "Email is not valid.",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (password: string) => {
          const regex =
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
          password.match(regex);
        },
        message: "Password not match the format.",
      },
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hasedPass = Password.hash(this.get("password"));
    this.set("password", hasedPass);
  }
  done();
});

userSchema.statics.build = (user: IUser) => {
  return new User(user);
};
const User = mongoose.model<IUserDocument, IUserModel>("user", userSchema);

export default User;
export { IUser };
