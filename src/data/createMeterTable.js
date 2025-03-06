import db from "../config/db.js";
const { knexInstance } = db;

const createMeterTable = async () => {
  try {
    knexInstance.schema.hasTable("meter").then(function (exists) {
      if (!exists) {
        return knexInstance.schema
          .createTable("meter", (table) => {
            table.increments("meterId").primary();
            table
              .integer("meterReading")
              .references("meterReadingId")
              .inTable("meterReading");
            table.integer("address").references("address").inTable("customer");
          })
          .catch((error) => {
            console.log(`Error creating meter table: ${error}`);
          });
      }
      console.log("Meter table created if not exists");
    });
  } catch (error) {
    console.log(`Error creating meter table: ${error}`);
  }
};

export default createMeterTable;
