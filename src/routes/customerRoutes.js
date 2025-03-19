import express from "express";
import CustomerController from "../controllers/customerController.js";

const router = express.Router();

router.post("/addCustomer", CustomerController.addCustomer);
router.get("/:companyId", CustomerController.getAllCompanyCustomers);
router.get("/:id", CustomerController.getCustomerById);
router.put("/update-customer-details/:id", CustomerController.updateCustomer);
router.put("/update-to-senior/:id", CustomerController.updateToSenior);
router.put("/update-to-billing/:id", CustomerController.updateToBilling);
router.delete("/:id", CustomerController.deleteCustomer);

export default router;
