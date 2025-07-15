CREATE TABLE jobs (
    job_id SERIAL PRIMARY KEY,
    client_id INT REFERENCES clients(client_id),
    title VARCHAR(255),
    description TEXT,
    status VARCHAR(50),
    total_amount DECIMAL(10, 2)
);