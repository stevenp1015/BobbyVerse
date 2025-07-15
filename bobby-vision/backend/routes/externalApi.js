const express = require('express');
const router = express.Router();
const propertyService = require('../services/propertyService');
const supplierService = require('../services/supplierService');
const { ApiError, ValidationError } = require('../utils/errors');

// GET endpoint to fetch property data by address
router.get('/property-data', async (req, res) => {
  const address = req.query.address;

  try {
    if (!address) {
 throw new ValidationError('Address query parameter is required.');
    }
    // Fetch property data using the propertyService
    // The service layer should handle specific external API errors and potentially
    // map them to our custom error types if needed. For now, we catch and re-throw.
    const propertyData = await propertyService.getPropertyData(address);
    res.json(propertyData);
  } catch (error) {
    next(error);
  }
});

// GET endpoint to source materials
router.get('/materials/source', async (req, res) => {
  const { materials, jobLocation } = req.query; // Expect materials as a JSON string and jobLocation as an address

  try {
    if (!materials || !jobLocation) {
 throw new ValidationError('Materials and jobLocation query parameters are required.');
    }

    // Use the supplierService to find the best supplier
    // The service layer should handle specific external API errors.
    const materialDetails = JSON.parse(materials); // Parse the materials JSON string
    const sourcingRecommendations = await supplierService.findBestSupplier(materialDetails, jobLocation);
    res.json(sourcingRecommendations);
  } catch (error) {
    next(error);
  }
});
module.exports = router;