import pool from "../config/db.js";

const createBillTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS bill (
    billing_id SERIAL PRIMARY KEY,
    customer_id INT FOREIGN KEY REFERENCES customer(customer_id),
    meter_reading_id INT FOREIGN KEY REFERENCES meter_reading(meter_reading_id),
    billing_month date NOT NULL,
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

export default createBillTable;
