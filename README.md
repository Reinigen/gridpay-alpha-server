# Utility Management System

## Overview

This project is a **Utility Management System** designed to manage customers, meters, meter readings, billing, and payments efficiently. It allows utility companies to keep track of user data, generate bills, and process payments. The system is structured around the provided ERD (Entity-Relationship Diagram).

# GridPay Backend API

This is the backend to handle the functions for the GridPay Utility Billings App

- **Project Name**: GridPay
- **Version**: 1.0
- **Date**: March 2, 2025
- **Author(s)**: Red Crystal

---

## Features

### **1. User Management**

- **User Registration and Login**:
  - Allow users to register with their details (e.g., username, email, password).
  - Implement role-based access control (e.g., Admin, Utility Staff).
- **Profile Management**:
  - Users can update their personal information.
- **Password Management**:
  - Options to reset or change passwords.

---

### **2. Customer Management**

- **Customer Information**:
  - Add, edit, or delete customer details.
  - View a list of customers and their associated information.
- **Search and Filter**:
  - Search for customers by name, address, or unique identifier.

---

### **3. Utility Company Management**

- **Company Information**:
  - Manage utility company details, including company name, address, and phone number.
- **Association with Customers**:
  - Link customers to specific utility companies.

---

### **4. Meter Management**

- **Meter Information**:
  - Add, edit, or delete meter records.
  - Associate meters with specific customers.
- **Meter Readings**:
  - Record and store periodic meter readings.
  - Upload images of the meter for verification.

---

### **5. Billing and Payments**

- **Billing System**:
  - Generate monthly bills based on meter readings.
  - Associate bills with customers and their meter readings.
- **Payment Processing**:
  - Record payments against bills.
  - Track payment statuses (paid, pending, overdue).
- **Billing History**:
  - Allow customers or administrators to view historical billing and payment records.

---

### **6. Reporting and Analytics**

- **Reports for Admins**:
  - Generate reports for total revenue, overdue payments, and consumption statistics.
- **Customer Usage**:
  - Provide detailed usage history for customers.
- **Notifications**:
  - Notify customers about pending bills or upcoming meter readings.

---

### **7. Search and Filtering Features**

- Search for specific data, such as:
  - A customer by name or ID.
  - Bills by billing month or status.
  - Payments by date or customer.

---

### **8. Integration with External Systems**

- **API for Meter Reading Uploads**:
  - Provide an API endpoint to upload readings automatically (e.g., IoT meters).
- **Payment Gateway**:
  - Integrate with online payment providers for seamless transactions.

---

### **9. Administrative Features**

- **Dashboard**:
  - Show an overview of key metrics (e.g., total customers, revenue, pending payments).
- **Audit Logs**:
  - Track changes made by users (e.g., added/modified customer data or meter readings).

---

### **10. Security Features**

- Secure storage of user credentials (e.g., hashed passwords).
- Role-based access controls to restrict certain features to admins or utility company staff.

---

## Getting Started

### Prerequisites

- **Node.js** (version >= 14.x)
- **PostGreSQL** Database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/utility-management-system.git
   ```
2. Navigate to the project directory:
   ```bash
   cd utility-management-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure the database connection in `config/db.js`.

### Running the Application

1. Start the server:
   ```bash
   npm start
   ```
2. Access the API at `http://localhost:3000`.

---

## API Endpoints

### User Management

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Login a user.

### Customer Management

- `GET /api/customers`: Get all customers.
- `POST /api/customers`: Add a new customer.
- `PUT /api/customers/:id`: Update a customer.
- `DELETE /api/customers/:id`: Delete a customer.

### Meter Management

- `GET /api/meters`: Get all meters.
- `POST /api/meters`: Add a new meter.
- `GET /api/meters/readings`: Get all meter readings.
- `POST /api/meters/readings`: Record a meter reading.

### Billing and Payments

- `GET /api/bills`: Get all bills.
- `POST /api/bills`: Generate bills for all customers.
- `POST /api/payments`: Record a payment.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## License

This project is licensed under the MIT License.
