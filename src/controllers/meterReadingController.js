import { errorHandler } from "../middlewares/handlers.js";
import MeterReadingModel from "../models/meterReadingModel.js";
import MeterModel from "../models/meterModel.js";

class MeterReadingController {
  static getAllMeterReadings = async (req, res, next) => {
    try {
      const allMeterReadings = await MeterReadingModel.getAllMeterReadings();
      res.status(200).json(allMeterReadings);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
  static getMeterReadingsById = async (req, res, next) => {
    try {
      const meterReading = await MeterReadingModel.getMeterReadingsById(
        req.params.meterId
      );
      res.status(200).json(meterReading);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
  static getMeterReadingByCompanyId = async (req, res, next) => {
    const { companyId } = req.params;
    try {
      const companyMeters = await MeterModel.getMeterByCompanyId(companyId);
      const companyMeterReadings = companyMeters.map((meter) =>
        MeterReadingModel.getMeterReadingsById(meter.meterId)
      );
      res.status(200).json(companyMeterReadings);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
  static getMeterReadingByCompanyIdAndMonth = async (req, res, next) => {
    const { companyId, readingMonth } = req.params;
    try {
      const companyMeters = await MeterModel.getMeterByCompanyId(companyId);
      const companyMeterReadings = companyMeters.map((meter) =>
        MeterReadingModel.getMeterReadingByIdAndMonth(
          meter.meterId,
          readingMonth
        )
      );
      res.status(200).json(companyMeterReadings);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
  static getMeterReadingByIdAndMonth = async (req, res, next) => {
    const { meterId, readingMonth } = req.params;
    try {
      const meterReading = await MeterReadingModel.getMeterReadingByIdAndMonth(
        meterId,
        readingMonth
      );
      res.status(200).json(meterReading);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
  static addMeterReading = async (req, res, next) => {
    const { meterReading, readingMonth, readingImage = null } = req.body;
    const { meterId } = req.params;
    try {
      const newMeterReading = await MeterReadingModel.addMeterReading(
        meterId,
        meterReading,
        readingMonth,
        readingImage
      );
      return newMeterReading;
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
  static addMeterReadingImage = async (req, res, next) => {
    const { readingMonth, readingImage } = req.body;
    const { meterId } = req.params;
    try {
      const updatedMeterReading = await MeterReadingModel.addMeterReadingImage(
        meterId,
        readingMonth,
        readingImage
      );
      return updatedMeterReading;
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
}

export default MeterReadingController;
