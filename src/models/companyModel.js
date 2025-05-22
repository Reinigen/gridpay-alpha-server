import db from "../config/db.js";
const { knexInstance } = db;

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
  static getCompanyByOwnerId = async (companyOwner) => {
    const company = await knexInstance
      .select("*")
      .from("company")
      .where("companyOwner", companyOwner)
      .first();
    return company;
  };
  static getCompanyByEmployeeId = async (employee) => {
    const company = await knexInstance
      .select("*")
      .from("company")
      .where("employee", employee)
      .first();
    return company;
  };
  static createCompany = async (companyData) => {
    const newCompany = await knexInstance("company")
      .insert({
        companyName: companyData.companyName,
        address: companyData.address,
        companyOwner: companyData.companyOwner,
        pricingPlan: companyData.pricingPlan,
        employee: companyData.employee,
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
