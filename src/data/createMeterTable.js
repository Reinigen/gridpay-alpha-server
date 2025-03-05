import { knexInstance } from "../config/db.js";

const createMeterTable = async () => {
  try {
    await knexInstance.schema.createTableIfNotExists("meter", (table) => {
      table.increments("meter_id").primary();
      table
        .integer("meter_reading")
        .references("meter_reading_id")
        .inTable("meter_reading");
      table.integer("address").references("address").inTable("customer");
    });
    console.log("Meter table created if not exists");
  } catch (error) {
    console.log("Error creating meter table: ", error);
  }
};

export default createMeterTable;
