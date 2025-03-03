import pool from "../config/db.js";

const createMeterTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS meter (
    meter_id SERIAL PRIMARY KEY,
    meter_reading INT FOREIGN KEY REFERENCES meter_reading(meter_reading_id),
    address VARCHAR(100) NOT NULL
)
    `;

  try {
    pool.query(queryText);
    console.log("User table created if not exists");
  } catch (error) {
    console.log("Error creating users table: ", error);
  }
};

export default createMeterTable;
