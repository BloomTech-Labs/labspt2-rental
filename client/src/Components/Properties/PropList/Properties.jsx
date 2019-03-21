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
      loading: true,
      error: false,
      page: 1,
      pageSize: 4,
      sort: "_id",
      search: ""
    };
  }
  componentDidMount() {
    const { page, pageSize, sort, filter } = this.state;
    this.props.getProperties({ page, pageSize, sort, filter });
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
        <FlexRow>
          <Search />
          <DatePicker />
        </FlexRow>
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
