import { knexInstance } from "../config/db.js";
const createBillTable = async () => {
  try {
    await knexInstance.schema.createTableIfNotExists("bill", (table) => {
      table.increments("invoice_id").primary();
      table
        .string("customer_id", 255)
        .references("customer_id")
        .inTable("customer");
      table
        .integer("meter_reading_id")
        .references("meter_reading_id")
        .inTable("meter_reading");
      table.date("billing_month").notNullable();
      table.timestamp("created_at").defaultTo(knexInstance.fn.now());
    });
    console.log("Bill table created if not exists");
  } catch (error) {
    console.error(error);
  }
};

export default createBillTable;
