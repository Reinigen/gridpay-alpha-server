import { knexInstance } from "../config/db.js";
class Company {
  static getAllCompaniesService = async () => {
    const companies = await knexInstance.select("*").from("company");
    return companies;
  };
  static getCompanyByIdService = async (companyId) => {
    const company = await knexInstance
      .select("*")
      .from("company")
      .where("companyId", companyId)
      .first();
    return company;
  };
  static createCompanyService = async (
    companyId,
    companyName,
    address,
    customerId,
    meterId,
    invoiceId,
    paymentId
  ) => {
    const newCompany = await knexInstance("company")
      .insert({
        companyId: companyId,
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

  static updateCompanyDetailsService = async (company_data, company_id) => {
    const updatedCompany = await knexInstance("company")
      .where("company_id", company_id)
      .update(company_data)
      .returning("*");
    return updatedCompany[0];
  };

  static deleteCompanyService = async (company_id) => {
    const deletedCompany = await knexInstance("company")
      .where("company_id", company_id)
      .del()
      .returning("*");
    return deletedCompany[0];
  };
}

export default Company;
