CREATE TABLE documents (
    document_id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES jobs(job_id),
    document_type VARCHAR(50),
    file_path VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);