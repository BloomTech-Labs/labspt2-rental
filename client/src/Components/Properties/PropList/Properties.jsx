import React, { Component } from "react";
import PropertyCard from "./PropertyCard";
import { FlexColumn } from "custom-components";

class Properties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      properties: nextProps.properties
    });
  }
  cardHandleClick = id => {
    this.props.history.push(`/dashboard/properties/${id}`);
  };
  render() {
    return (
      <FlexColumn width="800px" alignCenter style={{ position: "relative" }}>
        {this.state.properties.map(property => {
          return (
            <PropertyCard
              imageLoc={property.image}
              header={property.name}
              lineOneInfo={property.address}
              lineTwoInfo={property.assistants}
              lineThreeInfo={property.occupants}
              buttonFunction={() => this.cardHandleClick(property._id)}
            />
          );
        })}
      </FlexColumn>
    );
  }
}

export default Properties;
