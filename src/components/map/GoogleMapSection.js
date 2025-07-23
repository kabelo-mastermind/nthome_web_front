import React, { useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { withAPIKey } from '@aws/amazon-location-utilities-auth-helper';
import './GoogleMapSection.css';

// Retrieve API key, map name, and region from environment variables
const apiKey = process.env.REACT_APP_API_KEY;
const mapName = process.env.REACT_APP_MAP_NAME;
const region = process.env.REACT_APP_REGION;

const GoogleMapSection = ({ startLocation, endLocation }) => {
  // State variables to manage map instance, markers, and loading state
  const [mapInstance, setMapInstance] = useState(null);
  const [startMarker, setStartMarker] = useState(null);
  const [endMarker, setEndMarker] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    let mlglMap = null;

    // Function to initialize the map
    const initializeMap = async () => {
      // Authenticate with the API key
      const authHelper = await withAPIKey(apiKey);

      // Create a new map instance
      mlglMap = new maplibregl.Map({
        container: 'map', // ID of the HTML element where the map will be rendered
        center: startLocation, // Initial center of the map
        zoom: 100, // Initial zoom level
        style: `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`, // Map style
      });

      // Event handler for when the map is fully loaded
      mlglMap.on('load', () => {
        setMapInstance(mlglMap);
        setMapLoaded(true);

        // Add navigation controls to the map
        mlglMap.addControl(new maplibregl.NavigationControl(), 'top-left');
      });

      // Cleanup function to remove the map instance when component unmounts
      return () => {
        if (mlglMap) {
          mlglMap.remove();
        }
      };
    };

    // Initialize the map if it is not already initialized and locations are provided
    if (!mapInstance && startLocation && endLocation) {
      initializeMap();
    }
  }, [mapInstance, startLocation, endLocation]);

  useEffect(() => {
    // Update markers and fit map bounds when locations change
    if (mapInstance && startLocation && endLocation) {
      addMarkersAndFitBounds(mapInstance, startLocation, endLocation);
    }
  }, [mapInstance, startLocation, endLocation]);

  // Function to add markers and fit map bounds
  const addMarkersAndFitBounds = (map, startLoc, endLoc) => {
    // Remove existing markers if any
    if (startMarker) {
      startMarker.remove();
    }
    if (endMarker) {
      endMarker.remove();
    }

    // Add start marker to the map
    const newStartMarker = new maplibregl.Marker()
      .setLngLat(startLoc)
      .addTo(map);

    // Add end marker to the map
    const newEndMarker = new maplibregl.Marker()
      .setLngLat(endLoc)
      .addTo(map);

    // Update state with the new markers
    setStartMarker(newStartMarker);
    setEndMarker(newEndMarker);

    // Fit the map to the markers
    const bounds = new maplibregl.LngLatBounds();
    bounds.extend(newStartMarker.getLngLat());
    bounds.extend(newEndMarker.getLngLat());
    map.fitBounds(bounds, { padding: 50 }); // Adjust padding as needed

    // Show the map container once the map is loaded
    if (mapLoaded) {
      document.getElementById('map').style.display = 'block';
    }
  };

  return (
    <div className="map-container">
      {!mapLoaded && (
        <div className="map-loading-container">
          <h3 className="map-loading-text">Loading Map...</h3>
        </div>
      )}
      <div id="map" className="map"></div>
    </div>
  );
};

export default GoogleMapSection;
