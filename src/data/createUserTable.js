import { knexInstance } from "../config/db.js";

const createUserTable = async () => {
  try {
    await knexInstance.schema.createTableIfNotExists("users", (table) => {
      table.increments("id").primary();
      table.string("firstName", 100).notNullable();
      table.string("lastName", 100).notNullable();
      table.string("email", 100).unique().notNullable();
      table.string("password", 100).notNullable();
      table.boolean("isAdmin").defaultTo(false);
      table.integer("mobileNo").notNullable();
      table.integer("company_id");
      table.timestamp("created_at").defaultTo(knexInstance.fn.now());
    });
    console.log("User table created if not exists");
  } catch (error) {
    console.log("Error creating users table: ", error);
  }
};

export default createUserTable;
