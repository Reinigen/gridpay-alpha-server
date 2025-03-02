CREATE TABLE IF NOT EXISTS bill (
    billing_id SERIAL PRIMARY KEY,
    customer_id INT FOREIGN KEY REFERENCES customer(customer_id),
    meter_reading_id INT FOREIGN KEY REFERENCES meter_reading(meter_reading_id),
    billing_month date NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)