CREATE TABLE IF NOT EXISTS meter (
    meter_id SERIAL PRIMARY KEY,
    meter_reading INT FOREIGN KEY REFERENCES meter_reading(meter_reading_id),
    address VARCHAR(100) NOT NULL
)