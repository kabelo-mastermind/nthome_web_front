import React, { useContext, useEffect, useState, useCallback } from 'react';
import { DirectionsRenderer, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '../../Context/SourceContext';
import { DestinationContext } from '../../Context/DestinationContext';
import { assets } from '../../assets/assets';

const containerStyle = {
    width: '100%',
    height: window.innerHeight * 0.9,
};

const libraries = ['places'];

const GoogleMapSection1 = () => {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries,
    });

    const { source } = useContext(SourceContext);
    const { destination } = useContext(DestinationContext);
    const [map, setMap] = useState(null);
    const [center, setCenter] = useState(null);
    const [directions, setDirections] = useState(null);
    const [nearbyDrivers, setNearbyDrivers] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => console.error('Error fetching current location:', error),
            { enableHighAccuracy: true }
        );
    }, []);

    useEffect(() => {
        if (source && map) {
            map.panTo({
                lat: source.lat,
                lng: source.lng,
            });
            setCenter({
                lat: source.lat,
                lng: source.lng,
            });
        }
    }, [source, map]);

    useEffect(() => {
        if (destination && map) {
            setCenter({
                lat: destination.lat,
                lng: destination.lng,
            });
            fetchDirections();
        }
    }, [destination, map]);

    const fetchDirections = () => {
        if (!source || !destination || !window.google) return;

        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin: { lat: source.lat, lng: source.lng },
                destination: { lat: destination.lat, lng: destination.lng },
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                } else {
                    console.error('Error fetching directions:', status);
                }
            }
        );
    };

    const fetchNearbyDrivers = async () => {
        if (!source) return;

        try {
            const response = await fetch(`http://localhost:8085/api/drivers/nearby?lat=${source.lat}&lng=${source.lng}`);
            if (!response.ok) {
                throw new Error('Failed to fetch nearby drivers');
            }
            const data = await response.json();
            
            const driverDetails = await Promise.all(
                data.drivers.map(async (driver) => {
                    try {
                        const userResponse = await fetch(`http://localhost:8085/userInfo/${driver.users_id}`);
                        if (!userResponse.ok) {
                            throw new Error(`Failed to fetch user details for driver ${driver.id}`);
                        }
                        const userInfo = await userResponse.json();
                        return { ...driver, userInfo };
                    } catch (userError) {
                        console.error('Error fetching user details:', userError);
                        return driver;
                    }
                })
            );
            setNearbyDrivers(driverDetails);
        } catch (error) {
            console.error('Error fetching nearby drivers:', error);
        }
    };

    useEffect(() => {
        fetchNearbyDrivers();
    }, [source]);

    const onLoad = useCallback((map) => {
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    return isLoaded && center ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={8}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{ mapId: 'a0b537a549595d0d' }}
        >
            {source && (
                <Marker position={{ lat: source.lat, lng: source.lng }} title={source.label} />
            )}
            {destination && (
                <Marker position={{ lat: destination.lat, lng: destination.lng }} title={destination.label} />
            )}

            {nearbyDrivers.map((driver) => (
                <Marker
                    key={driver.id}
                    position={{ lat: driver.current_lat, lng: driver.current_lng }}
                    title={`Driver: ${driver.userInfo[0]?.name || 'Unknown'}`}
                    icon={{
                        url: assets.carDriver,
                        scaledSize: new window.google.maps.Size(60, 50),
                    }}
                />
            ))}

            {directions && (
                <DirectionsRenderer
                    directions={directions}
                    options={{
                        polylineOptions: {
                            strokeColor: '#000',
                            strokeWeight: 5,
                        },
                        suppressMarkers: true, // Suppresses default markers from DirectionsRenderer
                    }}
                />
            )}
        </GoogleMap>
    ) : (
        <></>
    );
};

export default GoogleMapSection1;
