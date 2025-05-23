import { errorHandler, responseHandler } from "../middlewares/handlers.js";
import CustomerModel from "../models/customerModel.js";

class CustomerController {
  static getAllCompanyCustomers = async (req, res, next) => {
    try {
      const allCustomers = await CustomerModel.getAllCompanyCustomers(
        req.params.companyId
      );
      if (!allCustomers || allCustomers.length === 0) {
        return res.status(404).json({ message: "No customers found" });
      }
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
    const { customerId, companyId, customerName, address } = req.body;
    const uniqueAddress = await CustomerModel.getCustomerByAddress(address);
    const uniqueId = await CustomerModel.getCustomerById(customerId);

    try {
      if (uniqueId) {
        return res
          .status(400)
          .json({ message: "Customer with this id already exists" });
      }
      if (uniqueAddress && uniqueAddress.status === "Active") {
        return res
          .status(400)
          .json({ message: "Customer with this address already exists" });
      }

      if (!uniqueAddress && !uniqueId) {
        const newCustomer = await CustomerModel.addCustomer(
          customerId,
          companyId,
          customerName,
          address
        );
        return responseHandler(
          res,
          201,
          "Customer added successfully",
          newCustomer
        );
      }
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };

  static updateCustomerDetails = async (req, res, next) => {
    const id = req.params.id;
    const { customerName, address } = req.body;
    const uniqueAddress = await CustomerModel.getCustomerByAddress(address);
    const customerData = {
      customerName: customerName,
      address: address,
    };

    try {
      if (uniqueAddress && uniqueAddress.status === "Active") {
        return res
          .status(400)
          .json({ message: "Customer with this address already exists" });
      }
      if (!uniqueAddress) {
        const updatedCustomer = await CustomerModel.updateCustomer(
          id,
          customerData
        );
        res.status(200).json(updatedCustomer);
      }
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

  static updateToStatus = async (req, res, next) => {
    const { status } = req.body;
    const statuses = [
      "Active",
      "Disconnected",
      "Trial",
      "Applicant",
      "End of Life",
      "Cancelled",
    ];
    let customerData = {};
    if (!statuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    } else {
      customerData = { status: status };
    }

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
