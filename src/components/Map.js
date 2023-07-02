import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const Map = withGoogleMap(({ selectedLocation }) => {
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
    >
      {selectedLocation && (
        <Marker position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }} />
      )}
    </GoogleMap>
  );
});

export default Map;