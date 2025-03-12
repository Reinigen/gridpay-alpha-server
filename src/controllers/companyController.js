import { errorHandler, responseHandler } from "../middlewares/handlers.js";
import CompanyModel from "../models/companyModel.js";
import UserModel from "../models/userModel.js";

class CompanyController {
  static createCompany = async (req, res, next) => {
    const { companyName, address, customersId, meterId, billingId, paymentId } =
      req.body;
    const { userId } = req.user;
    try {
      const newCompany = await CompanyModel.createCompany({
        companyName: companyName,
        address: address,
        customersId: customersId,
        companyOwner: userId,
        meterId: meterId,
        billingId: billingId,
        paymentId: paymentId,
      });
      responseHandler(res, 201, "Company created successfully", newCompany);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };

  static getAllCompanies = async (req, res, next) => {
    try {
      const companies = await CompanyModel.getAllCompanies();
      responseHandler(res, 200, "Companies fetched successfully", companies);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };

  static getCompanyById = async (req, res, next) => {
    try {
      const company = await CompanyModel.getCompanyById(req.params.id);
      if (!company) return responseHandler(res, 404, "Company not found");
      responseHandler(res, 200, "Company fetched successfully", company);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };

  static updateCompanyDetails = async (req, res, next) => {
    const { companyName, address } = req.body;
    const companyData = {
      companyName: companyName,
      address: address,
    };
    try {
      const updatedCompany = await CompanyModel.updateCompany(
        req.params.id,
        companyData
      );
      if (!updatedCompany)
        return responseHandler(res, 404, "Company not found");
      responseHandler(res, 200, "Company updated successfully", updatedCompany);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };

  static updateCompanyOwner = async (req, res, next) => {
    const { companyOwner } = req.body;
    const companyData = {
      companyOwner: companyOwner,
    };
    try {
      const company = await CompanyModel.getCompanyById(req.params.id);
      if (!company) return responseHandler(res, 404, "Company not found");
      // get users
      const newOwner = await UserModel.getUserById(companyOwner);
      if (!newOwner) {
        return responseHandler(res, 404, "User not found");
      }
      if (company.companyOwner === newOwner.userId)
        return responseHandler(
          res,
          400,
          "New owner cannot be the same as the current owner"
        );
      const updatedCompany = await CompanyModel.updateCompany(
        req.params.id,
        companyData
      );
      if (!updatedCompany)
        return responseHandler(res, 404, "Company not found");
      responseHandler(res, 200, "Company updated successfully", updatedCompany);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };
  static updateCompanyAdmin = async (req, res, next) => {
    const { companyAdmin } = req.body;
    const companyData = {
      companyAdmin: companyAdmin,
    };
    try {
      const company = await CompanyModel.getCompanyById(req.params.id);
      if (!company) return responseHandler(res, 404, "Company not found");
      // get users
      const newAdmin = await UserModel.getUserById(companyAdmin);
      if (!newAdmin) {
        return responseHandler(res, 404, "User not found");
      }
      if (company.companyAdmin === newAdmin.userId)
        return responseHandler(
          res,
          400,
          "New admin cannot be the same as a current admin"
        );
      const updatedCompany = await CompanyModel.updateCompany(
        req.params.id,
        companyData
      );
      if (!updatedCompany)
        return responseHandler(res, 404, "Company not found");
      responseHandler(res, 200, "Admin Added successfully", updatedCompany);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };

  static deleteCompany = async (req, res, next) => {
    try {
      const deletedCompany = await CompanyModel.deleteCompany(req.params.id);
      if (!deletedCompany)
        return responseHandler(res, 404, "Company not found");
      responseHandler(res, 200, "Company deleted successfully", deletedCompany);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };
}

export default CompanyController;
