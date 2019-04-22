import React, { Component } from "react";
import { FlexColumn, FlexRow } from "custom-components";
import { Checkbox, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { END_DATE } from "react-dates/lib/constants";
import styled from "styled-components";

const Label = styled.span`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
  margin-right: 5px;
`;

const Text = styled.span`
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
`;

class Property extends Component {
  componentDidMount() {
    this.props.getProperties();
    this.props.getReservations();
  }

  handleDelete = () => {
    const reservationMatch = this.props.reservations.map(reservation => {
      if (reservation.property == null) {
        return false;
      } else if (reservation.property._id === this.props.match.params.id) {
        return true;
      } else return false;
    });
    console.log(reservationMatch);
    if (reservationMatch.includes(true)) {
      window.alert("Active reservation, property cannot be deleted");
    } else {
      this.props.deleteProperty(this.props.match.params.id);
      window.alert("Property has been deleted");
      this.props.history.push("/dashboard/properties");
    }
  };

  render() {
    const property = this.props.properties.find(
      property => property._id === this.props.match.params.id
    );

    return (
      <>
        {property && (
          <div>
            <FlexRow>
              <FlexColumn justifyBetween>
                <h1>{property.name}</h1>
                <FlexColumn
                  className="address"
                  spaceBottom
                  style={{ color: "gray" }}
                >
                  <FlexRow wrap>{property.address1}</FlexRow>
                  <FlexRow wrap style={{ maxWidth: "200px" }}>
                    {property.city}, {property.state} {property.zip}
                  </FlexRow>
                </FlexColumn>

                <FlexColumn spaceBottom="20px">
                  <FlexRow>
                    <Label>Price per night: </Label>
                    <Text>${property.price}</Text>
                  </FlexRow>
                  <FlexRow>
                    <Label>Max Guests:</Label>
                    <Text> {property.occupants}</Text>
                  </FlexRow>
                  <FlexRow>
                    <Label>Default Employee:</Label>
                    <Text>
                      {property.assistants.length
                        ? `${property.assistants[0].firstName}`
                        : "Not Assigned"}
                    </Text>
                  </FlexRow>
                </FlexColumn>

                <FlexRow>
                  <Link to={`/dashboard/properties/edit/${property._id}`}>
                    <Button content="Edit" />
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button basic color="red" onClick={this.handleDelete}>
                    Delete
                  </Button>
                </FlexRow>
              </FlexColumn>
              <FlexColumn height="100%" justifyCenter>
                <Image rounded src={property.image} size="medium" />
              </FlexColumn>
            </FlexRow>
          </div>
        )}
      </>
    );
  }
}

export default Property;
