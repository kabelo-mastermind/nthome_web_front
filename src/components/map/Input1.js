import React, { useContext, useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { SourceContext } from '../../Context/SourceContext';
import { DestinationContext } from '../../Context/DestinationContext';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Input1 = ({ type }) => {
    const [value, setValue] = useState(null);
    const { setSource } = useContext(SourceContext);
    const { setDestination } = useContext(DestinationContext);

    const getLatAndLng = (place, type) => {
        if (!place || !place.value) {
            console.error("Place is null or undefined");
            return;
        }

        if (!window.google) {
            console.error("Google Maps API not loaded");
            return;
        }

        const placeId = place.value.place_id;
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails({ placeId }, (placeDetails, status) => {
            if (status === 'OK' && placeDetails.geometry && placeDetails.geometry.location) {
                const location = placeDetails.geometry.location;
                const newLocation = {
                    lat: location.lat(),
                    lng: location.lng(),
                    name: placeDetails.formatted_address,
                    label: placeDetails.name,
                };

                type === 'source' ? setSource(newLocation) : setDestination(newLocation);
            }
        });
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const geocoder = new window.google.maps.Geocoder();
 
                    geocoder.geocode(
                        { location: { lat: latitude, lng: longitude } },
                        (results, status) => {
                            if (status === 'OK' && results[0]) {
                                const currentLocation = {
                                    lat: latitude,
                                    lng: longitude,
                                    name: results[0].formatted_address,
                                    label: results[0].formatted_address,
                                };

                                setValue({
                                    label: results[0].formatted_address,
                                    value: { place_id: results[0].place_id },
                                });

                                if (type === 'source') {
                                    setSource(currentLocation);
                                } else {
                                    setDestination(currentLocation);
                                }
                            } else {
                                console.error("Geocoder failed due to:", status);
                            }
                        }
                    );
                },
                (error) => {
                    console.error("Error getting location:", error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        if (type === 'source') {
            getCurrentLocation();
        }
    }, [type]);

    return (
        <div className="bg-light p-3 rounded mt-3 position-relative" style={{ width: '100%' }}>
            <GooglePlacesAutocomplete
                selectProps={{
                    value,
                    onChange: (place) => {
                        setValue(place);
                        getLatAndLng(place, type);
                    },
                    placeholder: type === 'source' ? 'Pickup Location' : 'Dropoff Location',
                    isClearable: true,
                    components: {
                        DropdownIndicator: () => (
                            <div className="d-flex align-items-center">
                                {type === 'source' && (
                                    <button
                                        className="btn btn-light"
                                        onClick={getCurrentLocation}
                                        aria-label="Use current location"
                                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                    >
                                        <FaMapMarkerAlt size={20} color="#000" />
                                    </button>
                                )}
                            </div>
                        ),
                    },
                    styles: {
                        container: (provided) => ({
                            ...provided,
                            width: '100%',
                        }),
                        control: (provided) => ({
                            ...provided,
                            width: '100%',
                        }),
                        input: (provided) => ({
                            ...provided,
                            color: '#000',
                        }),
                    },
                }}
            />
        </div>
    );
};

export default Input1;
