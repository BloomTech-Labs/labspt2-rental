import React, { Component } from "react";
import {
  Input,
  Button,
  Dropdown,
  Form,
  Dimmer,
  Header
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FlexColumn } from "custom-components";
import MonthlyFeeModal from "./MonthlyFeeModal";
import ErrorModal from "./ErrorModal";

class PropertyAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      address2: null,
      occupants: null,
      assistants: [],
      errorModalOpen: false,
      priceModalOpen: false,
      dimmerOpen: false,
      modalMessage: "",
      modalSize: "mini"
    };
  }

  componentDidMount() {
    this.props.getEmployees();
    this.props.getProperties();
  }

  handleChange(prop, val) {
    this.setState({ [prop]: val });
  }

  handleSubmit = () => {
    const newProp = {
      name: this.state.name,
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      price: this.state.price,
      occupants: this.state.occupants,
      assistants: this.state.assistants,
      image: this.state.image,
      cleaningFee: this.state.cleaningFee
    };
    this.props.addProperty(newProp).then(response => {
      this.setState({
        dimmerOpen: true,
        priceModalOpen: false
      });
    });
  };
  successClose = () => {
    this.setState({
      dimmerOpen: false
    });
    this.props.history.push("/dashboard/properties");
  };

  modalClose = () => {
    this.setState({
      errorModalOpen: false,
      priceModalOpen: false
    });
  };

  handleModals = () => {
    const numOfProps = this.props.properties.length;
    const price =
      numOfProps >= 9
        ? (numOfProps + 1) * 5
        : numOfProps >= 1
        ? (numOfProps + 1) * 8
        : 0;
    if (
      this.state.name &&
      this.state.address1 &&
      this.state.city &&
      this.state.state &&
      this.state.zip &&
      this.state.price &&
      this.state.state.length === 2 &&
      this.state.zip.length === 5
    ) {
      this.setState({
        priceModalOpen: true,
        modalMessage: `Your monthly cost will now be $${price}.`,
        modalSize: "small"
      });
    } else if (this.state.state.length !== 2) {
      this.setState({
        modalMessage: "State must be 2 character abbreviation",
        errorModalOpen: true
      });
    } else if (this.state.zip.length !== 5) {
      this.setState({
        modalMessage: "Zip code must be in 5 digit format.",
        errorModalOpen: true
      });
    } else {
      this.setState({
        modalMessage: "All fields marked with an * are required.",
        errorModalOpen: true
      });
    }
  };
  render() {
    return (
      <FlexColumn>
        <h1>Create New Property</h1>
        <Form>
          <Form.Field
            control={Input}
            label="Name"
            style={{ margin: "5px" }}
            required
            placeholder="Required"
            onChange={e => this.handleChange("name", e.target.value)}
          />
          <Form.Field
            control={Input}
            required
            label="Address"
            style={{ margin: "5px" }}
            placeholder="Required"
            onChange={e => this.handleChange("address1", e.target.value)}
          />
          <Form.Field
            control={Input}
            label="Address 2"
            style={{ margin: "5px" }}
            placeholder="Optional"
            onChange={e => this.handleChange("address2", e.target.value)}
          />
          <Form.Group inline>
            <Form.Field
              control={Input}
              required
              label="City"
              style={{ margin: "5px" }}
              placeholder="Required"
              onChange={e => this.handleChange("city", e.target.value)}
            />
            <Form.Field
              control={Input}
              required
              label="State"
              style={{ margin: "5px" }}
              placeholder="Required (ST)"
              onChange={e => this.handleChange("state", e.target.value)}
            />
            <Form.Field
              control={Input}
              required
              label="Zip"
              style={{ margin: "5px" }}
              placeholder="Required"
              onChange={e => this.handleChange("zip", e.target.value)}
            />
          </Form.Group>
          <Form.Group widths={4}>
            <Form.Field
              control={Input}
              required
              label="Price per Night"
              style={{ margin: "5px" }}
              placeholder="Required"
              onChange={e => this.handleChange("price", e.target.value)}
            />
            <Form.Field
              control={Input}
              label="Cleaning Fee"
              style={{ margin: "5px" }}
              placeholder="Optional"
              onChange={e => this.handleChange("cleaningFee", e.target.value)}
            />
            <Form.Field
              control={Input}
              label="Max Guests"
              style={{ margin: "5px" }}
              placeholder="Optional"
              onChange={e => this.handleChange("occupants", e.target.value)}
            />
          </Form.Group>
          <Form.Field
            control={Dropdown}
            label="Assigned Employee"
            selection
            onChange={(e, val) => this.handleChange("assistants", val.value)}
            placeholder="Employee"
            options={
              this.props.employees &&
              this.props.employees.map(e => ({
                key: e._id,
                text: e.firstName + " " + e.lastName,
                value: e._id
              }))
            }
          />
          <Form.Group inline>
            <Form.Field
              control={Button}
              style={{ margin: "5px" }}
              basic
              color="blue"
              onClick={this.handleModals}
            >
              Create Property
            </Form.Field>
            <Link to={`/dashboard/properties/`}>
              <Form.Field control={Button} style={{ margin: "5px" }}>
                Cancel
              </Form.Field>
            </Link>
          </Form.Group>
        </Form>
        <MonthlyFeeModal
          size={this.state.size}
          open={this.state.priceModalOpen}
          modalMessage={this.state.modalMessage}
          submitHandler={this.handleSubmit}
        />
        <ErrorModal
          size={this.state.size}
          open={this.state.errorModalOpen}
          modalMessage={this.state.modalMessage}
          modalClose={this.modalClose}
        />
        <Dimmer
          size="fullscreen"
          active={this.state.dimmerOpen}
          page
          onClickOutside={this.successClose}
        >
          <Header as="h1" inverted>
            Property Added!
            <Header.Subheader>
              Click to return to Property List
            </Header.Subheader>
          </Header>
        </Dimmer>
      </FlexColumn>
    );
  }
}

export default PropertyAdd;
