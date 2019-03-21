import React, { Component } from "react";
import PropertyCard from "./PropertyCard";
import { FlexColumn, FlexRow } from "custom-components";
import Search from "../../shared/Search/Search";
import DatePicker from "../../shared/DatePicker/DatePicker";

class Properties extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getProperties();
  }

  cardHandleClick = id => {
    this.props.history.push(`/dashboard/properties/${id}`);
  };
  render() {
    return (
      <FlexColumn width="800px" alignCenter style={{ position: "relative" }}>
        <FlexRow>
          <Search />
          <DatePicker />
        </FlexRow>
        {this.props.properties.map(property => {
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
