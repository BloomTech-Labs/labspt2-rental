import React, { Component } from "react";
import { FlexColumn, FlexRow } from "custom-components";
import { Checkbox, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Property extends Component {
  componentDidMount() {
    console.log("properties cdm");
    this.props.getProperties();
    this.props.getReservations();
  }

  handleDelete = () => {
    console.log(this.props);
    const reservation = this.props.reservations.find(
      reservation => reservation.property === this.props.match.params.id
    );
    if (reservation) {
      window.alert("Active reservation, property cannot be deleted");
    } else {
      this.props.deleteProperty(reservation._id);
      window.alert("Property has been deleted");
      this.props.history.push("/dashboard/properties");
    }
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
                    {property.assistants.length
                      ? `${property.assistants[0].firstName}`
                      : "Not Assigned"}
                  </p>
                </div>
                <Checkbox label="Pause reservations" />
                <Link to={`/dashboard/properties/edit/${property._id}`}>
                  <Button content="Edit" />
                </Link>
                <Button color="red" onClick={this.handleDelete}>
                  Delete
                </Button>
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
