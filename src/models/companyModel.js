import { knexInstance } from "../config/db.js";
class CompanyModel {
  static getAllCompanies = async () => {
    const companies = await knexInstance.select("*").from("company");
    return companies;
  };
  static getCompanyById = async (companyId) => {
    const company = await knexInstance
      .select("*")
      .from("company")
      .where("companyId", companyId)
      .first();
    return company;
  };
  static createCompany = async (
    companyName,
    address,
    customerId,
    meterId,
    invoiceId,
    paymentId
  ) => {
    const newCompany = await knexInstance("company")
      .insert({
        companyName: companyName,
        address: address,
        customerId: customerId,
        meterId: meterId,
        invoiceId: invoiceId,
        paymentId: paymentId,
      })
      .returning("*");
    return newCompany[0];
  };

  static updateCompany = async (companyId, companyData) => {
    const updatedCompany = await knexInstance("company")
      .where("companyId", companyId)
      .update(companyData)
      .returning("*");
    return updatedCompany[0];
  };

  static deleteCompany = async (companyId) => {
    const deletedCompany = await knexInstance("company")
      .where("companyId", companyId)
      .del()
      .returning("*");
    return deletedCompany[0];
  };
}

export default CompanyModel;
