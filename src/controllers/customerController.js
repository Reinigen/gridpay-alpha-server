import CustomerModel from "../models/customerModel.js";

class CustomerController {
  static getAllCompanyCustomers = async (req, res, next) => {
    try {
      const allCustomers = await CustomerModel.getAllCompanyCustomers(
        req.params.companyId
      );
      res.status(200).json(allCustomers);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };

  static getCustomerById = async (req, res, next) => {
    try {
      const customer = await CustomerModel.getCustomerById(req.params.id);
      res.status(200).json(customer);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };

  static addCustomer = async (req, res, next) => {
    try {
      const newCustomer = await CustomerModel.addCustomer(
        req.body.customerId,
        req.body.customerName,
        req.body.address
      );
      res.status(201).json(newCustomer);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };

  static updateCustomer = async (req, res, next) => {
    const { customerName, address } = req.body;
    const customerData = {
      customerName: customerName,
      address: address,
    };
    try {
      const updatedCustomer = await CustomerModel.updateCustomer(
        req.params.id,
        customerData
      );
      res.status(200).json(updatedCustomer);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };

  static updateToSenior = async (req, res, next) => {
    const customerData = { isSenior: true };
    try {
      const updatedCustomer = await CustomerModel.updateCustomer(
        req.params.id,
        customerData
      );
      res.status(200).json(updatedCustomer);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };

  static updateToBilling = async (req, res, next) => {
    const customerData = { isBilling: true };
    try {
      const updatedCustomer = await CustomerModel.updateCustomer(
        req.params.id,
        customerData
      );
      res.status(200).json(updatedCustomer);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };
}

export default CustomerController;
