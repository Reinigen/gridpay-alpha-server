import pkg from "pg";
import dotenv from "dotenv";
import knex from "knex";
const { Pool } = pkg;

// Env Setup
dotenv.config();

//POSTGRESQL database
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
});

// Connect to POSTGRESQL DB
pool.on("connect", () => {
  console.log("Connection pool established with Database");
});

const knexInstance = knex({
  client: "pg",
  connection: pool,
  pool: {
    min: 2,
    max: 10,
  },
});
export default { pool, knexInstance };
