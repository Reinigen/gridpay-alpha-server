import pool from "../config/db.js";

const createPaymentTable = async () => {
  const queryText = `
  CREATE TYPE payment_type AS ENUM (
    'cash',
    'credit_card',
    'bank_transfer',
    'mobile_payment'
);
CREATE TABLE IF NOT EXISTS payment (
    payment_id SERIAL PRIMARY KEY,
    customer_id INT FOREIGN KEY REFERENCES customer(customer_id),
    billing_id INT FOREIGN KEY REFERENCES bill(billing_id),
    payment_method payment_type NOT NULL,
    original_receipt VARCHAR,
    duplicate_receipt VARCHAR,
    total_payment int NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)
    `;

  try {
    pool.query(queryText);
    console.log("User table created if not exists");
  } catch (error) {
    console.log("Error creating users table: ", error);
  }
};

export default createPaymentTable;
