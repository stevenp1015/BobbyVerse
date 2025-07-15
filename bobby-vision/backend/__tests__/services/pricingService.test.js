const { predictPrice } = require('../../../services/pricingService');

// Mock the database connection pool
jest.mock('../../../database');
const pool = require('../../../database');

// Mock the service that interacts with Gemini, as unit tests should isolate the function
jest.mock('../../../services/nlpService');
jest.mock('../../../services/itemizationService');
jest.mock('../../../services/analysisService');
// Mock the email service as it's not relevant to pricing logic
jest.mock('../../../services/emailService');
// Mock the external API services
jest.mock('../../../services/propertyService');
jest.mock('../../../services/supplierService');
// Mock the document generation service
// Mock the genai library directly if needed for more granular mocking within pricingService
jest.mock('@google/genai');


describe('Pricing Service Unit Tests', () => {
  test('predictPrice should select relevant historical data', async () => {
    const mockCurrentJob = {
      selectedServiceIds: [1, 2],
      title: 'New Roof Installation',
      description: 'Install a new roof on a house.',
      estimated_square_footage: 2000,
    };

    const mockHistoricalJobs = [
      {
        job_id: 1,
        title: 'Roof Replacement',
        description: 'Replaced roof shingles.',
        estimated_square_footage: 1800,
        // Simulate associated service IDs - adjust based on how you store this
        // In a real scenario, you'd likely join with a job_services table or have an array column
        service_ids: [1],
        price: 10000, material_cost: 4000, labor_cost: 3000,
        search_document: 'Roof Replacement Replaced roof shingles.' // Include search_document for pg_trgm
      },
      {
        job_id: 2,
        title: 'Gutter Cleaning',
        description: 'Cleaned gutters on a house.',
        estimated_square_footage: 1500,
        service_ids: [3],
        price: 300, material_cost: 50, labor_cost: 100,
        search_document: 'Gutter Cleaning Cleaned gutters on a house.'
      },
      {
        job_id: 3,
        title: 'Roof Repair and Attic Fan',
        description: 'Repaired roof and installed attic fan.',
        estimated_square_footage: 2100,
        service_ids: [1, 2],
        price: 11000, material_cost: 4500, labor_cost: 3500,
        search_document: 'Roof Repair and Attic Fan Repaired roof and installed attic fan.'
      },
    ];

    // Mock the pool.query method to return mock historical jobs
    // We can be more specific with the query expectation here if the query string is predictable
    pool.query.mockResolvedValueOnce({
      rows: mockHistoricalJobs,
      command: 'SELECT', rowCount: mockHistoricalJobs.length, fields: [], _parsers: [], _types: {},
    });

    // Mock the Gemini API interaction within predictPrice
    // Since predictPrice calls Gemini, we need to mock that part to isolate the historical data selection logic
    // This requires a more detailed understanding of how predictPrice interacts with the genAI model
    // For this unit test focused on data selection, we can mock the part that calls the model
    // This might require refactoring pricingService to have a separate function for data fetching
    // Or, mock the genAI object and its methods used within predictPrice
    const mockGenerateContentResponse = {
        response: {
            text: () => JSON.stringify({
                predicted_total_price: 10750,
                estimated_material_cost: 4200,
                estimated_labor_cost: 3150,
                estimated_profit_margin: 31.16
            })
        }
    };
    // This mocking assumes a specific interaction pattern with the genAI library within predictPrice
    // You would need to adjust this based on the actual implementation
    const { GoogleGenerativeAI } = require('@google/genai');
    const mockGenAI = {
        getGenerativeModel: jest.fn().mockReturnValue({
            generateContent: jest.fn().mockResolvedValue(mockGenerateContentResponse)
        })
    };
    GoogleGenerativeAI.mockImplementation(() => mockGenAI);


    // Call the function - need to adjust predictPrice signature to accept job details directly or fetch internally
    // Assuming predictPrice takes job details object as an argument
    await predictPrice(mockCurrentJob);

    // Assert that pool.query was called with a query that includes relevance logic
    // This is a fragile test as it depends on the exact query string.
    // A better approach might be to test the function that *generates* the query string separately.
    expect(pool.query).toHaveBeenCalled(); // At least check that it was called

    // Example assertions if you can predict parts of the query
    // expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('FROM jobs'));
    // expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('WHERE'));
    // expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('service_ids @> ARRAY[')); // If using array containment
    // expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('similarity(search_document,'));
    // expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('estimated_square_footage'));
    // expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('ORDER BY'));
    // expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('LIMIT'));


    // TODO: Assert on the returned predicted price and profitability metrics (more complex unit test)
    // This would require examining the return value of predictPrice
    // Example:
    // const result = await predictPrice(mockCurrentJob);
    // expect(result).toHaveProperty('predicted_total_price');
    // expect(result.predicted_total_price).toBeCloseTo(10750, 0);


    // Placeholder to avoid test failure due to unimplemented logic
    // expect(true).toBe(true); // Remove this when real assertions are added
  });

  // TODO: Add more unit tests for different aspects of pricingService,
  // e.g., testing error handling when database query fails,
  // testing error handling when Gemini API call fails,
  // testing different scenarios for historical data selection criteria.

});