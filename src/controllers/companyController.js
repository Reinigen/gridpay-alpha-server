import { errorHandler, responseHandler } from "../middlewares/handlers.js";
import CompanyModel from "../models/companyModel.js";
import UserModel from "../models/userModel.js";

class CompanyController {
  static createCompany = async (req, res, next) => {
    const { companyName, employee, address, pricingPlan } = req.body;
    const userId = req.user.id;
    console.log(req.body);
    if (
      companyName.length > 100 ||
      address.length > 100 ||
      pricingPlan.length > 100
    ) {
      return responseHandler(
        res,
        400,
        "Company name should be less than 100 characters"
      );
    }
    if (!userId) {
      return responseHandler(
        res,
        400,
        "Need a Company Owner to create a company"
      );
    }
    if (!pricingPlan.tiers || !pricingPlan.rates || !pricingPlan.tax) {
      responseHandler(
        res,
        400,
        "Pricing plan should contain tiered(boolean), tiers(array), rates(array) and tax(percentage)"
      );
    }
    if (typeof pricingPlan.tiered !== "boolean") {
      responseHandler(res, 400, "Pricing plan should contain tiered(boolean)");
    }
    if (!Array.isArray(pricingPlan.rates)) {
      responseHandler(res, 400, "Rates should be an array");
    }
    if (pricingPlan.tiered === true && !pricingPlan.tiers) {
      responseHandler(res, 400, "Tiers should be an array");
    }
    try {
      let companyData = {
        companyName: companyName,
        address: address,
        companyOwner: userId,
        pricingPlan: pricingPlan,
        employee: employee,
      };
      const companyNameExists = await CompanyModel.getCompanyByName(
        companyName
      );
      const companyAddressExists = await CompanyModel.getCompanyByAddress(
        address
      );
      if (companyNameExists || companyAddressExists)
        return responseHandler(
          res,
          400,
          `Company ${
            companyNameExists ? "with this name" : "with this address"
          } already exists`
        );
      else {
        const newCompany = await CompanyModel.createCompany(companyData);
        responseHandler(res, 201, "Company created successfully", newCompany);
      }
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

  static getCompanyByOwnerId = async (req, res, next) => {
    const userId = req.user.id;
    try {
      if (typeof userId !== "number")
        return responseHandler(res, 404, "User not found");
      const company = await CompanyModel.getCompanyByOwnerId(userId);
      if (!company) return responseHandler(res, 404, "Company not found");
      responseHandler(res, 200, "Company fetched successfully", company);
    } catch (err) {
      next(errorHandler(err, req, res, next));
    }
  };

  static getCompanyByEmployeeId = async (req, res, next) => {
    const userId = req.user.id;
    console.log(req.user.id);
    console.log(userId);
    try {
      if (typeof userId !== "number")
        return responseHandler(res, 404, "User not found");
      const company = await CompanyModel.getCompanyByEmployeeId(userId);
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
