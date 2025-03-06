import db from "../config/db.js";
const { knexInstance } = db;

export const getAllUsersService = async () => {
  const allUsers = await knexInstance.select("*").from("users");
  return allUsers;
};
export const getUserByIdService = async (userId) => {
  const user = await knexInstance
    .select("*")
    .from("users")
    .where("userId", userId);
  return user[0];
};
export const createUserService = async (
  userId,
  firstName,
  lastName,
  email,
  password,
  isAdmin,
  mobileNo,
  companyId
) => {
  const newUser = await knexInstance("users")
    .insert({
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      isAdmin: isAdmin,
      mobileNo: mobileNo,
      companyId: companyId,
    })
    .returning("*");
  return newUser[0];
};

export const updateUserDetailsService = async (userId, userData) => {
  const updatedUser = await knexInstance("users")
    .where("userId", userId)
    .update(userData)
    .returning("*");
  return updatedUser[0];
};
export const deleteUserService = async (userId) => {
  const deletedUser = await knexInstance("users")
    .where("userId", userId)
    .del()
    .returning("*");
  return deletedUser[0];
};
