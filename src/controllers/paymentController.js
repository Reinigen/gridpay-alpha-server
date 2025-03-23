import { errorHandler } from "../middlewares/handlers.js";
import PaymentModel from "../models/paymentModel.js";

class PaymentController {
  static getAllPayments = async (req, res, next) => {
    try {
      const allPayments = await PaymentModel.getAllPayments();
      res.status(200).json(allPayments);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
  static getPaymentsByCustomerId = async (req, res, next) => {
    try {
      const customerPayments = await PaymentModel.getPaymentsByCustomerId(
        req.params.customerId
      );
      res.status(200).json(customerPayments);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
  static getPaymentsByCustomerIdAndMonth = async (req, res, next) => {
    const { customerId, paymentMonth } = req.params;
    try {
      const customerPaymentForMonth =
        await PaymentModel.getPaymentsByCustomerIdAndMonth(
          customerId,
          paymentMonth
        );
      res.status(200).json(customerPaymentForMonth);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
  static addPayment = async (req, res, next) => {
    const { customerId, paymentMonth, paymentAmount } = req.body;
    try {
      const newPayment = await PaymentModel.addPayment(
        customerId,
        paymentMonth,
        paymentAmount
      );
      return newPayment;
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
  static updatePayment = async (req, res, next) => {
    const { customerId, paymentMonth, paymentAmount } = req.body;
    try {
      const updatedPayment = await PaymentModel.updatePayment(
        customerId,
        paymentMonth,
        paymentAmount
      );
      return updatedPayment;
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
  static deletePayment = async (req, res, next) => {
    const { customerId, paymentMonth } = req.body;
    try {
      const deletedPayment = await PaymentModel.deletePayment(
        customerId,
        paymentMonth
      );
      return deletedPayment;
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
}

export default PaymentController;
