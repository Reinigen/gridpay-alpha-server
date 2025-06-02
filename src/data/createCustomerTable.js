import db from "../config/db.js";
const { knexInstance } = db;

const createCustomerTable = async () => {
  try {
    knexInstance.schema.hasTable("customer").then(function (exists) {
      if (!exists) {
        return knexInstance.schema
          .createTable("customer", (table) => {
            table.string("customerId", 255).unique().primary();
            table.string("customerName", 100).notNullable();
            table.string("address", 100).notNullable();
            table
              .integer("companyId")
              .references("companyId")
              .inTable("company")
              .notNullable();
            table.string("meterId").references("meterId").inTable("meter");
            table
              .enum("status", [
                "Active",
                "Disconnected",
                "Trial",
                "Applicant",
                "End of Life",
                "Cancelled",
              ])
              .defaultTo("Applicant");
            table.boolean("isSenior").defaultTo(false);
            table.integer("invoiceId").references("invoiceId").inTable("bill");
            table
              .integer("paymentId")
              .references("paymentId")
              .inTable("payment");
          })
          .catch((error) => {
            console.log(`Error creating Customer table: ${error}`);
          });
      }
      console.log("Customer table created if not exists");
    });
  } catch (error) {
    console.log("Error creating customer table: ", error);
  }
};

export default createCustomerTable;
