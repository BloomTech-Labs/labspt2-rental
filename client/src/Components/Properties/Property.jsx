import React, { Component } from "react";
import { FlexColumn, FlexRow } from "custom-components";
import { Checkbox, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Property extends Component {
  componentDidMount() {
    this.props.getProperties();
  }

  render() {
    const property = this.props.properties.find(
      property => property._id === this.props.match.params.id
    );
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
                  <p>Default Employee: {property.assistants[0].firstName}</p>
                </div>
                <Checkbox label="Pause reservations" />
                <Link to={`/dashboard/properties/edit/${property._id}`}>
                  <Button content="Edit" />
                </Link>
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
