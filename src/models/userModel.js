import pool from "../config/db.js";

export const getAllUsersService = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};
export const getUserByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM users where id = $1", [id]);
  return result.rows[0];
};
export const createUserService = async (
  customer_id,
  firstName,
  lastName,
  email,
  password,
  isAdmin,
  mobileNo,
  company_id
) => {
  const result = await pool.query(
    "INSERT INTO users (customer_id, firstName, lastName, email, password, isAdmin, mobileNo, company_id) VALUES ($1, $2,$3,$4,$5,$6,$7,$8) RETURNING *",
    [
      customer_id,
      firstName,
      lastName,
      email,
      password,
      isAdmin,
      mobileNo,
      company_id,
    ]
  );
  return result.rows[0];
};

export const updateUserDetailsService = async (
  id,
  firstName,
  lastName,
  email,
  password,
  isAdmin,
  mobileNo,
  company_id
) => {
  const result = await pool.query(
    "UPDATE users SET customer_id=$1, firstName=$2, lastName=$3, email=$4, password=$5, isAdmin=$6, mobileNo=$7, company_id=$8 WHERE id=$9 RETURNING *",
    [firstName, lastName, email, password, isAdmin, mobileNo, company_id, id]
  );
  if (result.rowCount === 0) {
    throw new Error("User not found");
  }
  return result.rows[0];
};
export const deleteUserService = async (id) => {
  const result = await pool.query("DELETE FROM users WHERE id=$1 RETURNING *", [
    id,
  ]);
  return result.rows[0];
};
