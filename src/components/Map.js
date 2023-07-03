import React, { useEffect, useState } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const Map = withGoogleMap(({ onMapClick, mapLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState({latitude: parseFloat(mapLocation.latitude), longitude: parseFloat(mapLocation.longitude)});

  const handleMapClick = (event) => {
    const { latLng } = event;
    const latitude = parseFloat(latLng.lat());
    const longitude = parseFloat(latLng.lng());
    setSelectedLocation({ latitude, longitude });
    onMapClick({ latitude, longitude });
  };

  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: parseFloat(selectedLocation.latitude), lng: parseFloat(selectedLocation.longitude) }}
      onClick={handleMapClick}
    >
      <Marker position={{ lat: parseFloat(selectedLocation.latitude), lng: parseFloat(selectedLocation.longitude) }} />
    </GoogleMap>
  );
});

export default Map;