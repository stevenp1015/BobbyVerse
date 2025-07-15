const request = require('supertest');

// Mock the service modules
jest.mock('../../../services/nlpService');
jest.mock('../../../services/itemizationService');
jest.mock('../../../services/pricingService');
jest.mock('../../../services/analysisService');

const nlpService = require('../../../services/nlpService');
const itemizationService = require('../../../services/itemizationService');
const pricingService = require('../../../services/pricingService');
const analysisService = require('../../../services/analysisService');

// Assuming you export your Express app from server.js
const app = require('../../../server');

describe('Intelligence Integration Tests', () => {

  test('POST /api/parse-job should return extracted job details', async () => {
    const mockInputText = 'Install a new fence for Jane at 789 Oak Ave';
    const mockExtractedDetails = {
      client_name: 'Jane',
      address: '789 Oak Ave',
      services_requested: ['install new fence'],
      materials_mentioned: [],
      quantities_dimensions: '',
      contextual_notes: ''
    };

    nlpService.extractJobDetails.mockResolvedValue(mockExtractedDetails);

    const response = await request(app)
      .post('/api/parse-job')
      .send({ text: mockInputText });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockExtractedDetails);
    expect(nlpService.extractJobDetails).toHaveBeenCalledWith(mockInputText);
  });

  test('POST /api/suggest-services should return suggested service items', async () => {
    const mockJobDetails = { job_id: 1, title: 'Fence Installation' };
    const mockSuggestedItems = [
      { service_id: 1, name: 'Fence Post Installation', quantity: 10 },
      { service_id: 2, name: 'Fence Panel Installation', quantity: 5 },
    ];

    itemizationService.suggestServiceItems.mockResolvedValue(mockSuggestedItems);

    const response = await request(app)
      .post('/api/suggest-services')
      .send({ jobDetails: mockJobDetails });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockSuggestedItems);
    expect(itemizationService.suggestServiceItems).toHaveBeenCalledWith(mockJobDetails);
  });

  test('POST /api/predict-price should return predicted price', async () => {
    const mockJobDetails = { job_id: 1, title: 'Roof Repair' };
    const mockPredictedPrice = {
      predicted_total: 2500,
      confidence_level: 'High',
    };

    pricingService.predictPrice.mockResolvedValue(mockPredictedPrice);

    const response = await request(app)
      .post('/api/predict-price')
      .send({ jobDetails: mockJobDetails });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockPredictedPrice);
    expect(pricingService.predictPrice).toHaveBeenCalledWith(mockJobDetails);
  });

  test('POST /api/analyze-photo should return photo analysis results', async () => {
    // For file uploads in tests, you typically need to use .attach() or similar
    // This test will mock the service call and verify the endpoint handling
    // Actual file upload testing might require more advanced setup or E2E tests

    const mockPhotoData = 'base64encodedimagedata'; // Representing photo data
    const mockAnalysisResults = {
      identified_objects: ['roof shingles', 'ladder'],
      damage_assessment: 'Moderate',
    };

    // Mock the analyzePhoto function to resolve with mockAnalysisResults
    // We'll assume the endpoint extracts and passes the photo data correctly
    analysisService.analyzePhoto.mockResolvedValue(mockAnalysisResults);

    // Simulate sending photo data in the body
    const response = await request(app)
      .post('/api/analyze-photo')
      .send({ photoData: mockPhotoData }); // Adjust send method based on actual endpoint

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockAnalysisResults);
    // Verify the mock function was called. Argument might be the photo data or a path/identifier
    expect(analysisService.analyzePhoto).toHaveBeenCalledWith(mockPhotoData); // Adjust expectation based on actual service function signature
  });

  test('POST /api/parse-job should return 500 on NLP service error', async () => {
    const mockInputText = 'Install a new fence for Jane at 789 Oak Ave';

    nlpService.extractJobDetails.mockRejectedValue(new Error('Simulated NLP error'));

    const response = await request(app)
      .post('/api/parse-job')
      .send({ text: mockInputText });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error');
    expect(nlpService.extractJobDetails).toHaveBeenCalledWith(mockInputText);
  });

  test('POST /api/suggest-services should return 500 on itemization service error', async () => {
    const mockJobDetails = { job_id: 1, title: 'Fence Installation' };

    itemizationService.suggestServiceItems.mockRejectedValue(new Error('Simulated itemization error'));

    const response = await request(app)
      .post('/api/suggest-services')
      .send({ jobDetails: mockJobDetails });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error');
    expect(itemizationService.suggestServiceItems).toHaveBeenCalledWith(mockJobDetails);
  });

  test('POST /api/predict-price should return 500 on pricing service error', async () => {
    const mockJobDetails = { job_id: 1, title: 'Roof Repair' };

    pricingService.predictPrice.mockRejectedValue(new Error('Simulated pricing error'));

    const response = await request(app)
      .post('/api/predict-price')
      .send({ jobDetails: mockJobDetails });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error');
    expect(pricingService.predictPrice).toHaveBeenCalledWith(mockJobDetails);
  });

  test('POST /api/analyze-photo should return 500 on analysis service error', async () => {
    const mockPhotoData = 'base64encodedimagedata'; // Representing photo data

    // Mock the analyzePhoto function to reject with an error
    analysisService.analyzePhoto.mockRejectedValue(new Error('Simulated analysis error'));

    // Simulate sending photo data in the body
    const response = await request(app)
      .post('/api/analyze-photo')
      .send({ photoData: mockPhotoData }); // Adjust send method based on actual endpoint

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error');
    // Verify the mock function was called. Argument might be the photo data or a path/identifier
    expect(analysisService.analyzePhoto).toHaveBeenCalledWith(mockPhotoData); // Adjust expectation based on actual service function signature
  });

  test('POST /api/suggest-services should return empty array if itemization service suggests no items', async () => {
    const mockJobDetails = { job_id: 2, title: 'Small Repair' };
    const mockSuggestedItems = []; // Empty array

    itemizationService.suggestServiceItems.mockResolvedValue(mockSuggestedItems);

    const response = await request(app)
      .post('/api/suggest-services')
      .send({ jobDetails: mockJobDetails });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockSuggestedItems);
    expect(itemizationService.suggestServiceItems).toHaveBeenCalledWith(mockJobDetails);
  });

  test('POST /api/predict-price should return 500 if pricing service returns unexpected format', async () => {
    const mockJobDetails = { job_id: 3, title: 'Large Project' };
    const mockPredictedPrice = { price: 'twenty five hundred' }; // Unexpected format

    pricingService.predictPrice.mockResolvedValue(mockPredictedPrice);

    const response = await request(app)
      .post('/api/predict-price')
      .send({ jobDetails: mockJobDetails });

    // Assuming the endpoint expects a specific numeric format for price
    expect(response.statusCode).toBe(500); // Or 400 if there's input validation after service call
    expect(response.body).toHaveProperty('error');
    expect(pricingService.predictPrice).toHaveBeenCalledWith(mockJobDetails);
  });

  test('POST /api/analyze-photo should return minimal results if analysis service returns empty/minimal data', async () => {
    const mockPhotoData = 'base64encodedimagedata2';
    const mockAnalysisResults = { identified_objects: [], damage_assessment: 'None' }; // Minimal results

    analysisService.analyzePhoto.mockResolvedValue(mockAnalysisResults);

    const response = await request(app)
      .post('/api/analyze-photo')
      .send({ photoData: mockPhotoData });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockAnalysisResults);
    expect(analysisService.analyzePhoto).toHaveBeenCalledWith(mockPhotoData);
  });
});




