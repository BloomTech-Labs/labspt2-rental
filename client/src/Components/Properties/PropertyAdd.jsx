import React, { Component } from "react";
import { Input, Button, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FlexColumn, FlexRow } from "custom-components";

class PropertyAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "https://i.imgur.com/Cn7QlCX.jpg"
    };
  }

  componentDidMount() {
    this.props.getEmployees();
  }

  handleChange(prop, val) {
    this.setState({ [prop]: val });
  }

  handleSubmit = () => {
    this.props.addProperty(this.state).then(response => {
      console.log(response);
      this.props.history.push(`/dashboard/properties/`);
    });
  };
  render() {
    return (
      <FlexColumn>
        <h1>Create New Property</h1>
        <Input
          label="Name"
          style={{ margin: "5px" }}
          placeholder="Required"
          onChange={e => this.handleChange("name", e.target.value)}
        />
        <Input
          label="Address"
          style={{ margin: "5px" }}
          placeholder="Required"
          onChange={e => this.handleChange("address1", e.target.value)}
        />
        <Input
          label="Address 2"
          style={{ margin: "5px" }}
          placeholder="Optional"
          onChange={e => this.handleChange("address2", e.target.value)}
        />
        <FlexRow>
          <Input
            label="City"
            style={{ margin: "5px" }}
            placeholder="Required"
            onChange={e => this.handleChange("city", e.target.value)}
          />
          <Input
            label="State"
            style={{ margin: "5px" }}
            placeholder="Required"
            onChange={e => this.handleChange("state", e.target.value)}
          />
          <Input
            label="Zip"
            style={{ margin: "5px" }}
            placeholder="Required"
            onChange={e => this.handleChange("zip", e.target.value)}
          />
        </FlexRow>
        <Input
          label="Price per Night"
          style={{ margin: "5px" }}
          placeholder="Required"
          onChange={e => this.handleChange("price", e.target.value)}
        />
        <Input
          label="Max Guests"
          style={{ margin: "5px" }}
          placeholder="Optional"
          onChange={e => this.handleChange("occupants", e.target.value)}
        />
        <Input
          label="Image URL"
          style={{ margin: "5px" }}
          placeholder="Optional"
          onChange={e => this.handleChange("image", e.target.value)}
        />
        <Dropdown
          selection
          onChange={(e, val) => this.handleChange("assistants", val.value)}
          placeholder="Employee"
          options={
            this.props.loading
              ? [{ text: "Loading...", value: "loading" }]
              : this.props.employees &&
                this.props.employees.map(e => ({
                  key: e._id,
                  text: e.firstName + " " + e.lastName,
                  value: e._id
                }))
          }
        />
        <Link to={`/dashboard/properties/`}>
          <Button
            style={{ margin: "5px" }}
            color="green"
            onClick={this.handleSubmit}
          >
            Create Property
          </Button>
          <Button style={{ margin: "5px" }} color="red">
            Cancel
          </Button>
        </Link>
      </FlexColumn>
    );
  }
}

export default PropertyAdd;
