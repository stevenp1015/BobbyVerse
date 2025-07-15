-- 1. Enable the 'pg_trgm' extension if it's not already enabled.
-- This command requires superuser privileges.
CREATE EXTENSION IF NOT EXISTS pg_trgm;
-- 2. Add a new text column named 'search_document' to the 'jobs' table.
ALTER TABLE jobs
ADD COLUMN search_document text;
-- 3. Create a function to update the search_document column.
CREATE OR REPLACE FUNCTION update_job_search_document()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_document := NEW.title || ' ' || NEW.description;
    -- To include service names, you would need to join with the service_library table
    -- and concatenate service names here. This would require a more complex function.
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Create a trigger that calls the function before insert or update on the jobs table.
CREATE TRIGGER update_job_search_document_trigger
BEFORE INSERT OR UPDATE ON jobs
FOR EACH ROW
EXECUTE FUNCTION update_job_search_document();

-- Optionally, populate the new column for existing rows
-- Note: This update might take time for a large number of rows.
UPDATE jobs SET search_document = title || ' ' || description WHERE search_document IS NULL;