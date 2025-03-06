import db from "../config/db.js";
const { knexInstance } = db;

const createPaymentTable = async () => {
  try {
    knexInstance.schema.hasTable("payment").then(function (exists) {
      if (!exists) {
        return knexInstance.schema
          .createTable("payment", (table) => {
            table.increments("paymentId").primary();
            table
              .string("customerId", 255)
              .references("customerId")
              .inTable("customer");
            table.integer("invoiceId").references("invoiceId").inTable("bill");
            table
              .enum("paymentMethod", [
                "cash",
                "creditCard",
                "bankTransfer",
                "mobilePayment",
              ])
              .notNullable();
            table.string("originalReceipt", 255).nullable();
            table.string("duplicateReceipt", 255).nullable();
            table.integer("totalPayment").notNullable();
            table.timestamp("createdAt").defaultTo(knexInstance.fn.now());
          })
          .catch((error) => {
            console.log("Error creating payment table: ", error);
          });
      }
      console.log("Payment table created if not exists");
    });
  } catch (error) {
    console.log("Error creating payment table: ", error);
  }
};

export default createPaymentTable;
