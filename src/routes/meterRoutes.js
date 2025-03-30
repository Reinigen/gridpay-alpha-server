import express from "express";
import MeterController from "../controllers/meterController.js";

const router = express.Router();

router.post("/add-meter", MeterController.addMeter);
// May need to be changed/deleted
router.delete("/delete-meter/:id", MeterController.deleteMeter);

export default router;
