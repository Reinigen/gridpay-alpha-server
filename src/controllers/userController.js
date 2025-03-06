import { errorHandler } from "../middlewares/errorHandler.js";
import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserDetailsService,
  deleteUserService,
} from "../models/userModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (req, res, next) => {
  const { name, email, password, isAdmin, mobileNo, company_id } = req.body;
  try {
    const newUser = await createUserService(
      name,
      email,
      password,
      isAdmin,
      mobileNo,
      company_id
    );
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (err) {
    next(errorHandler(err));
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    handleResponse(res, 200, "Users fetched successfully", users);
  } catch (err) {
    next(errorHandler(err));
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User fetched successfully", user);
  } catch (err) {
    next(errorHandler(err));
  }
};

export const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await updateUserDetailsService(
      req.params.id,
      name,
      email
    );
    if (!updatedUser) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User updated successfully", updatedUser);
  } catch (err) {
    next(errorHandler(err));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const updatedUser = await deleteUserService(req.params.id);
    if (!updatedUser) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User updated successfully", updatedUser);
  } catch (err) {
    next(errorHandler(err));
  }
};
