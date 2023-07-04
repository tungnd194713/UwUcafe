import React, { useState } from 'react';
import Map from './Map';
import { Button, Modal } from 'react-bootstrap';

const MapPopup = ({ onMapClick, mapLocation }) => {
    const [show, setShow] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState({});
  
    const handleShow = () => {
      setShow(true);
    };
  
    const handleClose = () => {
      setShow(false);
    };
  
    const handleMapClick = (location) => {
      setSelectedLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
      onMapClick({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    };
  
    return (
      <div>
        <Button variant="primary" onClick={handleShow}>
          Open Map Popup
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Map Popup</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Map
              containerElement={<div style={{ height: '400px', width: '100%' }} />}
              mapElement={<div style={{ height: '100%' }} />}
              mapLocation={mapLocation}
              onMapClick={handleMapClick}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
  
  export default MapPopup;
  