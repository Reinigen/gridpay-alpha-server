// Dependencies and modules
import express from "express"; // Need this for setting up the API in general
import cors from "cors"; // Need this to connect to the frontend
import dotenv from "dotenv";

import pool from "./src/config/db.js";
// import middlewares
import { errorHandler } from "./src/middlewares/handlers.js";

// import routes
import userRoutes from "./src/routes/userRoutes.js";
import companyRoutes from "./src/routes/companyRoutes.js";
import customerRoutes from "./src/routes/customerRoutes.js";
import meterRoutes from "./src/routes/meterRoutes.js";
import meterReadingsRoutes from "./src/routes/meterReadingRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import billsRoutes from "./src/routes/billingRoutes.js";

// Import Tables
import createUserTable from "./src/data/createUserTable.js";
import createPaymentTable from "./src/data/createPaymentTable.js";
import createMeterReadingTable from "./src/data/createMeterReadingTable.js";
import createCustomerTable from "./src/data/createCustomerTable.js";
import createCompanyTable from "./src/data/createCompanyTable.js";
import createMeterTable from "./src/data/createMeterTable.js";
import createBillTable from "./src/data/createBillTable.js";

// Env Setup
dotenv.config();

// Creating the app
const app = express();
// const port = process.env.PORT || 3001;

// [Middlewares]
// Express Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors setup for connecting to the frontend
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//Routes Middleware

app.use("/users", userRoutes);
app.use("/companies", companyRoutes);
app.use("/customers", customerRoutes);
app.use("/meters", meterRoutes);
app.use("/meter-readings", meterReadingsRoutes);
app.use("/payments", paymentRoutes);
app.use("/bills", billsRoutes);

app.use(errorHandler);

// Create table before starting table
createUserTable();
createPaymentTable();
createCompanyTable();
createCustomerTable();
createBillTable();
createMeterTable();
createMeterReadingTable();

// // [Server Connection]
// // Testing POSTGRES Connection
// app.get("/", async (req, res) => {
//   console.log(pool);
//   const result = await pool.query("SELECT current_database()");
//   console.log(result);
//   res.send(`The database name is: ${result.rows[0].current_database}`);
// });

// Express Connection

app.listen(process.env.PORT || 4000, () => {
  console.log(`API is now online on port ${process.env.PORT || 4000}`);
});

export default app;
