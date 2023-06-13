import bcrypt from "bcrypt";
import {
  UserAuthenticationException,
  UserGenereationException,
} from "../Errors/UserServiceException";

class Password {
  static hash(password: string): string | undefined {
    const saltCount = 10;
    let hashRes;
    bcrypt.genSalt(saltCount, (err, salt) => {
      if (err)
        throw new UserGenereationException(err.message, "Salt generation");
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) throw new UserGenereationException(error.message, "Hashing");
        console.log(hash);
        hashRes = hash;
      });
    });
    return hashRes;
  }

  static compare(password: string, hash: string) {
    let outcome: boolean = false;
    bcrypt.compare(password, hash, (err, res) => {
      if (err) {
        throw new UserAuthenticationException(err.message, "Login");
      } else {
        console.log("compare result " + res);
        return res;
      }
    });
    return outcome;
  }
}

export default Password;
