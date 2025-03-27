import pkg from "jsonwebtoken";
import dotenv from "dotenv";
const jwt = pkg;

// Environment Setup
dotenv.config();

//Token Creation

export const createAccessToken = (user) => {
  const data = {
    id: user.userId,
    email: user.email,
    isAdmin: user.isAdmin,
  };
  return jwt.sign(data, process.env.JWT_SECRET, {});
};

export const verifyToken = (req, res, next) => {
  console.log(req.headers.authorization);

  let token = req.headers.authorization;

  if (typeof token === "undefined") {
    return res.status(403).send({ auth: "Failed. No token" });
  } else {
    token = token.slice(7, token.length);

    jwt.verify(token, process.env.JWT_SECRET, function (err, decodedToken) {
      if (err) {
        return res.status(403).send({
          auth: "Failed",
          message: err.messagee,
        });
      } else {
        console.log("result from verify method: ");
        console.log(decodedToken);

        req.user = decodedToken;
        next();
      }
    });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.status(403).send({
      auth: "Failed",
      message: "Action Forbidden",
    });
  }
};

export const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.sendStatus(401);
  }
};
