ho# Bobby-Vision Development Log

## Placeholders and Refinements Needed

- **`pricingService.js` - Historical Data Relevance:** The current historical data selection uses service ID matching, `pg_trgm` text similarity, and estimated square footage. Further refinement could include:
    - More sophisticated weighting of relevance factors (service IDs, text similarity, size).
    - Implementing clustering or categorization of historical jobs for better context selection.
    - Adding a feedback loop for Bobby's input on prediction accuracy to refine relevance or a dedicated ML model.
- **`services/supplierService.js`:** Currently uses simulated data. Needs integration with real external supplier APIs (e.g., Home Depot, Lowe's, ABC Supply) for real-time availability, pricing, and ordering. This is a significant integration effort.
- **`services/nlpService.js`:** Basic implementation using a prompt to Gemini for job detail extraction. Could be improved with more sophisticated prompt engineering, few-shot examples, or fine-tuning if needed for better accuracy in extracting details from Bobby's specific language patterns.
- **`services/analysisService.js` - Photo Analysis:** Basic structure is in place with a placeholder for Gemini vision model interaction. Requires integration with the `gemini-2.5-flash` API and refining prompts for specific photo analysis tasks (e.g., identifying damage types).
- **`services/analysisService.js` - Document Analysis:** The `analyzeDocument` function is a placeholder and needs to be implemented to extract text and structure from document images, potentially using OCR in conjunction with a vision model.
- **`services/emailService.js` - Actual Email Sending:** The `sendEmail` function is a placeholder that currently only logs email details. It needs to be implemented to send emails using Nodemailer and configured with actual email credentials or a sending service.
- **`services/itemizationService.js`:** Basic implementation using a prompt to Gemini and simplified service library data. Could be improved by providing more detailed service library information in the prompt (if token limits allow) and refining the prompt to handle variations in how services are described.
- **Testing:** Write unit, integration, and end-to-end tests for the backend and frontend.
- **Automated Email Drafting and Sending:** Basic structure is in place with placeholder sending. Needs full implementation and configuration.

## Completed Features/Modules

- **Comprehensive Error Handling:** Implemented a centralized error handling middleware and custom error classes for better error management and informative responses.
- **Authentication and Authorization:** Implemented token-based authentication using JWTs to secure API endpoints.
- **Initial Integration Tests:** Started writing integration tests for client and job modules, including setup for using a separate test database.

## Testing - Specific Tasks Remaining

- **Complete E2E Test Setup:** Finalize the E2E test environment setup, including:
  - Ensuring a dedicated test database is configured and used for E2E tests.
  - Implementing test data seeding and cleanup for E2E test runs.
  - Handling user authentication within E2E tests (logging in a test user).
- **Write Comprehensive E2E Test Cases:** Develop E2E tests that simulate core user workflows across the frontend and backend, such as creating a client and job, generating a proposal, etc.

- **REVISIT:** Review and potentially refine the prompts used for Gemini interactions in `backend/services/analysisService.js`, `backend/services/nlpService.js`, `backend/services/itemizationService.js`, and `backend/services/pricingService.js` to optimize performance and accuracy with the `@google/genai` library and the specific Gemini models used.
- **NOTE TO REMEMBER:** Ensure that any changes in the return format or behavior of the AI service functions (`analysisService.js`, `nlpService.js`, `itemizationService.js`, `pricingService.js`) after switching to `@google/genai` are reflected in the integration tests and any parts of the application that consume these services.
- **TODO:** Review and update unit tests (if they exist) and integration tests for `analysisService.js`, `nlpService.js`, `itemizationService.js`, and `pricingService.js` to ensure they correctly mock and interact with the `@google/genai` library and the updated service logic.
- **TODO:** Add more specific error handling in the AI service files (`backend/services/analysisService.js`, `backend/services/nlpService.js`, `backend/services/itemizationService.js`, `backend/services/pricingService.js`) to catch and handle specific error types that may be thrown by the `@google/genai` library.


- **Complete Integration Tests:** Write integration tests for all remaining backend data modules (documents, service library, materials).
- **Integration Tests for External APIs and Intelligence:** Write integration tests for endpoints that interact with external APIs (Google Maps, simulated suppliers) and the intelligence module (NLP, itemization, pricing, analysis). These will likely require mocking external API calls.
- **Database Setup and Teardown for Testing:** Implement robust scripts or use a library to handle test database connection, running migrations, seeding data, and cleaning up the database before and after tests.
- **Export Express App for Testing:** Modify `backend/server.js` to export the Express application instance so `supertest` can be used effectively in integration tests.
- **Unit Tests:** Continue writing unit tests for individual service functions, utility functions, and other backend components.

## Frontend Development - Specific Tasks Remaining

- **Build Essential Components for E2E Testing:** Develop core frontend components like the Login Page and a basic Dashboard/Client management page to enable initial E2E test coverage.
- **Implement Frontend-Backend Communication:** Set up the frontend to make API calls to the backend for authentication and data operations.
- **Complete Remaining Frontend Development:** Build the full user interface based on the UI/UX design, including remaining pages and components.

## Deployment - Specific Tasks Remaining

- **Set Up Deployment Pipelines and Infrastructure:** Configure the environment and processes for deploying the backend application.
## Backend - Specific Tasks Remaining

- **Refine Job Search Trigger:** Refine the trigger in `backend/database/migrations/add_search_column_to_jobs.sql` to potentially include service names associated with the job for better search relevance.
- **Backend Endpoints for Additional AI Features:** Add dedicated backend endpoints for document analysis and other AI features as they are fully implemented.

## Recent Points to Revisit/Refine

- **ASSUMPTION:** Using `@google/generative-ai` library initially in `backend/services/analysisService.js`. (Note: This is now a legacy library and will be replaced with `@google/genai`).
- **TODO:** Replace `@google/generative-ai` with `@google/genai` in `backend/services/analysisService.js` and other relevant files (`backend/services/nlpService.js`, `backend/services/itemizationService.js`, `backend/services/pricingService.js`). (Followed up in step 4, 5, 6 of the current task).
- **TODO:** Ensure `GEMINI_API_KEY` environment variable is set for AI service integrations in `backend/services/analysisService.js` (and potentially others).
- **TODO:** Handle the case where `GEMINI_API_KEY` environment variable is not set in `backend/services/analysisService.js` (and potentially others).
- **NOTE TO REMEMBER:** Add robust error handling in `backend/services/analysisService.js` for cases where the `GEMINI_API_KEY` is not set or invalid. Depending on application startup, this might require exiting or throwing an error.
- **REVISIT:** Adapt the image data handling in `backend/services/analysisService.js` based on how image data is received in the `/api/analyze-photo` endpoint and the requirements of the `@google/genai` library for sending image data. The current implementation is a placeholder.
- **PLACEHOLDER:** The `analyzePhoto` function in `backend/services/analysisService.js` currently returns raw text and an empty array for `suggestedServiceItems`. Needs implementation to process/parse Gemini's text response to extract structured suggestions. Ensure the parsing logic is robust and can handle variations in Gemini's output format.
- **TODO:** Implement the `analyzeDocument` function in `backend/services/analysisService.js` for document analysis (OCR, structure extraction).
- **TODO:** Implement the failed login test case in `cypress/e2e/auth.cy.js` once error message display is added to the frontend.
- **TODO:** Configure environment variables for email sending in `backend/services/emailService.js`: `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_SECURE`, `EMAIL_USER`, `EMAIL_PASS`, `BOB_PHONE_NUMBER`. This requires manual configuration.
- **ASSUMPTION:** The frontend Login Page will be accessible at the `/login` route for the E2E test (`cypress/e2e/auth.cy.js`).
- **PLACEHOLDER:** The successful login E2E test in `cypress/e2e/auth.cy.js` includes a placeholder assertion for redirection to a protected page (e.g., `/dashboard`). This requires implementing frontend redirection and route protection.
- **NOTE TO REMEMBER:** For E2E tests to run, both the backend and frontend development servers must be running simultaneously.
- **NOTE TO REMEMBER:** E2E tests will require a dedicated test database, potentially the same one used for integration tests, with necessary test data (like a test user for login) seeded before test runs.
- **TODO:** Set up test data seeding and cleanup specifically for E2E test runs.
- **TODO:** Implement robust handling of user authentication within E2E tests (e.g., logging in a test user before visiting protected pages).
- **PLACEHOLDER:** The initial `LoginPage.jsx` has basic inline styling. Refine styling using detailed Tailwind classes based on the UI/UX design later.
- **PLACEHOLDER:** The `.then()` and `.catch()` blocks in `LoginPage.jsx`'s `onSubmit` handler currently only log messages. Need to implement actual handling (e.g., storing JWT, redirection, displaying error messages).
- **REVISIT:** Review and potentially refactor the `cleanDatabase` function in `backend/__tests__/utils/testDatabase.js` to handle cleaning data from any new tables added during development.
- **NOTE TO REMEMBER:** The `testDatabase.js` helpers assume a migration file naming convention that allows alphabetical sorting to ensure correct execution order.