import knexInstance from "../config/db.js";

class BillingModel {
  static getAllBills = async () => {
    const allBills = await knexInstance.select("*").from("bill");
    return allBills;
  };
  static getBillsByCompanyId = async (companyId) => {
    const invoices = await knexInstance
      .select("*")
      .from("bill")
      .where("companyId", companyId);
    return invoices;
  };
  static getBillsByCompanyIdAndMonth = async (companyId, billingMonth) => {
    const invoices = await knexInstance
      .select("*")
      .from("bill")
      .where("companyId", companyId && "billingMonth", billingMonth);
    return invoices;
  };
  static getBillsByCustomerId = async (customerId) => {
    const invoices = await knexInstance
      .select("*")
      .from("bill")
      .where("customerId", customerId);
    return invoices;
  };
  static getMeterReadingByCustomerIdAndMonth = async (
    customerId,
    billingMonth
  ) => {
    const invoices = await knexInstance
      .select("*")
      .from("bill")
      .where("customerId", customerId && "billingMonth", billingMonth);
    return invoices;
  };

  static addInvoice = async (
    customerId,
    meterReadingId,
    amountDue,
    billingMonth
  ) => {
    const newInvoice = await knexInstance
      .insert({
        customerId: customerId,
        meterReadingId: meterReadingId,
        amountDue: amountDue,
        billingMonth: billingMonth,
      })
      .returning("*");
    return newInvoice;
  };

  static editInvoice = async (invoiceId, amountDue) => {
    const editedInvoice = await knexInstance("bill")
      .where("invoiceId", invoiceId)
      .update({ amountDue: amountDue })
      .returning("*");
    return editedInvoice;
  };
}

export default BillingModel;
