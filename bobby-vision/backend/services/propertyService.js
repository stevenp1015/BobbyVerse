// bobby-vision/backend/services/propertyService.js

const { NotFoundError, ApiError } = require('../utils/errors');
const { Client } = require('@googlemaps/google-maps-services-js');

const googleMapsClient = new Client({});

const fetchPropertyData = async (address) => {
  console.log(`Fetching property data for address: ${address}`);
  
  try {
    // Use Geocoding API to get coordinates
    const geoResponse = await googleMapsClient.geocode({
      params: {
        address: address,
        key: process.env.GOOGLE_API_KEY,
      }
    });

    if (geoResponse.data.results.length === 0) {
      throw new NotFoundError('Address not found via Geocoding API');
    }

    const geometry = geoResponse.data.results[0].geometry.location;
    const formattedAddress = geoResponse.data.results[0].formatted_address;

    // In a real implementation, you would handle API responses and errors here.
    return { formattedAddress, geometry, mockData: true }; // Returning some data for now

  } catch (error) {
    console.error("Error in fetchPropertyData:", error);
    if (error instanceof NotFoundError) {
      throw error; // Re-throw NotFoundError specifically
    } else {
      throw new ApiError('Error fetching property data from external API', 500); // Wrap other errors in ApiError
    }
  }
};

module.exports = {
  fetchPropertyData,
};