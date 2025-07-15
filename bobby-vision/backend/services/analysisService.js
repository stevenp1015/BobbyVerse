// Assuming you have installed @google/genai
const { GoogleGenerativeAI } = require('@google/genai');
import { ApiError } from '../utils/errors';
// --- Configuration (Needs to be set up by the user) ---
// Make sure to set the GOOGLE_API_KEY environment variable
const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
  console.error("GOOGLE_API_KEY environment variable not set.");
  // In a real application, you'd handle this more robustly (e.g., throw an error)
}

const genAI = new GoogleGenerativeAI(API_KEY || "YOUR_MOCK_API_KEY"); // Use mock key if env var not set
const visionModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash-latest" }); // Specify the vision model - using latest as recommended

// --- Helper function to craft photo analysis prompt ---
function craftPhotoAnalysisPrompt() {
  return `Analyze the following image of a job site or property. Identify any potential damage, areas requiring repair, or relevant features related to home improvement work (e.g., roof condition, gutter issues, siding damage, window problems).

  Based on your analysis, suggest potential repair items or services that would be relevant for a home improvement business.

  Format your response as a JSON object with a single key 'suggested_items' containing a list of strings, where each string is a suggested repair item or service.

  Example Output:
  <CODE_BLOCK>
  {
    "suggested_items": [
      "Roof shingle repair",
      "Gutter cleaning",
      "Replace damaged siding section"
    ]
  }
  </CODE_BLOCK>

  Analyze the image and provide suggested items in the specified JSON format.
  `;
}

// --- Helper function to craft document analysis prompt (for text extraction) ---
function craftDocumentAnalysisPrompt() {
  return `Analyze the following document image. Extract all the text content from the document.
  Provide the extracted text as a plain string.

  Example Output:
  <CODE_BLOCK>
  "This is a sample invoice document. Date: 07/14/2024. Amount Due: $1500."
  </CODE_BLOCK>

  Extract the text from the document image and return it as a plain string.
  `;
}


/**
 * Analyzes a photo of a job site to identify damage and suggest repair items.
 * @param {Buffer} imageData - The image data (e.g., Buffer from a file upload).
 * @returns {Promise<object>} A promise that resolves with the analysis results (mock data or actual API response).
 */
async function analyzePhoto(imageData) {
  // Ensure API_KEY is set before attempting to use genAI
  if (!API_KEY) {
    throw new ApiError("GOOGLE_API_KEY environment variable not set for vision analysis.", 500);
  }
  try {
    // Placeholder for interacting with Gemini API for photo analysis
    // ** IMPORTANT: Assume imageData is a Buffer containing the image binary data.

    const prompt = craftPhotoAnalysisPrompt();
    const imageParts = [
        {
            inlineData: { // Use inlineData for sending binary data
                data: imageData.toString('base64'),
                mimeType: 'image/jpeg', // Or dynamically determine mime type
            },
        },
    ];

    // Simulate sending to Gemini API and getting a response
    console.log("Sending photo analysis request to Gemini API...");

    const result = await visionModel.generateContent([prompt, ...imageParts]);
    const response = result.response;
    const text = response.text(); // Get the text response from Gemini
    console.log("Gemini API Response:", text);

    return {
      // TODO: Parse the 'text' to extract suggested items based on the JSON format prompt
      rawText: text, // Keep raw text for debugging/verification
      suggested_items: [] // Placeholder for parsed items
    };

  } catch (error) {
 throw new ApiError(`Error analyzing photo with Gemini API: ${error.message}`, error.response?.status || 500);
    throw error;
  }
}

/**
 * Analyzes a document image to extract text and structure.
 * @param {Buffer} documentData - The document image data.
 * @returns {Promise<string|object>} A promise that resolves with the extracted text or structured data.
 */
async function analyzeDocument(documentData) {
   // Ensure API_KEY is set before attempting to use genAI
   if (!API_KEY) {
    throw new ApiError("GOOGLE_API_KEY environment variable not set for document analysis.", 500); // Use consistent error message
   }
  try {
    // Placeholder for interacting with Gemini API or an OCR tool for document analysis.
    // Gemini 2.5 Flash can handle text extraction from images. Use a similar approach as analyzePhoto.
    // ** IMPORTANT: Assume documentData is a Buffer containing the image binary data of the document.

    const prompt = craftDocumentAnalysisPrompt();
     const imageParts = [
        {
            inlineData: {
                data: documentData.toString('base64'),
                mimeType: 'image/png', // Or dynamically determine mime type (e.g., image/png, image/jpeg)
            },
        },
    ];
    console.log("Simulating document analysis with Gemini API/OCR...");
     // In a real implementation, you would use:
    // const result = await visionModel.generateContent([prompt, ...imageParts]);
    // const response = result.response;
    // const text = response.text();
    // console.log("Gemini API Response (simulated):", text);


    // Use generateContent for document image analysis
    const result = await visionModel.generateContent([prompt, ...imageParts]);
    const response = result.response;
    const extractedText = response.text(); // Get the extracted text
    console.log("Gemini API Document Analysis Response:", extractedText);

    return { extractedText: extractedText,  structuredData: {} /* TODO: Further process text if needed */ };

  } catch (error) {
 throw new ApiError(`Error analyzing document with Gemini API/OCR: ${error.message}`, error.response?.status || 500);
  }
}