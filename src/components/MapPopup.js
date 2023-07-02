import React, { useState } from 'react';
import Map from './Map';
import { Button, Modal } from 'react-bootstrap';

const MapPopup = () => {
    const [show, setShow] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState({});
  
    const handleShow = () => {
      setShow(true);
    };
  
    const handleClose = () => {
      setShow(false);
    };
  
    const handleMapClick = (event) => {
      setSelectedLocation({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
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
              selectedLocation={selectedLocation}
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
  