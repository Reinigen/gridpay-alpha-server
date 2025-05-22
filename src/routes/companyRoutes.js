import express from "express";
import CompanyController from "../controllers/companyController.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", verifyToken, CompanyController.getAllCompanies);
router.get("/company/:id", verifyToken, CompanyController.getCompanyById);
router.get("/owner", verifyToken, CompanyController.getCompanyByOwnerId);
router.get("/employee", verifyToken, CompanyController.getCompanyByEmployeeId);
router.post("/", verifyToken, CompanyController.createCompany);
router.put(
  "/:id/update-details",
  verifyToken,
  CompanyController.updateCompanyDetails
);
router.put(
  "/:id/update-owner",
  verifyToken,
  CompanyController.updateCompanyOwner
);
router.put(
  "/:id/update-admin",
  verifyToken,
  CompanyController.updateCompanyAdmin
);
router.delete("/:id", verifyToken, CompanyController.deleteCompany);

export default router;
