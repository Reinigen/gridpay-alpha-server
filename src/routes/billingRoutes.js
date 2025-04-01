import express from "express";
import BillingController from "../controllers/billingController.js";

const router = express.Router();

router.get("/", BillingController.getAllBills);
router.get("/:companyId", BillingController.getBillByCompanyId);
router.get(
  "/:companyId/:billingMonth",
  BillingController.getBillsByCompanyIdAndMonth
);
router.get("/get-bills/:customerId", BillingController.getBillsByCustomerId);
router.get(
  "/get-bills/:customerId/:billingMonth",
  BillingController.getBillsByCustomerIdAndMonth
);
router.post("/add-bill/:companyId", BillingController.addAllBills);

export default router;
