import React from "react";
import { Modal, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const DeleteModal = props => {
  return (
    <Modal open={props.open} size={props.size}>
      <Modal.Content>
        <p>
          Are you sure you wish to delete this property and all associated
          tasks? This action cannot be undone.
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.submitHandler} color="red">
          <Icon name="checkmark" />
          Delete Property
        </Button>
        <Link to={`/dashboard/properties/`}>
          <Button>
            <Icon name="remove" />
            Cancel and Return to Property List
          </Button>
        </Link>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteModal;
