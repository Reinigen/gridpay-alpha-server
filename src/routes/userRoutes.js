import express from "express";
import UserController from "../controllers/userController.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/update-user-details/:id", UserController.updateUserDetails);
router.patch("/update-user-password/:id", UserController.updateUserPassword);
router.delete("/:id", UserController.deleteUser);

export default router;
