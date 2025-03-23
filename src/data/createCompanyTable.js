import db from "../config/db.js";
const { knexInstance } = db;
const createCompanyTable = async () => {
  try {
    knexInstance.schema.hasTable("company").then(function (exists) {
      if (!exists) {
        return knexInstance.schema
          .createTable("company", (table) => {
            table.increments("companyId").primary();
            table.string("companyName", 100).unique().notNullable();
            table.foreign("userId").references("userId").inTable("users");
            table.string("address", 100).notNullable();
            table.foreign("companyAdmin").references("userId").inTable("users");
            table
              .integer("customerId")
              .references("customerId")
              .inTable("customer");
            table.integer("meterId").references("meterId").inTable("meter");
            table.integer("invoiceId").references("invoiceId").inTable("bill");
            table
              .integer("paymentId")
              .references("paymentId")
              .inTable("payment");
            table.timestamp("createdAt").defaultTo(knexInstance.fn.now());
          })
          .catch((error) => {
            console.log(`Error creating company table: ${error}`);
          });
      }
      console.log("Company table created if not exists");
    });
  } catch (error) {
    console.log("Error creating company table: ", error);
  }
};

export default createCompanyTable;
