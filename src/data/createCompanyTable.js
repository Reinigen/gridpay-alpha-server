import db from "../config/db.js";
const { knexInstance } = db;
const createCompanyTable = async () => {
  try {
    knexInstance.schema.hasTable("company").then(function (exists) {
      if (!exists) {
        return knexInstance.schema
          .createTable("company", (table) => {
            table.increments("companyId").primary();
            table.string("companyName", 255).unique().notNullable();
            table.string("address", 255).notNullable();
            table.integer("companyOwner").references("userId").inTable("users");
            table
              .integer("companyAdmin")
              .references("userId")
              .inTable("users")
              .nullable();
            table
              .integer("employee")
              .references("userId")
              .inTable("users")
              .nullable();
            table
              .string("customerId")
              .references("customerId")
              .inTable("customer")
              .nullable();
            table
              .string("meterId")
              .references("meterId")
              .inTable("meter")
              .nullable();
            table
              .integer("invoiceId")
              .references("invoiceId")
              .inTable("bill")
              .nullable();
            table
              .integer("paymentId")
              .references("paymentId")
              .inTable("payment")
              .nullable();
            table.jsonb("pricingPlan").notNullable();
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
