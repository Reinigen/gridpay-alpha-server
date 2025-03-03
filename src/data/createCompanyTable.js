import pool from "../config/db.js";

const createCompanyTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS company (
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) UNIQUE NOT NULL,
    address VARCHAR(100) NOT NULL,
    customers_id INT,
    meter_id INT,
    billing_id INT,
    payment_id INT,
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

export default createCompanyTable;
