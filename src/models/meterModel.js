import knexInstance from "../config/db.js";

class MeterModel {
  static addMeter = async (meterId, customerId, address) => {
    const newMeter = await knexInstance
      .insert({
        meterId: meterId,
        customerId: customerId,
        address: address,
      })
      .returning("*");
    return newMeter;
  };
  static deleteMeter = async (meterId) => {
    const deletedMeter = await knexInstance("meter")
      .where("meterId", meterId)
      .delete();

    return deletedMeter;
  };
}

export default MeterModel;
