CREATE TABLE materials (
    material_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    unit_cost DECIMAL(10, 2),
    supplier_info TEXT
);