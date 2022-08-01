import jwt from "jsonwebtoken";
import { secret } from "../util/auth";

export const authenticate = (req: any, _res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const userLogged = jwt.verify(token, secret);
    //console.log(userLogged);
    if(typeof userLogged !== "string"){
        req.verifiedUser = userLogged.user;
    }
    next();

  } catch (error) {
    console.log(error)
    next();

  }
};
