import express from "express";
import PaymentController from "../controllers/paymentController.js";

const router = express.Router();

router.get("/", PaymentController.getAllPayments);
router.get(
  "/get-payments/:customerId",
  PaymentController.getPaymentsByCustomerId
);
router.get(
  "/get-payments/:customerId/:paymentMonth",
  PaymentController.getPaymentsByCustomerIdAndMonth
);
router.post("/add-payment", PaymentController.addPayment);
router.put(
  "/update-payment/:customerId/:paymentMonth",
  PaymentController.updatePayment
);

router.delete(
  "/delete-payment/:customerId/:paymentMonth",
  PaymentController.deletePayment
);
export default router;
