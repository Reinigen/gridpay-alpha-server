import db from "../config/db.js";
const { knexInstance } = db;

class UserModel {
  static getAllUsers = async () => {
    const allUsers = await knexInstance.select("*").from("users");
    return allUsers;
  };
  static getUserById = async (userId) => {
    const user = await knexInstance
      .select("*")
      .from("users")
      .where("userId", userId)
      .first();
    return user;
  };

  static loginUser = async (email) => {
    const user = await knexInstance
      .select("*")
      .from("users")
      .where("email", email)
      .first();
    return user;
  };

  static createUser = async (userData) => {
    const newUser = await knexInstance("users")
      .insert({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        mobileNo: userData.mobileNo,
      })
      .returning("*");
    return newUser[0];
  };

  // Function lets works similar to findByIdAndUpdate in Mongoose
  static updateUser = async (userId, userData) => {
    const updatedUser = await knexInstance("users")
      .where("userId", userId)
      .update(userData)
      .returning("*");
    return updatedUser[0];
  };
  static deleteUser = async (userId) => {
    const deletedUser = await knexInstance("users")
      .where("userId", userId)
      .del()
      .returning("*");
    return deletedUser[0];
  };
}

export default UserModel;
