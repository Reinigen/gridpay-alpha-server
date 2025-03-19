import { errorHandler } from "../middlewares/handlers.js";
import MeterModel from "../models/meterModel.js";

class MeterController {
  static addMeter = async (req, res, next) => {
    const { meterId, customerId, address } = req.body;
    try {
      const newMeter = await MeterModel.addMeter(meterId, customerId, address);
      return newMeter;
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
  static deleteMeter = async (req, res, next) => {
    const { meterId } = req.body;
    try {
      const deletedMeter = await MeterModel.deleteMeter(meterId);
      return deletedMeter;
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
}

export default MeterController;
