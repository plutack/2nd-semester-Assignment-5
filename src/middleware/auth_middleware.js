import Jwt from "jsonwebtoken";
import { ErrorWithStatusCode } from "../exceptions/customErrorConstructor.js";

export const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401).json({ message: "Unauthorized no authorization header" });
  }
  const bearerToken = authorization.split(" ");
  if (bearerToken.length !== 2) {
    res.status(401).json({ message: "Unauthorized not 2" });
  }
  Jwt.verify(bearerToken[1], process.env.JWTSECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(401).json({ message: "Unauthorized not correct" });
    }
  });

  console.log("successful");
};
