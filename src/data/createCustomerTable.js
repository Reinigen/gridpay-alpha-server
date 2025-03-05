import pool from "../config/db.js";

const createCustomerTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS customer (
    customer_id VARCHAR(100) UNIQUE PRIMARY KEY NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    meter_id INT FOREIGN KEY REFERENCES bill(meter_id),
    is_billing Boolean DEFAULT FALSE,
    is_senior Boolean DEFAULT FALSE,
    invoice_id INT FOREIGN KEY REFERENCES bill(invoice_id),
    payment_id INT FOREIGN KEY REFERENCES payment(payment_id),
    created_at TIMESTAMP DEFAULT NOW()
)
    `;

  try {
    pool.query(queryText);
    console.log("Customer table created if not exists");
  } catch (error) {
    console.log("Error creating users table: ", error);
  }
};

export default createCustomerTable;
