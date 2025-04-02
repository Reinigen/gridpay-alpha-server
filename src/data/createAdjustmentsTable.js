import db from "../config/db.js";
const { knexInstance } = db;
const createAdjustmentsTable = async () => {
  try {
    knexInstance.schema.hasTable("adjustment").then(function (exists) {
      if (!exists) {
        return knexInstance.schema
          .createTable("adjustment", (table) => {
            table.increments("adjustmentId").primary();
            table.foreign("invoiceId").references("invoiceId").inTable("bill");
            table
              .foreign("meterReadingId")
              .references("meterReadingId")
              .inTable("meterReading");
            table.integer("amountDue").notNullable();
            table.date("billingMonth").notNullable();
            table.timestamp("createdAt").defaultTo(knexInstance.fn.now());
          })
          .catch((error) => {
            console.log(`Error creating Adjustments Table  ${error}`);
          });
      }
      console.log("Adjustments table created if not exists");
    });
  } catch (error) {
    console.error(error);
  }
};

export default createAdjustmentsTable;
