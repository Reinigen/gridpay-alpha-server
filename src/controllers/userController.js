import { errorHandler, responseHandler } from "../middlewares/handlers.js";
import { createAccessToken } from "../middlewares/auth.js";
import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";

// Standardized response function
class UserController {
  static getAllUsers = async (req, res, next) => {
    try {
      const users = await UserModel.getAllUsers();
      responseHandler(res, 200, "Users fetched successfully", users);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };

  static getUserById = async (req, res, next) => {
    try {
      const user = await UserModel.getUserById(req.params.id);
      if (!user) return responseHandler(res, 404, "User not found");
      responseHandler(res, 200, "User fetched successfully", user);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };

  static registerUser = async (req, res, next) => {
    const { firstName, lastName, email, password, mobileNo } = req.body;

    if (!firstName || !lastName)
      return responseHandler(
        res,
        400,
        "firstName, lastName are required fields."
      );
    if (!email.includes("@")) {
      return responseHandler(res, 400, "Email is not valid.");
    }
    if (password.length < 8 || typeof password !== "string") {
      return responseHandler(
        res,
        400,
        "Password must be at least 8 characters long."
      );
    }
    if (mobileNo.length !== 11 || typeof mobileNo !== "string") {
      return res.status(400).send({ error: "Mobile number invalid" });
    }

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: bcrypt.hashSync(password, 10),
      mobileNo: mobileNo,
    };
    try {
      const newUser = await UserModel.createUser(userData);
      responseHandler(res, 201, "User created successfully", newUser);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };

  static loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.loginUser(email);
      if (!user) {
        return responseHandler(res, 404, "User not found");
      } else {
        const isValidPassword = await bcrypt.compareSync(
          password,
          user.password
        );
        if (isValidPassword) {
          const accessToken = createAccessToken(user);
          responseHandler(res, 200, "User logged in successfully", accessToken);
        } else {
          return responseHandler(res, 401, "Email and password do not match");
        }
      }
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };

  static updateUserDetails = async (req, res, next) => {
    const { firstName, lastName, mobileNo } = req.body;
    if (mobileNo.length !== 11 || typeof mobileNo !== "string") {
      return res.status(400).send({ error: "Mobile number invalid" });
    }
    if (!firstName || !lastName)
      return responseHandler(
        res,
        400,
        "firstName, lastName are required fields."
      );
    userData = {
      firstName: firstName,
      lastName: lastName,
      mobileNo: mobileNo,
    };
    try {
      updatedUser = await UserModel.updateUser(req.params.id, userData);

      if (!updatedUser) return responseHandler(res, 404, "User not found");
      responseHandler(res, 200, "User updated successfully", updatedUser);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };

  static updateUserPassword = async (req, res, next) => {
    const { password } = req.body;
    if (password.length < 8 || typeof password !== "string") {
      return responseHandler(
        res,
        400,
        "Password must be at least 8 characters long."
      );
    }
    userData = {
      password: bcrypt.hashSync(password, 10),
    };
    try {
      updatedUser = await UserModel.updateUser(req.params.id, userData);
      if (!updatedUser) return responseHandler(res, 404, "User not found");
      responseHandler(res, 200, "User updated successfully", updatedUser);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };

  static setUserAsAdmin = async (req, res, next) => {
    const userData = {
      isAdmin: true,
    };
    try {
      const user = await UserModel.getUserById(req.params.id);
      if (!user) {
        return responseHandler(res, 404, "User not found");
      }
      if (user.isAdmin === false) {
        const updatedUser = await UserModel.updateUser(req.params.id, userData);
        if (!updatedUser) {
          return responseHandler(res, 404, "User not found");
        }
        responseHandler(res, 200, "User updated successfully", updatedUser);
      }
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };

  static deleteUser = async (req, res, next) => {
    try {
      updatedUser = await UserModel.deleteUser(req.params.id);
      if (!updatedUser) return responseHandler(res, 404, "User not found");
      responseHandler(res, 200, "User updated successfully", updatedUser);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };
}

export default UserController;
