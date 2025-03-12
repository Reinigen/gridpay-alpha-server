import express from "express";
import CustomerController from "../controllers/customerController.js";

const router = express.Router();

router.post("/add-meter", MeterController.addMeter);
router.post("/delete-meter/:id", MeterController.deleteMeter);

export default router;
