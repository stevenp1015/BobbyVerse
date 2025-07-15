// bobby-vision/backend/services/nlpService.js

const fs = require('fs').promises;
const path = require('path');// Update the import statement for the new library
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { ApiError, ValidationError } = require('../utils/errors'); // Import custom error classes

/**
 * Processes natural language input and extracts job details.
 *
 * @param {string} naturalLanguageInput - The raw text input from the user.
 * @returns {object} A structured object containing extracted job details.
 */
const extractJobDetails = async (naturalLanguageInput) => {
 try {
    // Read the prompt file
    const promptFilePath = path.join(__dirname, '../prompts/parseJobPrompt.txt');
    let promptTemplate = await fs.readFile(promptFilePath, 'utf8');

    // Replace the placeholder with the actual job description
    const prompt = promptTemplate.replace('{JOB_DESCRIPTION}', naturalLanguageInput);

    // Initialize the GoogleGenerativeAI client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Make sure to set GEMINI_API_KEY environment variable
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    // Send the prompt to Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini Response:", text); // Log the Gemini response for debugging

    // Parse the JSON response
    let extractedDetails;
    try {
      extractedDetails = JSON.parse(text.replace(/<CODE_BLOCK>|<\/CODE_BLOCK>/g, '').trim());
    } catch (parseError) {
      console.error("Error parsing Gemini response:", text, parseError);
      throw new ApiError("Failed to parse response from AI model.", 500); // Throw a specific error for parsing issues
    }

    return extractedDetails;
  } catch (error) {
    console.error("Error in extractJobDetails:", error); // Log the specific error
    // Re-throw the error to be handled by the calling function/route handler
    // Consider throwing a more specific error if the error indicates a validation issue with the input
    throw new ApiError("Failed to extract job details using AI model.", error.statusCode || 500); // Throw a generic API error for other issues
     }
};

module.exports = {
  extractJobDetails,
};