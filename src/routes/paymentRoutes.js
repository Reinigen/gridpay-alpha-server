import express from "express";
import PaymentController from "../controllers/paymentController.js";

const router = express.Router();

router.get("/", PaymentController.getAllPayments);
router.get(
  "/get-payments/:customerId",
  PaymentController.getPaymentsByCustomerId
);
router.get(
  "/get-bills/:customerId/:billingMonth",
  BillingController.getBillsByCustomerIdAndMonth
);
router.post("/add-bill", BillingController.addBill);

export default router;
