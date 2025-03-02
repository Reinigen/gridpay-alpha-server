CREATE TABLE IF NOT EXISTS customer (
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) UNIQUE NOT NULL,
    address VARCHAR(100) NOT NULL,
    customers_id INT NOT NULL,
    meter_id INT NOT NULL,
    billing_id INT NOT NULL,
    payment_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)