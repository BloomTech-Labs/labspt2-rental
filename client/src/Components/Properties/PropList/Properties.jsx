import React, { Component } from "react";
import PropertyCard from "./PropertyCard";
import { FlexColumn, FlexRow } from "custom-components";
import Search from "../../shared/Search/Search";
import DatePicker from "../../shared/DatePicker/DatePicker";

class Properties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      loading: false,
      error: null
    };
  }
  componentDidMount() {
    this.props.getProperties();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      properties: nextProps.properties,
      loading: nextProps.loading,
      error: nextProps.error
    });
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
        {console.log(this.props)}
        {this.state.properties.map(property => {
          return (
            <PropertyCard
              image={property.image}
              name={property.name}
              address={
                property.address1 +
                " " +
                property.city +
                " " +
                property.state +
                " " +
                property.zip
              }
              assistants={property.assistants[0].firstName}
              occupants={property.occupants}
              buttonFunction={() => this.cardHandleClick(property._id)}
              linkto={`/dashboard/reservations/${property._id}`}
            />
          );
        })}
      </FlexColumn>
    );
  }
}

export default Properties;
