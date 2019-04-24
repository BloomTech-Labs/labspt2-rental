import React, { Component } from "react";
import { FlexColumn, FlexRow } from "custom-components";
import { Input, Button, Dropdown, Checkbox, Form } from "semantic-ui-react";
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
    this.props.getEmployees();
  }

  handleChange(prop, val) {
    this.setState({ [prop]: val });
  }

  handleSubmit = () => {
    this.props.updateProperty(this.state).then(response => {
      this.props.history.push(`/dashboard/properties/view/${this.state._id}`);
    });
  };

  checkboxHandler = e => {
    const checked = document.getElementById("checkbox").checked;
    if (checked) {
      this.setState({
        active: false
      });
    } else {
      this.setState({
        active: true
      });
    }
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
            <Form>
              <Form.Field
                control={Input}
                label="Name"
                style={{ margin: "5px" }}
                defaultValue={property.name}
                placeholder={property.name}
                onChange={e => this.handleChange("name", e.target.value)}
              />
              <Form.Field
                control={Input}
                label="Address"
                style={{ margin: "5px" }}
                defaultValue={property.address1}
                placeholder={property.address1}
                onChange={e => this.handleChange("address1", e.target.value)}
              />
              <Form.Field
                control={Input}
                label="Address 2"
                style={{ margin: "5px" }}
                defaultValue={property.address2}
                placeholder={
                  property.address2 ? property.address2 : "Address 2"
                }
                onChange={e => this.handleChange("address2", e.target.value)}
              />
              <Form.Group inline>
                <Form.Field
                  control={Input}
                  label="City"
                  style={{ margin: "5px" }}
                  defaultValue={property.city}
                  placeholder={property.city}
                  onChange={e => this.handleChange("city", e.target.value)}
                />
                <Form.Field
                  control={Input}
                  label="State"
                  style={{ margin: "5px" }}
                  defaultValue={property.state}
                  placeholder={property.state}
                  onChange={e => this.handleChange("state", e.target.value)}
                />
                <Form.Field
                  control={Input}
                  label="Zip"
                  style={{ margin: "5px" }}
                  defaultValue={property.zip}
                  placeholder={property.zip}
                  onChange={e => this.handleChange("zip", e.target.value)}
                />
              </Form.Group>
              <Form.Group widths={4}>
                <Form.Field
                  control={Input}
                  label="Price per Night"
                  style={{ margin: "5px" }}
                  defaultValue={property.price}
                  placeholder={property.price}
                  onChange={e => this.handleChange("price", e.target.value)}
                />
                <Form.Field
                  control={Input}
                  label="Cleaning Fee"
                  style={{ margin: "5px" }}
                  defaultValue={property.cleaningFee}
                  placeholder={property.cleaningFee}
                  onChange={e =>
                    this.handleChange("cleaningFee", e.target.value)
                  }
                />
                <Form.Field
                  control={Input}
                  label="Max Guests"
                  style={{ margin: "5px" }}
                  defaultValue={property.occupants}
                  placeholder={property.occupants}
                  onChange={e => this.handleChange("occupants", e.target.value)}
                />
              </Form.Group>
              <Form.Field
                control={Input}
                label="Image URL"
                style={{ margin: "5px" }}
                defaultValue={property.image}
                placeholder={property.image}
                onChange={e => this.handleChange("image", e.target.value)}
              />
              <Form.Field
                control={Dropdown}
                selection
                onChange={(e, val) =>
                  this.handleChange("assistants", val.value)
                }
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
              <Form.Field
                control={Checkbox}
                id="checkbox"
                defaultChecked={
                  this.props.loading ? false : property.active ? false : true
                }
                label="Pause reservations"
                onClick={this.checkboxHandler}
              />

              <Form.Group inline style={{ margin: 0 }}>
                <FlexRow width="full" justifyEnd>
                  <Link to={`/dashboard/properties/`}>
                    <Button control={Button} style={{ margin: "5px" }}>
                      Cancel
                    </Button>
                    <Button
                      control={Button}
                      style={{ margin: "5px" }}
                      color="blue"
                      onClick={this.handleSubmit}
                    >
                      Update
                    </Button>
                  </Link>
                </FlexRow>
              </Form.Group>
            </Form>
          </FlexColumn>
        )}
      </>
    );
  }
}

export default PropertyEdit;
