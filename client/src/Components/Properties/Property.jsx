import React, { Component } from "react";
import { FlexColumn, FlexRow } from "custom-components";
import { Button, Dimmer, Header, Image, Icon } from "semantic-ui-react";
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

    const propImage = property
      ? property.image
        ? `http://res.cloudinary.com/roostr-labpt2/image/upload/c_scale,q_80,r_0,w_640/v1556327124/${
            property.image
          }.jpg`
        : `https://res.cloudinary.com/roostr-labpt2/image/upload/c_fill,h_150,w_200/v1556771202/q01phvk7ecxb4ztfyll2.jpg`
      : null;

    return (
      <>
        {property && (
          <div
            style={{
              width: "50vw",
              height: "100vh",
              display: "flex",
              justifyContent: "space-between",
              margin: "1em",
              paddingTop: "2em"
            }}
          >
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

            <FlexColumn>
              <FlexRow justifyBetween>
                <FlexColumn
                  className="address"
                  spaceBottom
                  style={{ color: "gray", padding: "10px", width: "50%" }}
                >
                  <Header as="h1">{property.name}</Header>
                  <FlexRow wrap style={{ padding: "5px" }}>
                    {property.address1}
                  </FlexRow>
                  <FlexRow wrap style={{ padding: "5px" }}>
                    {property.city}, {property.state} {property.zip}
                  </FlexRow>
                  <FlexRow
                    style={{
                      width: "60%",
                      alignItems: "baseline",
                      marginTop: "10%"
                    }}
                  >
                    <FlexRow
                      style={{
                        marginTop: "5%",
                        width: "80%",
                        alignItems: "center"
                      }}
                    >
                      <Icon
                        name="moon outline"
                        size="large"
                        style={{ marginRight: "5%", color: "black" }}
                      />
                      <p style={{ marginLeft: "10%" }}>
                        ${property.price} per night
                      </p>
                    </FlexRow>

                    <FlexRow
                      style={{
                        marginTop: "1%",
                        width: "80%",
                        alignItems: "center"
                      }}
                    >
                      <Icon
                        name="user outline"
                        size="large"
                        style={{ marginRight: "5%", color: "black" }}
                      />
                      <p style={{ marginLeft: "10%" }}>
                        Guests: {property.occupants}
                      </p>
                    </FlexRow>
                  </FlexRow>
                  <FlexRow
                    style={{
                      marginTop: "40%",
                      width: "80%",
                      alignItems: "center",
                      marginBottom: "2%",
                      minHeight: "12vh"
                    }}
                  >
                    <Image
                      src={`https://res.cloudinary.com/roostr-labpt2/image/upload/c_lfill,g_center,h_500,w_400/v1556336341/${
                        property.assistants[0].image
                      }.jpg`}
                      size="tiny"
                      style={{ marginRight: "10px" }}
                    />

                    <FlexColumn
                      style={{
                        marginLeft: "5%",
                        alignItems: "flex-start"
                      }}
                    >
                      <Header as="h3">On Site Contact</Header>
                      <p>
                        <strong>Name:</strong>{" "}
                        {property.assistants.length
                          ? `${property.assistants[0].firstName}
                  ${property.assistants[0].lastName}`
                          : `Not Assigned`}
                      </p>
                    </FlexColumn>
                  </FlexRow>
                </FlexColumn>
                <FlexColumn style={{ width: "50%", alignItems: "flex-end" }}>
                  <Image
                    src={propImage}
                    style={{ width: "100%" }}
                    size="medium"
                  />
                  <FlexRow style={{ marginTop: "35%" }}>
                    <FlexColumn spaceBottom="20px" spaceTop="10%" />
                    <FlexRow>
                      {" "}
                      <Link to={`/dashboard/properties/edit/${property._id}`}>
                        <Button content="Edit" color="blue" />
                      </Link>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Button basic color="red" onClick={this.openModal}>
                        Delete
                      </Button>
                    </FlexRow>
                  </FlexRow>
                </FlexColumn>
              </FlexRow>
            </FlexColumn>
            <FlexColumn height="100%" justifyCenter />
          </div>
        )}
      </>
    );
  }
}
export default Property;
