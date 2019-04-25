import React, { Component } from "react";
import PropertyCard from "./PropertyCard";
import { FlexColumn, FlexRow, Divider } from "custom-components";
import Search from "../shared/Search/Search";
import { Button, Segment, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Properties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
    this.query = {
      page: 1,
      pageSize: 4,
      sort: "_id",
      filter: { active: true },
      search: ""
    };
  }

  //ADD ACTIVE AND INACTIVE TABS, ADD PAGINATION, CHANGE GET PROPERTIES METHOD TO USE THE QUERY.
  componentDidMount() {
    this.props.getProperties();
  }
  handleSearchChange = value => {
    this.query.search = value || "";
    this.props.searchProperties({ ...this.query });
  };
  closeModal = () => {
    this.setState({ modalOpen: false });
  };
  addClickHandle = () => {
    const numOfProps = this.props.properties.length;
    if (numOfProps === 1) {
      this.setState({ modalOpen: true });
    } else {
      this.props.history.push("/dashboard/properties/add");
    }
  };

  render() {
    return (
      <FlexColumn width="800px" alignCenter style={{ position: "relative" }}>
        <Modal size="small" open={this.state.modalOpen}>
          <Modal.Content>
            <p>
              We're glad you're enjoying Roostr! To add another property, please
              visit your settings to update to our paid plan!
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Link to="/dashboard/settings">
              <Button color="blue">Continue to Settings</Button>
            </Link>
            <Button onClick={this.closeModal}>Cancel</Button>
          </Modal.Actions>
        </Modal>
        <Segment
          as={FlexRow}
          alignCenter
          width="100%"
          style={{ padding: "5px" }}
        >
          <Search
            style={{ flexGrow: "1", marginRight: "10px" }}
            onChange={this.handleSearchChange}
          />
          <Button
            className="space-left-20 space-right-20"
            circular
            icon="plus"
            color="orange"
            onClick={this.addClickHandle}
          />
        </Segment>

        {!this.props.loading &&
          this.props.properties &&
          this.props.properties.map(property => {
            return (
              <>
                <PropertyCard
                  key={property._id}
                  id={property._id}
                  image={property.image}
                  name={property.name}
                  address={property.address1}
                  addressFull={
                    property.address1 +
                    " " +
                    property.city +
                    " " +
                    property.state +
                    " " +
                    property.zip
                  }
                  assistants={
                    property.assistants != null && property.assistants.length
                      ? `${property.assistants[0].firstName}`
                      : "Not Assigned"
                  }
                  occupants={property.occupants}
                  buttonFunction={() => this.cardHandleClick(property._id)}
                  linkto={`/dashboard/properties/view/${property._id}`}
                />
                <Divider />
              </>
            );
          })}
      </FlexColumn>
    );
  }
}

export default Properties;
