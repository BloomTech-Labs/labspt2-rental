import React from "react";
import { Modal, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const MonthlyFeeModal = props => {
  return (
    <Modal open={props.open} size={props.size}>
      <Modal.Content>
        <p>{props.modalMessage}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.submitHandler} color="blue">
          <Icon name="checkmark" />
          Accept Changes and Add Property
        </Button>
        <Link to={`/dashboard/properties/`}>
          {" "}
          <Button>
            <Icon name="remove" />
            Cancel and Return to Property List
          </Button>
        </Link>
      </Modal.Actions>
    </Modal>
  );
};

export default MonthlyFeeModal;
