import express from "express";
import CompanyController from "../controllers/companyController.js";

const router = express.Router();

router.get("/", CompanyController.getAllCompanies);
router.get("/:id", CompanyController.getCompanyById);
router.post("/", CompanyController.createCompany);
router.put("/:id/update-details", CompanyController.updateCompanyDetails);
router.put("/:id/update-owner", CompanyController.updateCompanyOwner);
router.put("/:id/update-admin", CompanyController.updateCompanyAdmin);
router.delete("/:id", CompanyController.deleteCompany);

export default router;
