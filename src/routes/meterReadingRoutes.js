import express from "express";
import MeterReadingController from "../controllers/meterReadingController.js";

const router = express.Router();

router.get("/", MeterReadingController.getAllMeterReadings);
router.get("/:meterId", MeterReadingController.getMeterReadingsById);
router.get(
  "/:meterId/:readingMonth",
  MeterReadingController.getMeterReadingByIdAndMonth
);
router.post(
  "/add-meter-reading/:meterId",
  MeterReadingController.addMeterReading
);
router.post(
  "/add-meter-reading-image/:meterId",
  MeterReadingController.addMeterReadingImage
);
// router.delete("/delete-meter-reading/:meterId", MeterReadingController.deleteMeterReading);

export default router;
