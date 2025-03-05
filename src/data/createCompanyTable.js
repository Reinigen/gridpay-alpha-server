import { knexInstance } from "../config/db.js";
const createCompanyTable = async () => {
  try {
    await knexInstance.schema.createTableIfNotExists("company", (table) => {
      table.increments("company_id").primary();
      table.string("company_name", 100).unique().notNullable();
      table.string("address", 100).notNullable();
      table
        .integer("customers_id")
        .references("customer_id")
        .inTable("customer")
        .nullable();
      table
        .integer("meter_id")
        .references("meter_id")
        .inTable("meter")
        .nullable();
      table
        .integer("invoice_id")
        .references("invoice_id")
        .inTable("bill")
        .nullable();
      table
        .integer("payment_id")
        .references("payment_id")
        .inTable("payment")
        .nullable();
      table.timestamp("created_at").defaultTo(knexInstance.fn.now());
    });
    console.log("Company table created if not exists");
  } catch (error) {
    console.log("Error creating company table: ", error);
  }
};

export default createCompanyTable;
