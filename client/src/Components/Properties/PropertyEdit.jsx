import React, { Component } from "react";
import { FlexColumn, FlexRow } from "custom-components";
import { Input, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
class PropertyEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.match.params.id
    };
  }
  componentDidMount() {
    this.props.getProperties();
  }

  handleChange(prop, val) {
    this.setState({ [prop]: val });
  }

  handleSubmit = () => {
    this.props.updateProperty(this.state).then(response => {
      this.props.history.push(`/dashboard/properties/${this.state._id}`);
    });
  };

  render() {
    const property = this.props.properties.find(
      property => property._id === this.props.match.params.id
    );
    return (
      <>
        {property && (
          <FlexColumn>
            <h1>Edit {property.name}</h1>
            <Input
              label="Name"
              style={{ margin: "5px" }}
              defaultValue={property.name}
              placeholder={property.name}
              onChange={e => this.handleChange("name", e.target.value)}
            />
            <Input
              label="Address"
              style={{ margin: "5px" }}
              defaultValue={property.address1}
              placeholder={property.address1}
              onChange={e => this.handleChange("address1", e.target.value)}
            />
            <Input
              label="Address 2"
              style={{ margin: "5px" }}
              defaultValue={property.address2}
              placeholder={property.address2}
              onChange={e => this.handleChange("address2", e.target.value)}
            />
            <FlexRow>
              {" "}
              <Input
                label="City"
                style={{ margin: "5px" }}
                defaultValue={property.city}
                placeholder={property.city}
                onChange={e => this.handleChange("city", e.target.value)}
              />
              <Input
                label="State"
                style={{ margin: "5px" }}
                defaultValue={property.state}
                placeholder={property.state}
                onChange={e => this.handleChange("state", e.target.value)}
              />
              <Input
                label="Zip"
                style={{ margin: "5px" }}
                defaultValue={property.zip}
                placeholder={property.zip}
                onChange={e => this.handleChange("zip", e.target.value)}
              />
            </FlexRow>
            <Input
              label="Price per Night"
              style={{ margin: "5px" }}
              defaultValue={property.price}
              placeholder={property.price}
              onChange={e => this.handleChange("price", e.target.value)}
            />
            <Input
              label="Max Guests"
              style={{ margin: "5px" }}
              defaultValue={property.occupants}
              placeholder={property.occupants}
              onChange={e => this.handleChange("occupants", e.target.value)}
            />
            <Input
              label="Image URL"
              style={{ margin: "5px" }}
              defaultValue={property.image}
              placeholder={property.image}
              onChange={e => this.handleChange("image", e.target.value)}
            />
            <Link to={`/dashboard/properties/`}>
              <Button
                style={{ margin: "5px" }}
                color="green"
                onClick={this.handleSubmit}
              >
                Update
              </Button>
              <Button style={{ margin: "5px" }} color="red">
                Cancel
              </Button>
            </Link>
          </FlexColumn>
        )}
      </>
    );
  }
}

export default PropertyEdit;
