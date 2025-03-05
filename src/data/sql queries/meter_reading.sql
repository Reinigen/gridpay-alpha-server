CREATE TABLE IF NOT EXISTS meter_reading (
    meter_reading_id SERIAL PRIMARY KEY,
    customer_id INT FOREIGN KEY REFERENCES customer(customer_id),
    reading_month date NOT NULL,
    reading int NOT NULL,
    reading_image VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT NOW()
)