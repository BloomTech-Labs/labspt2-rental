import React from "react";
import { Modal, Button } from "semantic-ui-react";

const ErrorModal = props => {
  return (
    <Modal open={props.open} size={props.size}>
      <Modal.Content>
        <p>{props.modalMessage}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.modalClose} color="blue">
          Return to Form
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ErrorModal;
