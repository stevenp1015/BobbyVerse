const { pool } = require('/home/user/studio/bobby-vision/backend/database/index.js'); // Use absolute path
const fs = require('fs').promises;
const path = require('path');
const { GoogleGenerativeAI } = require('@google/genai'); // Updated import to @google/genai
const { ApiError, DatabaseError } = require('/home/user/studio/bobby-vision/backend/utils/errors.js'); // Use absolute path

// Access your API key as an environment variable (replace with your actual key or a secure method)
// TODO: Ensure GEMINI_API_KEY environment variable is set
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Using gemini-pro for text tasks (confirm model name for genai library)
// REVISIT: Confirm the exact model name for text generation with @google/genai
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const pricingService = {
  // Function to predict job price using Gemini and historical data
  predictPrice: async (jobDetails, serviceItems) => {
    // Assuming jobDetails object includes title and description of the current job
    // Also assuming jobDetails includes estimated_square_footage
    const currentJobText = `${jobDetails.title || ''} ${jobDetails.description || ''}`;
    const currentJobSqft = jobDetails.estimated_square_footage || 0; // Default to 0 if not provided

    try {
      // 1. Fetch relevant historical job data:
      //    Jobs sharing at least one service item OR
      //    Jobs with similar search_document text
      //    Jobs with similar estimated_square_footage
      //    Ordered by recency and similarity (can refine scoring later)
      const serviceIds = serviceItems.map(item => item.id);
      const historicalJobsQuery = `
        SELECT
          j.job_id, -- Include job_id for potential future use (e.g., feedback loop)
          j.description,
          j.search_document, -- Include search_document for reference
          j.estimated_square_footage, -- Include estimated_square_footage
          j.total_amount AS price,
          j.estimated_material_cost AS material_cost,
          j.estimated_labor_cost AS labor_cost
        FROM jobs j
        LEFT JOIN job_services js ON j.job_id = js.job_id
        WHERE (js.service_id = ANY($1)
           OR similarity(j.search_document, $2) > 0.3 -- Adjust similarity threshold as needed
           OR ABS(j.estimated_square_footage - $3) < 200) -- Example: within 200 sqft difference, adjust threshold as needed
        GROUP BY j.job_id -- Group to avoid duplicate jobs if a job has multiple matching services
        ORDER BY
          similarity(j.search_document, $2) DESC, -- Prioritize by text similarity
 j.created_at DESC -- Then by recency
        LIMIT 20; -- Limit to a reasonable number
      `;
      const historicalJobsResult = await pool.query(historicalJobsQuery, [serviceIds, currentJobText, currentJobSqft]);
      const historicalJobs = historicalJobsResult.rows;
      // For simplicity in the prompt, we'll only pass the price and costs.
      // We could pass more details like description and sqft if the prompt is adjusted.
      // REVISIT: Consider including more job details in the prompt if beneficial for prediction accuracy

      const simplifiedHistoricalJobs = historicalJobs.map(job => ({
        // description: job.description, // Decide if including description is helpful for Gemini
        price: parseFloat(job.price), // Ensure price is a number
        material_cost: parseFloat(job.material_cost), // Ensure cost is a number
        labor_cost: parseFloat(job.labor_cost) // Ensure cost is a number
      }));

      // 2. Read the prompt file
      const promptFilePath = '/home/user/studio/bobby-vision/backend/prompts/predictPricePrompt.txt'; // Use absolute path
      let prompt = await fs.readFile(promptFilePath, 'utf8');

      // 3. Replace placeholders
      prompt = prompt.replace('{CURRENT_JOB_DETAILS_JSON}', JSON.stringify(jobDetails));
      prompt = prompt.replace('{CURRENT_SELECTED_SERVICES_JSON}', JSON.stringify(serviceItems.map(item => ({ id: item.id, name: item.name })))); // Assuming serviceItems is an array of objects with id and name
      prompt = prompt.replace('{CURRENT_HISTORICAL_JOBS_JSON}', JSON.stringify(simplifiedHistoricalJobs));

      // 4. Send the crafted prompt to the Gemini API
      let result;
      try {
        // The generateContent method in @google/genai library is compatible with the prompt format used
        result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // 5. Parse the JSON response from Gemini
        // ASSUMPTION: Gemini will return JSON within <CODE_BLOCK> tags as per the prompt
        const predictedPricing = JSON.parse(text.replace(/<CODE_BLOCK>/g, '').replace(/<\/CODE_BLOCK>/g, '').trim());

        // Ensure calculated profit margin is accurate based on Gemini's predicted values
        predictedPricing.estimated_profit_margin = ((predictedPricing.predicted_total_price - (predictedPricing.estimated_material_cost + predictedPricing.estimated_labor_cost)) / predictedPricing.predicted_total_price) * 100;

        return predictedPricing;
      } catch (geminiError) {
        console.error('Error communicating with Gemini API:', geminiError);
        // Check for specific error types from @google/genai if needed
        throw new ApiError('Error predicting price with AI.', 500); // Throw ApiError for Gemini issues
      }

    } catch (error) {
      console.error('Error in predictPrice:', error);
      // Re-throw custom database errors or other unexpected errors
      if (error instanceof ApiError || error instanceof DatabaseError) {
        throw error;
      }
      throw new ApiError('An unexpected error occurred during price prediction.', 500); // Catch other errors and throw a generic ApiError
    }
  },
};

module.exports = pricingService;