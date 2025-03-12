// Dependencies and modules
import express from "express"; // Need this for setting up the API in general
import cors from "cors"; // Need this to connect to the frontend
import dotenv from "dotenv";

import pool from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import { errorHandler } from "./middlewares/handlers.js";
import createUserTable from "./data/createUserTable.js";

// Env Setup
dotenv.config();

// Creating the app
const app = express();
const port = process.env.PORT || 3001;

// [Middlewares]
// Express Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors setup for connecting to the frontend
const corsOptions = {
  origin: ["http://localhost:8000"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//Routes Middleware

app.use("/users", userRoutes);
app.use("/companies", companyRoutes);
app.use("/customers", customerRoutes);

app.use(errorHandler);

// Create table before starting table
createUserTable();

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
