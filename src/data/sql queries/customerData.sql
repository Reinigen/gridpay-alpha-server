CREATE TABLE IF NOT EXISTS customer (
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) UNIQUE NOT NULL,
    address VARCHAR(100) NOT NULL,
    customers_id INT,
    meter_id INT,
    billing_id INT,
    payment_id INT,
    created_at TIMESTAMP DEFAULT NOW()
)