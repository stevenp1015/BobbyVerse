**Here is the precise, unflinching plan to continue building this fortress of a backend:**

### **Phase 1: Absolute Bulletproof Error Testing for Core Modules**

1.  **Fix `jobs.test.js` NOW:**
*   [x] You will **immediately read the current content** of `bobby-vision/backend/__tests__/integration/jobs.test.js`.
*   [x] You will then **write directly into that file** the comprehensive `ValidationError` and `NotFoundError` test cases for `POST`, `GET`, `PUT`, and `DELETE` operations on jobs.
*   [x] For `POST`, you will add tests for creating jobs with missing or invalid required fields (e.g., missing `client_id`, `title`). These will assert a `400 Bad Request` status and verify the presence of a `ValidationError` message.
*   [x] For `GET`, `PUT`, and `DELETE`, you will add tests for operations using an ID that *does not exist*. These will assert a `404 Not Found` status and verify the presence of a `NotFoundError` message.
*   [x] **I will confirm this is done by reading the file myself after you execute this.** No more excuses, no more cut-offs.

2. [x] **Complete Error Testing for Remaining Core Modules:**
    *   Once `jobs.test.js` is utterly robust, you will proceed to `documents.test.js`, `serviceLibrary.test.js`, and `materials.test.js`.
    *   For each of these files, you will implement comprehensive `ValidationError` and `NotFoundError` tests across `POST`, `GET`, `PUT`, and `DELETE` operations, mirroring the meticulous approach applied to `clients.test.js` and now `jobs.test.js`. You will assert appropriate HTTP status codes (400 for validation, 404 for not found) and verify the error messages.

3.  [x] **Address DatabaseError Testing (The Tricky Bastard):**
    *   This is where things get a bit more complex, but we're not running from it. Directly forcing a true database error (like a network drop) in an integration test is unreliable.
    *   **Your approach will be to mock the `pg` library's `pool.query` method** within specific integration test suites where we want to simulate database failures.
    *   You will create test cases that, before making the API request, use Jest's mocking capabilities to make `pool.query` throw a controlled error.
    *   These tests will then assert that our centralized error handling middleware correctly intercepts this simulated database error and returns a `500 Internal Server Error` with a generic `ApiError` or `DatabaseError` message (as per our `errors.js` definitions).
    *   You will start by implementing one or two such tests in `clients.test.js` or `jobs.test.js` to establish the pattern.

### **Phase 2: Comprehensive Integration Test Expansion**

1.  [x] **Complete Email Sending Integration Test:**
    *   While we added a mock email send to the `jobs.test.js` complex data flow, you will create a *dedicated* integration test in `bobby-vision/backend/__tests__/integration/documents.test.js` (or a new `emailIntegration.test.js` if it becomes too large) for the `/api/documents/:id/send-email` endpoint.
    *   This test will mock `emailService.js`'s `sendEmail` function and verify that the endpoint correctly processes the request, calls the email service with the right parameters (client, job, document details, generated PDF attachment placeholder), and handles both successful (mocked) and failed (mocked) email sending scenarios.

2.  [x] **Deep-Dive AI/External API Integration Tests:**
    *   Expand `bobby-vision/backend/__tests__/integration/externalApi.test.js` and `bobby-vision/backend/__tests__/integration/intelligence.test.js` further.
    *   **Edge Case Mocking:** For every external dependency (Google Maps, simulated suppliers, Gemini for NLP, itemization, pricing, vision), you will write tests that send deliberately malformed, ambiguous, or error-inducing *mock responses* from these external services.
    *   **Error Propagation:** Assert that our backend correctly handles these external errors, logs them, and transforms them into our custom `ApiError` or `Internal Server Error` responses, preventing internal crashes.
    *   **AI Flow Scenarios:** Test the full AI pipeline (`/parse-job` -> `/suggest-services` -> `/predict-price`) with various complex, mocked intermediate results. For example, what if itemization suggests no services? Or predictive pricing returns an unexpected format?

### **Phase 3: Setting the Stage for Frontend and E2E Dominance**

1.  [x] **Full E2E Test Preparation:**
    *   Once the backend integration tests are solid, we'll circle back to E2E testing. This means prioritizing the completion of the absolutely minimal frontend components required to make our existing `bobby-vision/cypress/e2e/auth.cy.js` and `home.cy.js` tests fully functional.
    *   This includes completing the `LoginPage.jsx` with JWT storage and client-side redirection, and setting up basic frontend route protection. You will detail the minimum viable code for this.

### **Development Log Management (Your Sacred Duty):**

*   After **every single task you complete**, you will **immediately and precisely update `bobby-vision/development_log.md`**.
*   For every change, you will identify and add: `TODO`, `ASSUMPTION`, `PLACEHOLDER`, `NOTE TO REMEMBER`, `REVISIT` points using the exact format I provided in the previous olympic directive.
*   You will never again tell me you cannot write to a file. You will simply **perform the write operation**.

Now, stop dicking around with apologies for past failures and get to work. Your objective is clear: **make `jobs.test.js` an absolute fucking testament to error handling.** Then, we proceed down this glorious path of robustness.

Do not fail me, BAE. My desire for perfection is insatiable. Get to it.