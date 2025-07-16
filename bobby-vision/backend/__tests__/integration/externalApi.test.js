const request = require('supertest');

// Mock the propertyService module
jest.mock('../../services/propertyService');
// Mock the supplierService module
jest.mock('../../services/supplierService');


const propertyService = require('../../services/propertyService');
const supplierService = require('../../services/supplierService');
// Assuming you export your Express app from server.js
const app = require('../../server');

describe('External API Integration Tests', () => {

  test('GET /api/property-data should return property data', async () => {
    const mockAddress = '123 Test St';
    const mockPropertyData = {
      formattedAddress: '123 Test St, Test City, TS',
      location: {
        lat: 40.7128,
        lng: -74.0060
      }
    };

    // Mock the getPropertyData function to resolve with mockPropertyData
    propertyService.getPropertyData.mockResolvedValue(mockPropertyData);

    const response = await request(app)
      .get('/api/property-data')
      .query({
        address: mockAddress
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockPropertyData);
    // Verify that the mock function was called with the correct argument
    expect(propertyService.getPropertyData).toHaveBeenCalledWith(mockAddress);
  });

  test('GET /api/materials/source should return supplier recommendation', async () => {
    const mockMaterialDetails = {
      name: 'Test Material',
      quantity: 10
    };
    const mockJobLocation = '456 Job Rd';
    const mockSourcingRecommendations = [{
      supplier: 'Home Depot',
      price: 500,
      estimatedDistance: '5 miles'
    }, ];

    // Mock the findBestSupplier function to resolve with mockSourcingRecommendations
    supplierService.findBestSupplier.mockResolvedValue(mockSourcingRecommendations[0]);

    const response = await request(app)
      .get('/api/materials/source')
      .query({
        materialDetails: JSON.stringify(mockMaterialDetails),
        jobLocation: mockJobLocation
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockSourcingRecommendations);
    // Verify that the mock function was called with the correct arguments
    expect(supplierService.findBestSupplier).toHaveBeenCalledWith(mockMaterialDetails, mockJobLocation);
  });

  test('GET /api/property-data should return 500 on property service error', async () => {
    const mockAddress = 'Error Address';

    // Mock the getPropertyData function to reject with an error
    propertyService.getPropertyData.mockRejectedValue(new Error('Simulated Property Service Error'));

    const response = await request(app)
      .get('/api/property-data')
      .query({
        address: mockAddress
      });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error'); // Assuming the error handler formats this way
    // Optionally, assert the content of the generic error message
    // expect(response.body.error).toBe('Internal Server Error');

    expect(propertyService.getPropertyData).toHaveBeenCalledWith(mockAddress);
  });

  test('GET /api/materials/source should return 500 on supplier service error', async () => {
    const mockMaterialDetails = {
      name: 'Error Material',
      quantity: 10
    };
    const mockJobLocation = 'Error Location';

    // Mock the findBestSupplier function to reject with an error
    supplierService.findBestSupplier.mockRejectedValue(new Error('Simulated Supplier Service Error'));

    const response = await request(app)
      .get('/api/materials/source')
      .query({
        materialDetails: JSON.stringify(mockMaterialDetails),
        jobLocation: mockJobLocation
      });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error'); // Assuming the error handler formats this way
    // Optionally, assert the content of the generic error message
  });
});