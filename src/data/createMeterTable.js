import db from "../config/db.js";
const { knexInstance } = db;

const createMeterTable = async () => {
  try {
    knexInstance.schema.hasTable("meter").then(function (exists) {
      if (!exists) {
        return knexInstance.schema
          .createTable("meter", (table) => {
            table.string("meterId", 255).unique().primary();
            table
              .string("customerId", 255)
              .references("customerId")
              .inTable("customer");
            table
              .foreign("meterReading")
              .references("meterReadingId")
              .inTable("meterReading");
            table.integer("address").references("address").inTable("customer");
            table.boolean("Active").defaultTo(true);
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
