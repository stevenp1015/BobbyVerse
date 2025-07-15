const express = require('express');
const router = express.Router();
const nlpService = require('../services/nlpService');
const itemizationService = require('../services/itemizationService');
const pricingService = require('../services/pricingService');
const analysisService = require('../services/analysisService');
const { ValidationError } = require('/bobby-vision/backend/utils/errors');

// POST endpoint for parsing natural language job input
router.post('/parse-job', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            throw new ValidationError('No text provided in the request body');
        }
        const jobDetails = await nlpService.extractJobDetails(text);
        res.json(jobDetails);
    } catch (err) {
        next(err);
    }
});

// POST endpoint for suggesting service items based on extracted job details
router.post('/suggest-services', async (req, res) => {
 try {    const { jobDetails } = req.body;
    if (!jobDetails) {
      return res.status(400).json({ error: 'No job details provided in the request body' });
    }
    const suggestedServices = await itemizationService.suggestServiceItems(jobDetails);
    res.json(suggestedServices);
});

// POST endpoint for predicting price and profitability based on service items
router.post('/predict-price', async (req, res) => {
 try {    const { serviceItems } = req.body;
    if (!serviceItems || !Array.isArray(serviceItems)) {
      return res.status(400).json({ error: 'No service items provided in the request body or invalid format' });
    }
    const pricePrediction = await pricingService.predictPrice(serviceItems);
    res.json(pricePrediction);
});

// POST endpoint for analyzing photos
router.post('/analyze-photo', async (req, res) => {
    try {
        const { imageData } = req.body; // Assuming image data is sent in the request body
    if (!imageData) {
            throw new ValidationError('No image data provided in the request body');
        }

        // Assuming analyzePhoto expects image data directly
        const analysisResults = await analysisService.analyzePhoto(imageData);

        res.json(analysisResults);
    } catch (err) {
        next(err);
    }
});

module.exports = router;