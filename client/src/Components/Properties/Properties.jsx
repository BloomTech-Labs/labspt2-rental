import React, { Component } from "react";
import PropertyCard from "./PropertyCard";
import { FlexColumn, FlexRow } from "custom-components";
import Search from "../shared/Search/Search";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

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

  addClickHandle = () => {
    const numOfProps = this.props.properties.length;
    if (numOfProps === 1) {
      window.alert("we're going to have to change the billing plan");
      this.props.history.push("/dashboard/settings");
      //this will need to go to update plan modal. not working right now.
    } else if (numOfProps === 9) {
      window.alert("this account needs the discounted rate");
      this.props.history.push("/dashboard/properties/add");
    } else {
      this.props.history.push("/dashboard/properties/add");
    }
  };

  render() {
    return (
      <FlexColumn width="800px" alignCenter style={{ position: "relative" }}>
        <FlexRow width="100%">
          <Search width="40%" />
          <Icon
            name="plus square"
            size="big"
            style={{ margin: "10px" }}
            onClick={this.addClickHandle}
          />
        </FlexRow>
        {this.props.properties.map(property => {
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
              assistants={
                property.assistants.length
                  ? `${property.assistants[0].firstName}`
                  : "Not Assigned"
              }
              occupants={property.occupants}
              buttonFunction={() => this.cardHandleClick(property._id)}
              linkto={`/dashboard/properties/${property._id}`}
            />
          );
        })}
      </FlexColumn>
    );
  }
}

export default Properties;
