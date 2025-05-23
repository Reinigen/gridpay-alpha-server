import express from "express";
import CustomerController from "../controllers/customerController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/addCustomer", CustomerController.addCustomer);
router.get(
  "/:companyId",
  verifyToken,
  CustomerController.getAllCompanyCustomers
);
router.get("/customer/:id", verifyToken, CustomerController.getCustomerById);
router.put(
  "/update-customer-details/:id",
  verifyToken,
  CustomerController.updateCustomerDetails
);
router.put(
  "/update-to-senior/:id",
  verifyToken,
  CustomerController.updateToSenior
);
router.put(
  "/update-to-status/:id",
  verifyToken,
  CustomerController.updateToStatus
);

export default router;
