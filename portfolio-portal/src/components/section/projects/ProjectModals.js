import React, { useState } from 'react';

import { Button, Modal } from 'react-bootstrap';

const ProjectModals = () => {

  const [show, setShow] = useState(null);

  const handleClose = () => {
    setShow(null); // Close the modal by setting show to null
  };

  return (
    <Modal show={show !== null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>More Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Add your content here */}
        {/* You can use the 'index' to retrieve the details of the clicked item */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectModals;