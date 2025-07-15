// bobby-vision/backend/services/itemizationService.js

const fs = require('fs').promises;
const { DatabaseError, ApiError, NotFoundError } = require('/home/user/studio/bobby-vision/backend/utils/errors.js'); // Use absolute path
const { pool } = require('/home/user/studio/bobby-vision/backend/database/index.js'); // Use absolute path
const { GoogleGenerativeAI } = require('@google/generative-ai');
// Use the recommended library
// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"}); // Or gemini-2.5-flash or other suitable model

/**
 * Suggests relevant service items from the service library based on extracted job details.
 * Uses Gemini API to match job details to service library entries.
 *
 * @param {object} jobDetails - An object containing extracted job details.
 * @returns {Promise<number[]>} A promise that resolves with an array of suggested service IDs.
 */
const suggestServiceItems = async (jobDetails) => {
  const jobContext = `${jobDetails.client_name} at ${jobDetails.address}. Services requested: ${jobDetails.services_requested.join(', ')}. Materials mentioned: ${jobDetails.materials_mentioned.join(', ')}. Notes: ${jobDetails.contextual_notes}`;

  try {
    // 1. Fetch the simplified service library data (id, name, description) from the database.
    const result = await pool.query('SELECT service_id as id, name, description FROM service_library');
    const serviceLibrary = result.rows;
  } catch (dbError) {
    throw new DatabaseError('Error fetching service library from database', dbError);
  }

  let promptTemplate;
  try {
    // Read the 'bobby-vision/backend/prompts/itemizeServicesPrompt.txt' file.
    promptTemplate = await fs.readFile('/home/user/studio/bobby-vision/backend/prompts/itemizeServicesPrompt.txt', 'utf8'); // Use absolute path
  } catch (fileError) {
    throw new ApiError('Error reading prompt template file', 500, fileError);
  }

  // 3. Replace the placeholders
  const prompt = promptTemplate
    .replace('{CURRENT_JOB_DETAILS_JSON}', JSON.stringify(jobDetails))
    .replace('{CURRENT_SERVICE_LIBRARY_JSON}', JSON.stringify(serviceLibrary));

  let itemizationResponseText;
  try {
    // 4. Send the crafted prompt to the Gemini API.
    const itemizationResponse = await model.generateContent(prompt);
    itemizationResponseText = await itemizationResponse.text();
  } catch (geminiError) {
    throw new ApiError('Error calling Gemini API for service itemization', 500, geminiError);
  }

  let parsedItemizationResponse;
  try {
    // 5. Parse the JSON response from Gemini.
    parsedItemizationResponse = JSON.parse(itemizationResponseText);
  } catch (parseError) {
    throw new ApiError('Error parsing Gemini API response for service itemization', 500, parseError);
  }
  const suggestedServiceIds = parsedItemizationResponse.suggested_service_ids || [];

  // Fetch full details for suggested services
  if (suggestedServiceIds.length === 0) {
    return [];
  }

  let suggestedServicesResult;
  try {
    suggestedServicesResult = await pool.query(
      'SELECT service_id as id, name, description FROM service_library WHERE service_id = ANY($1)',
      [suggestedServiceIds]
    );
  } catch (dbError) {
    throw new DatabaseError('Error fetching suggested services from database', dbError);
  }
  const suggestedServices = suggestedServicesResult.rows;

  let contextualPromptTemplate;
  try {
    // Read the contextual description prompt template
    contextualPromptTemplate = await fs.readFile('/home/user/studio/bobby-vision/backend/prompts/contextualDescriptionPrompt.txt', 'utf8'); // Use absolute path
  } catch (fileError) {
    throw new ApiError('Error reading contextual description prompt template file', 500, fileError);
  }

  // Generate contextual descriptions for each suggested service
  const servicesWithDescriptions = await Promise.all(suggestedServices.map(service =>
    generateContextualDescription(service, jobContext, contextualPromptTemplate)
  ));

  return servicesWithDescriptions;
};

module.exports = {
  suggestServiceItems,
};