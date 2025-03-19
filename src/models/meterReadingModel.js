import knexInstance from "../config/db.js";

class MeterReadingModel {
  static getAllMeterReadings = async () => {
    const allMeterReadings = await knexInstance
      .select("*")
      .from("meterReading");
    return allMeterReadings;
  };
  static getMeterReadingsById = async (meterId) => {
    const meterReadings = await knexInstance
      .select("*")
      .from("meterReading")
      .where("meterId", meterId);
    return meterReadings;
  };
  static getMeterReadingByIdAndMonth = async (meterId, readingMonth) => {
    const meterReading = await knexInstance
      .select("*")
      .from("meterReading")
      .where("meterId", meterId && "readingMonth", readingMonth);
    return meterReading;
  };

  static addMeterReading = async (
    readingMonth,
    meterReading,
    meterId,
    readingImage = null
  ) => {
    const newMeterReading = await knexInstance
      .insert({
        readingMonth: readingMonth,
        meterReading: meterReading,
        meterId: meterId,
        readingImage: readingImage,
      })
      .returning("*");
    return newMeterReading;
  };
  static addMeterReadingImage = async (readingMonth, meterId, readingImage) => {
    const updatedMeterReading = await knexInstance("meterReading")
      .where("readingMonth", readingMonth && "meterId", meterId)
      .update({ readingImage: readingImage })
      .returning("*");
    return updatedMeterReading;
  };
}

export default MeterReadingModel;
