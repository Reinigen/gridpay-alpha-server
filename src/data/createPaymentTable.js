import { knexInstance } from "../config/db.js";

const createPaymentTable = async () => {
  try {
    await knexInstance.schema.createTableIfNotExists("payment", (table) => {
      table.increments("payment_id").primary();
      table
        .string("customer_id", 255)
        .references("customer_id")
        .inTable("customer");
      table.integer("invoice_id").references("invoice_id").inTable("bill");
      table
        .enum("payment_method", [
          "cash",
          "credit_card",
          "bank_transfer",
          "mobile_payment",
        ])
        .notNullable();
      table.string("original_receipt", 255).nullable();
      table.string("duplicate_receipt", 255).nullable();
      table.integer("total_payment").notNullable();
      table.timestamp("created_at").defaultTo(knexInstance.fn.now());
    });
    console.log("Payment table created if not exists");
  } catch (error) {
    console.log("Error creating payment table: ", error);
  }
};

export default createPaymentTable;
