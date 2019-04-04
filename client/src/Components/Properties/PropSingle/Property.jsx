import React, { Component } from "react";
import { FlexColumn, FlexRow } from "custom-components";
import { Checkbox, Button } from "semantic-ui-react";

class Property extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      price: 0,
      cleaningFee: 0,
      maxGuests: 0,
      employee: "",
      imageLoc: "",
      loading: false,
      error: null
    };
  }
  componentDidMount() {
    this.props.getProperty();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
      address: nextProps.address,
      city: nextProps.city,
      state: nextProps.state,
      zip: nextProps.zip,
      price: nextProps.price,
      cleaningFee: nextProps.cleaningFee,
      maxGuests: nextProps.maxGuests,
      employee: nextProps.employee,
      imageLoc: nextProps.imageLoc,
      loading: nextProps.loading,
      error: nextProps.error
    });
  }
  render() {
    return (
      <div>
        <FlexRow>
          <FlexColumn>
            <h1>{this.props.name}</h1>
            <div className="address">
              <p>{this.props.address}</p>
              <p>
                {this.props.city}, {this.props.state} {this.props.zip}
              </p>
            </div>
            <div className="details">
              <p>Price per night: ${this.props.price}</p>
              <p>Cleaning Fee: ${this.props.cleanFee}</p>
              <p>Max Guests: {this.props.guests}</p>
            </div>
            <div>
              <p>Default Employee: {this.props.employeeName}</p>
            </div>
            <Checkbox label="Pause reservations" />
            <Button content="Edit" />
          </FlexColumn>
          <FlexColumn>
            <Image src={this.props.imageLoc} size="medium" />
          </FlexColumn>
        </FlexRow>
      </div>
    );
  }
}

export default Property;
