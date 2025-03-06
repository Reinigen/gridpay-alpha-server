import db from "../config/db.js";
const { knexInstance } = db;
const createBillTable = async () => {
  try {
    knexInstance.schema.hasTable("company").then(function (exists) {
      if (!exists) {
        return knexInstance.schema
          .createTable("bill", (table) => {
            table.increments("invoiceId").primary();
            table
              .string("customerId", 255)
              .references("customerId")
              .inTable("customer");
            table
              .integer("meterReadingId")
              .references("meterReadingId")
              .inTable("meterReading");
            table.date("billingMonth").notNullable();
            table.timestamp("createdAt").defaultTo(knexInstance.fn.now());
          })
          .catch((error) => {
            console.log(`Error creating Bill Table  ${error}`);
          });
      }
      console.log("Bill table created if not exists");
    });
  } catch (error) {
    console.error(error);
  }
};

export default createBillTable;
