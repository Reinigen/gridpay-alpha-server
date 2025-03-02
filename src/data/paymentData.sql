CREATE TABLE IF NOT EXISTS payment (
    payment_id SERIAL PRIMARY KEY,
    customer_id INT FOREIGN KEY REFERENCES customer(customer_id),
    billing_month date NOT NULL,
    total_payment int NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)