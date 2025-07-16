const { suggestServiceItems } = require('../../services/itemizationService');

// Mock the database connection pool
jest.mock('../../database');
const pool = require('../../database');

// Mock the @google/genai library or the relevant parts
jest.mock('@google/genai');
const { GoogleGenerativeAI } = require('@google/genai');

// TODO: Mock the model object and its methods that itemizationService uses
const mockGenerateContent = jest.fn();
const mockGetGenerativeModel = jest.fn().mockReturnValue({
    generateContent: mockGenerateContent,
});
const mockGoogleGenerativeAI = jest.fn().mockImplementation(() => ({
    getGenerativeModel: mockGetGenerativeModel,
}));
GoogleGenerativeAI.mockImplementation(mockGoogleGenerativeAI);


describe('Itemization Service Unit Tests', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('suggestServiceItems should suggest and retrieve service items', async () => {
    const mockJobDetails = {
      client_name: 'Jane',
      address: '789 Oak Ave',
      services_requested: ['install new fence'],
      materials_mentioned: [],
      quantities_dimensions: '',
      contextual_notes: ''
    };

    const mockServiceLibrary = [
      { service_id: 1, name: 'Fence Installation', description: 'Install a new fence.' },
      { service_id: 2, name: 'Deck Repair', description: 'Repair an existing deck.' },
    ];

    // Mock Gemini response suggesting service IDs
    const mockGeminiResponse = {
      // Simulate Gemini response structure - adjust based on your prompt and model output
      text: () => `{
  "suggested_service_ids": [1]
}`
    };

    // Mock database pool queries
    // First query to get service library
    pool.query.mockResolvedValueOnce({
      rows: mockServiceLibrary,
      command: 'SELECT', rowCount: mockServiceLibrary.length, fields: [], _parsers: [], _types: {},
    });
    // Second query to get details for suggested service IDs
    pool.query.mockResolvedValueOnce({
      rows: [{ service_id: 1, name: 'Fence Installation', description: 'Install a new fence.' }],
      command: 'SELECT', rowCount: 1, fields: [], _parsers: [], _types: {},
    });

    // Mock Gemini API call
    // TODO: Adjust this based on how the Gemini model and method are actually called in itemizationService
    mockGenerateContent.mockResolvedValue({ response: mockGeminiResponse });

    const suggestedItems = await suggestServiceItems(mockJobDetails);

    // Assertions
    expect(pool.query).toHaveBeenCalledTimes(2); // Called twice: get library, get suggested details

    // Assert first pool.query call (get service library) - checking for basic query pattern
    expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('FROM service_library'));


    // Assert Gemini was called with the correct prompt structure
    // This is a simplified check; a more robust test would involve crafting the exact expected prompt string
    expect(mockGenerateContent).toHaveBeenCalledWith(expect.arrayContaining([
      expect.stringContaining('suggest relevant service items'), // Part of the prompt instruction
      expect.stringContaining(JSON.stringify(mockJobDetails)), // Includes job details
      expect.stringContaining(JSON.stringify(mockServiceLibrary)) // Includes service library
    ]));

    // Assert second pool.query call (get details for suggested IDs) - checking for IN clause with suggested ID(s)
    expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('FROM service_library WHERE service_id IN ($1)')); // Adjust $1 based on actual query in service
    // You might also check the values passed to the query if your query uses parameters correctly
    // expect(pool.query).toHaveBeenCalledWith(expect.anything(), [1]); // Example if query uses parameters

    // Assert on the structure and content of the returned suggestedItems
    expect(Array.isArray(suggestedItems)).toBe(true);
    expect(suggestedItems.length).toBe(1);
    expect(suggestedItems[0]).toEqual({ service_id: 1, name: 'Fence Installation', description: 'Install a new fence.' });

    // TODO: Add more specific assertions here based on the expected output structure

  });

  // TODO: Add more test cases covering different scenarios (e.g., no services suggested, ambiguous input)
});