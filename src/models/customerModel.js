import knexInstance from "../config/db.js";

class CustomerModel {
  static getAllCustomers = async () => {
    const customers = await knexInstance.select("*").from("customer");
    return customers;
  };
  static getAllCompanyCustomers = async (companyId) => {
    const customers = await knexInstance
      .select("*")
      .from("customer")
      .where("companyId", companyId);
    return customers;
  };
  static getCustomerById = async (customerId) => {
    const customer = await knexInstance
      .select("*")
      .from("customer")
      .where(customerId)
      .first();
    return customer;
  };
  static addCustomer = async (customerId, companyId, customerName, address) => {
    const newCustomer = await knexInstance
      .insert({
        customerId: customerId,
        companyId: companyId,
        customerName: customerName,
        address: address,
      })
      .returning("*");
    return newCustomer;
  };

  static updateCustomer = async (customerId, customerData) => {
    const updatedCustomer = await knexInstance("customer")
      .where("customerId", customerId)
      .update(customerData)
      .returning("*");
    return updatedCustomer[0];
  };

  static deleteCustomer = async (customerId) => {
    const deletedCustomer = await knexInstance("customer")
      .where("customerId", customerId)
      .delete();
    return deletedCustomer;
  };
}

export default CustomerModel;
