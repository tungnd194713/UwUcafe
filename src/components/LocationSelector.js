import React, { Component } from 'react';
import Map from './Map';

class LocationSelector extends Component {
  state = {
    markerPosition: null,
  };

  handleMapClick = (event) => {
    this.setState({ markerPosition: event.latLng });
    console.log(this.state)
  };

  render() {
    return (
      <div>
        <h1>Choose Your Location</h1>
        <Map
          containerElement={<div style={{ height: '400px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          markerPosition={this.state.markerPosition}
          onMapClick={this.handleMapClick}
        />
        {this.state.markerPosition && (
          <div>
            Latitude: {this.state.markerPosition.lat()}
            <br />
            Longitude: {this.state.markerPosition.lng()}
          </div>
        )}
      </div>
    );
  }
}

export default LocationSelector;