import express from "express";
import UserController from "../controllers/userController.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/", UserController.getAllUsers);
router.get("/details", verifyToken, UserController.getUserDetails);
router.put(
  "/update-user-details/:id",
  verifyToken,
  UserController.updateUserDetails
);
router.patch(
  "/update-user-password/:id",
  verifyToken,
  UserController.updateUserPassword
);
router.patch(
  "/update-user-role/:id",
  verifyToken,
  verifyAdmin,
  UserController.setUserAsAdmin
);
router.delete(
  "/delete-user/:id",
  verifyToken,
  verifyAdmin,
  UserController.deleteUser
);

export default router;
