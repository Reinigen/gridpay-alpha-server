import { knexInstance } from "../config/db.js";
class Company {
  static getAllCompaniesService = async () => {
    const companies = await knexInstance.select("*").from("company");
    return companies;
  };
  static getCompanyByIdService = async (id) => {
    const company = await knexInstance
      .select("*")
      .from("company")
      .where("company_id", id)
      .first();
    return company;
  };
  static createCompanyService = async (
    company_id,
    company_name,
    address,
    customers_id,
    meter_id,
    billing_id,
    payment_id
  ) => {
    const newCompany = await knexInstance("company")
      .insert({
        company_id: company_id,
        company_name: company_name,
        address: address,
        customers_id: customers_id,
        meter_id: meter_id,
        billing_id: billing_id,
        payment_id: payment_id,
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
