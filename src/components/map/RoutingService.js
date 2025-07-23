import AWS from 'aws-sdk';

const locationClient = new AWS.LocationService({
  region: process.env.REACT_APP_REGION,
  apiVersion: '2020-11-19',
});

export const calculateRoute = async (
  startLocation,
  endLocation,
  options = {}
) => {
  const params = {
    CalculateRouteRequest: {
      DeparturePosition: startLocation,
      DestinationPosition: endLocation,
      ...options,
    },
  };

  try {
    const response = await locationClient
      .calculateRoute(params)
      .promise();
    return response.Route;
  } catch (error) {
    console.error('Error calculating route:', error);
    throw error;
  }
};