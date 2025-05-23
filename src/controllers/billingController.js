import { errorHandler } from "../middlewares/handlers.js";
import BillingModel from "../models/billingModel.js";
import MeterReadingModel from "../models/meterReadingModel.js";
import CustomerModel from "../models/customerModel.js";
import MeterModel from "../models/meterModel.js";

//define customizable calculator
const calculatePrice = (pricingSettings, usage) => {
  const { tiered, tiers, rates, tax } = pricingSettings;
  let price = 0;
  let rate = 0;
  console.log(`Usage: ${usage}`);
  console.log(`Starting Price: ${price}`);
  console.log(`Starting Rate: ${rate}`);
  if (!tiered) {
    price = usage * rates[0];
    console.log(`Pre taxed price: ${price}`);
    price += price * tax;
    console.log(`Ending price not tiered: ${price}`);
    return price;
  }
  if (tiered) {
    for (let i = 0; i < tiers.length; i++) {
      if (i === 0 && usage <= tiers[0]) {
        rate = rates[0];
        break;
      }
      if (usage > tiers[i - 1] && usage <= tiers[i]) {
        rate = rates[i];
      }
    }
    if (usage <= tiers[0]) {
      console.log("Pinging");
      price = rate;
    }
    if (usage >= tiers[0]) {
      price = usage * rate;
      console.log(`Pre taxed price: ${price}`);
      price += price * tax;
    }
    console.log(`Ending price access tiered: ${price}`);
    return price;
  }
};
// define calculator amount due function
const amountDue = (usage, customerId) => {
  let amount = 0;
  if (usage < 0) {
    const err = {
      status: 400,
      message: `Usage for customer:${customerId} cannot be negative`,
    };
    return errorHandler(err, req, res, next);
  }

  // min Bracket, max Bracket, rate
  if (usage <= 10) {
    amount = 350;
  } else if (usage > 10 && usage <= 20) {
    amount = usage * 38.5;
  } else if (usage > 20 && usage <= 30) {
    amount = usage * 42;
  } else if (usage > 30 && usage <= 50) {
    amount = usage * 45.5;
  } else if (usage > 50 && usage <= 70) {
    amount = usage * 49;
  } else if (usage > 70 && usage <= 100) {
    amount = usage * 52.5;
  } else {
    amount = usage * 56;
  }
  return amount;
};

class BillingController {
  static getAllBills = async (req, res, next) => {
    try {
      const allBills = await BillingModel.getAllBills();
      res.status(200).json(allBills);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
  static getBillByCompanyId = async (req, res, next) => {
    try {
      const companyBills = await BillingModel.getBillsByCompanyId(
        req.params.companyId
      );
      res.status(200).json(companyBills);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
  static getBillsByCompanyIdAndMonth = async (req, res, next) => {
    const { companyId, billingMonth } = req.params;
    try {
      const companyBillForMonth =
        await BillingModel.getBillsByCompanyIdAndMonth(companyId, billingMonth);
      res.status(200).json(companyBillForMonth);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
  static getBillsByCustomerId = async (req, res, next) => {
    try {
      const customerBills = await BillingModel.getBillsByCustomerId(
        req.params.customerId
      );
      res.status(200).json(customerBills);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
  static getBillsByCustomerIdAndMonth = async (req, res, next) => {
    const { customerId, billingMonth } = req.params;
    try {
      const customerBillForMonth =
        await BillingModel.getBillsByCustomerIdAndMonth(
          customerId,
          billingMonth
        );
      res.status(200).json(customerBillForMonth);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
  static addAllBills = async (req, res, next) => {
    const { billingMonth, previousMonth } = req.body;
    const customers = await CustomerModel.getAllCompanyCustomers(
      req.params.companyId
    );
    const allBills = await customers.map(async (customer) => {
      const currentReading =
        await MeterReadingModel.getMeterReadingByIdAndMonth(
          customer.customerId,
          billingMonth
        );
      const previousReading =
        await MeterReadingModel.getMeterReadingByIdAndMonth(
          customer.customerId,
          previousMonth
        );
      const customerId = customer.customerId;
      const meterReadingId = currentReading.meterReadingId;
      console.log(
        `Previous Reading: ${previousReading}, Current Reading: ${currentReading}`
      );

      try {
        const calculatedAmountDue = amountDue(usage, customerId);
        const newBill = await BillingModel.addInvoice(
          customerId,
          meterReadingId,
          calculatedAmountDue,
          billingMonth
        );
        res.status(201).json(newBill);
      } catch (err) {
        errorHandler(err, req, res, next);
      }
    });
    return allBills;
  };
}

export default BillingController;
