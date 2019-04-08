import React, { Component } from "react";
import { FlexColumn, FlexRow } from "custom-components";
import { Checkbox, Button, Image } from "semantic-ui-react";

class Property extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: {}
    };
  }

  componentDidMount() {
    this.props.getProperties();
  }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     properties: nextProps.properties
  //   });
  //   console.log(this.state.properties);
  // }
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
                  <p>{property.address}</p>
                  <p>
                    {property.city}, {property.state} {property.zip}
                  </p>
                </div>
                <div className="details">
                  <p>Price per night: ${property.price}</p>
                  <p>Max Guests: {property.occupants}</p>
                </div>
                <div>
                  <p>Default Employee: {property.assistants[0].firstName}</p>
                </div>
                <Checkbox label="Pause reservations" />
                <Button content="Edit" />
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
