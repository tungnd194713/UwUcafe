import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const Map = withGoogleMap((props) => {
  const { markerPosition } = props;

  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
      onClick={props.onMapClick}
    >
      {markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  );
});

export default Map;