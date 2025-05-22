import db from "../config/db.js";
const { knexInstance } = db;

class PaymentModel {
  static getAllPayments = async () => {
    const payments = await knexInstance.select("*").from("payment");
    return payments;
  };
  static getPaymentsByCustomerId = async (customerId) => {
    const payments = await knexInstance
      .select("*")
      .from("payment")
      .where("customerId", customerId);
    return payments;
  };
  static getPaymentsByCustomerIdAndMonth = async (customerId, paymentMonth) => {
    const payments = await knexInstance
      .select("*")
      .from("payment")
      .where("customerId", customerId && "paymentMonth", paymentMonth);
    return payments;
  };
  static addPayment = async (customerId, paymentMonth, amountPaid) => {
    const newPayment = await knexInstance
      .insert({
        customerId: customerId,
        paymentMonth: paymentMonth,
        amountPaid: amountPaid,
      })
      .returning("*");
    return newPayment;
  };
  static updatePayment = async (customerId, paymentMonth, amountPaid) => {
    const updatedPayment = await knexInstance("payment")
      .where("customerId", customerId && "paymentMonth", paymentMonth)
      .update({ amountPaid: amountPaid });
    return updatedPayment;
  };
  static deletePayment = async (customerId, paymentMonth) => {
    const deletedPayment = await knexInstance("payment")
      .where("customerId", customerId && "paymentMonth", paymentMonth)
      .delete();
    return deletedPayment;
  };
}

export default PaymentModel;
