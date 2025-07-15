CREATE TABLE service_library (
    service_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    estimated_material_cost DECIMAL(10, 2),
    estimated_labor_cost DECIMAL(10, 2)
);