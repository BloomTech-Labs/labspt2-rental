import React, { Component } from "react";
import { FlexColumn, FlexRow } from "custom-components";
import { Checkbox, Button, Image } from "semantic-ui-react";

class Property extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "TEST HOUSE",
      address: "TEST ADDRESS",
      city: "TEST CITY",
      state: "NH",
      zip: "00333",
      price: 150,
      cleaningFee: "pull in info from reservation",
      maxGuests: 2,
      employee: "TEST EMPLOYEE",
      imageLoc: "https://unsplash.com/photos/yFV39g6AZ5o",
      loading: false,
      error: null
    };
  }
  componentDidMount() {
    this.props.getProperty("5c91ae4520957e5332396d0d");
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     name: nextProps.name,
  //     address: nextProps.address,
  //     city: nextProps.city,
  //     state: nextProps.state,
  //     zip: nextProps.zip,
  //     price: nextProps.price,
  //     maxGuests: nextProps.occupants,
  //     employee: nextProps.assistants[0],
  //     imageLoc: nextProps.image,
  //     loading: nextProps.loading,
  //     error: nextProps.error
  //   });
  // }
  render() {
    return (
      <div>
        <FlexRow>
          <FlexColumn>
            <h1>{this.state.name}</h1>
            <div className="address">
              <p>{this.state.address}</p>
              <p>
                {this.state.city}, {this.state.state} {this.state.zip}
              </p>
            </div>
            <div className="details">
              <p>Price per night: ${this.state.price}</p>
              <p>Cleaning Fee: ${this.state.cleanFee}</p>
              <p>Max Guests: {this.state.guests}</p>
            </div>
            <div>
              <p>Default Employee: {this.state.employeeName}</p>
            </div>
            <Checkbox label="Pause reservations" />
            <Button content="Edit" />
          </FlexColumn>
          <FlexColumn>
            <Image src={this.state.imageLoc} size="medium" />
          </FlexColumn>
        </FlexRow>
      </div>
    );
  }
}

export default Property;
