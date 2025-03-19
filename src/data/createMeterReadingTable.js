import db from "../config/db.js";
const { knexInstance } = db;

const createMeterReadingTable = async () => {
  try {
    knexInstance.schema.hasTable("meterReading").then(function (exists) {
      if (!exists) {
        return knexInstance.schema
          .createTable("meterReading", (table) => {
            table.increments("meterReadingId").primary();
            table.foreign("meterId").references("meterId").inTable("meter");
            table.date("readingMonth").notNullable();
            table.integer("reading").notNullable();
            table.string("readingImage", 100).nullable();
            table.timestamp("createdAt").defaultTo(knexInstance.fn.now());
          })
          .catch((error) => {
            console.log(`Error creating Meter Reading table: ${error}`);
          });
      }
      console.log("Meter Reading table created if not exists");
    });
  } catch (error) {
    console.log("Error creating Meter Reading table: ", error);
  }
};

export default createMeterReadingTable;
