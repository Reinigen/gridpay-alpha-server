import { errorHandler, responseHandler } from "../middlewares/errorHandler.js";
import CompanyModel from "../models/companyModel.js";

export const createCompany = async (req, res, next) => {
  const { companyName, address, customersId, meterId, billingId, paymentId } =
    req.body;
  try {
    const newCompany = await CompanyModel.createCompany({
      companyName: companyName,
      address: address,
      customersId: customersId,
      meterId: meterId,
      billingId: billingId,
      paymentId: paymentId,
    });
    responseHandler(res, 201, "Company created successfully", newCompany);
  } catch (err) {
    next(errorHandler(err));
  }
};

export const getAllCompanies = async (req, res, next) => {
  try {
    const companies = await CompanyModel.getAllCompanies();
    responseHandler(res, 200, "Companies fetched successfully", companies);
  } catch (err) {
    next(errorHandler(err));
  }
};

export const getCompanyById = async (req, res, next) => {
  try {
    const company = await CompanyModel.getCompanyById(req.params.id);
    if (!company) return responseHandler(res, 404, "Company not found");
    responseHandler(res, 200, "Company fetched successfully", company);
  } catch (err) {
    next(errorHandler(err));
  }
};

export const updateCompany = async (req, res, next) => {
  const { companyName, address, customerId, meterId, invoiceId, paymentId } =
    req.body;
  const companyData = {
    companyName: companyName,
    address: address,
    customerId: customerId,
    meterId: meterId,
    invoiceId: invoiceId,
    paymentId: paymentId,
  };
  try {
    const updatedCompany = await CompanyModel.updateCompany(
      req.params.id,
      companyData
    );
    if (!updatedCompany) return responseHandler(res, 404, "Company not found");
    responseHandler(res, 200, "Company updated successfully", updatedCompany);
  } catch (err) {
    next(errorHandler(err));
  }
};

export const deleteCompany = async (req, res, next) => {
  try {
    const deletedCompany = await CompanyModel.deleteCompany(req.params.id);
    if (!deletedCompany) return responseHandler(res, 404, "Company not found");
    responseHandler(res, 200, "Company deleted successfully", deletedCompany);
  } catch (err) {
    next(errorHandler(err));
  }
};
