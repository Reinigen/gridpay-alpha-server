import db from "../config/db.js";
const { knexInstance } = db;
const createUserTable = async () => {
  try {
    knexInstance.schema.hasTable("users").then(function (exists) {
      if (!exists) {
        return knexInstance.schema
          .createTable("users", (table) => {
            table.increments("userId").primary();
            table.string("firstName", 100).notNullable();
            table.string("lastName", 100).notNullable();
            table.string("email", 100).unique().notNullable();
            table.string("password", 250).notNullable();
            table.boolean("isAdmin").defaultTo(false);
            // Add staff in the future
            table.string("mobileNo", 11).unique().notNullable();
            table.timestamp("createdAt").defaultTo(knexInstance.fn.now());
          })
          .catch((error) => {
            console.log("Error creating users table: ", error);
          });
      }
      console.log("User table created if not exists");
    });
  } catch (error) {
    console.log("Error creating users table: ", error);
  }
};

export default createUserTable;
