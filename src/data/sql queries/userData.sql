CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    customer_id VARCHAR(100) UNIQUE NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    isAdmin BOOLEAN NOT NULL,
    mobileNo INT NOT NULL,
    company_id INT,
    created_at TIMESTAMP DEFAULT NOW()
)