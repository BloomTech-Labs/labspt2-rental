import React, { Component } from "react";
import { FlexColumn, FlexRow } from "custom-components";
import { Button, Image, Dimmer, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import ErrorModal from "./ErrorModal";

class Property extends Component {
  state = {
    errorModalOpen: false,
    deleteModalOpen: false,
    dimmerOpen: false,
    modalMessage: ""
  };
  componentDidMount() {
    this.props.getProperties();
    this.props.getReservations();
  }

  openModal = () => {
    const reservationMatch = this.props.reservations.map(reservation => {
      if (reservation.property == null) {
        return false;
      } else if (reservation.property._id === this.props.match.params.id) {
        return true;
      } else return false;
    });
    if (reservationMatch.includes(true)) {
      this.setState({
        errorModalOpen: true,
        modalMessage: "Active reservation, property cannot be deleted"
      });
    } else {
      this.setState({
        deleteModalOpen: true
      });
    }
  };

  modalClose = () => {
    this.setState({ errorModalOpen: false });
  };
  handleDelete = () => {
    this.props.deleteProperty(this.props.match.params.id);
    this.setState({ dimmerOpen: true, deleteModalOpen: false });
  };
  successClose = () => {
    this.setState({
      dimmerOpen: false
    });
    this.props.history.push("/dashboard/properties");
  };

  render() {
    const property = this.props.properties.find(
      property => property._id === this.props.match.params.id
    );
    console.log(property);
    return (
      <>
        {property && (
          <div>
            <Dimmer
              size="fullscreen"
              active={this.state.dimmerOpen}
              page
              onClickOutside={this.successClose}
            >
              <Header as="h1" inverted>
                Property Deleted!
                <Header.Subheader>
                  Click to return to Property List
                </Header.Subheader>
              </Header>
            </Dimmer>
            <DeleteModal
              open={this.state.deleteModalOpen}
              submitHandler={this.handleDelete}
            />
            <ErrorModal
              size="mini"
              open={this.state.errorModalOpen}
              modalMessage={this.state.modalMessage}
              modalClose={this.modalClose}
            />
            <FlexRow>
              <FlexColumn>
                <h1>{property.name}</h1>
                <div className="address">
                  <p>{property.address1}</p>
                  <p>
                    {property.city}, {property.state} {property.zip}
                  </p>
                </div>
                <br />
                <div className="details">
                  <p>Price per night: ${property.price}</p>
                  <p>Max Guests: {property.occupants}</p>
                </div>
                <div>
                  <p>
                    Default Employee:
                    {property.assistants != null && property.assistants.length
                      ? `${property.assistants[0].firstName}`
                      : "Not Assigned"}
                  </p>
                </div>
                <FlexRow>
                  <Link to={`/dashboard/properties/edit/${property._id}`}>
                    <Button content="Edit" color="blue" />
                  </Link>
                  <Button onClick={this.openModal}>Delete</Button>
                </FlexRow>
              </FlexColumn>
              <FlexColumn>
                <Image src={property.image} size="medium" />
              </FlexColumn>
            </FlexRow>
          </div>
        )}
      </>
    );
  }
}

export default Property;
