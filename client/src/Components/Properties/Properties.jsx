import React, { Component } from "react";
import PropertyList from "./PropertyList";
import { FlexColumn, FlexRow } from "custom-components";
import Search from "../shared/Search/Search";
import { Button, Modal, Tab, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DesktopButton = styled.button`
  &&& {
    margin: 0;
    @media (max-width: 420px) {
      display: none;
    }
  }
`;

const MobileButton = styled.button`
  &&& {
    margin: 0;
    @media (min-width: 421px) {
      display: none;
    }
  }
`;

class Properties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      tabs: ["Active", "Inactive"]
    };
    this.query = {
      page: 1,
      pageSize: 4,
      sort: "_id",
      filter: { active: true },
      search: ""
    };
  }

  componentDidMount() {
    const { page, pageSize, sort, filter } = this.query;
    this.props.getProperties({ page, pageSize, sort, filter });
    this.props.fetchPropertyCount(filter);
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

  handleTabChange = (e, data) => {
    const { tabs } = this.state;
    const activeTab = tabs[data.activeIndex].toLowerCase();
    this.query.filter =
      activeTab === "active" ? { active: true } : { active: false };
    this.props.getProperties({ ...this.query });
    this.props.fetchPropertyCount(this.query.filter);
  };

  handlePageChange = (event, data) => {
    this.query.page = data.activePage;
    this.props.getProperties({ ...this.query });
  };

  render() {
    const { pageSize } = this.query;
    const { tabs } = this.state;
    const { properties, loading, propertyCount } = this.props;

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
        <FlexRow width="full" justifyBetween alignCenter spaceBottom>
          <Header as="h1" style={{ margin: 0 }}>
            Properties
          </Header>

          <Button
            as={DesktopButton}
            color="orange"
            onClick={this.addClickHandle}
          >
            Create Property
          </Button>
          <Button
            as={MobileButton}
            color="orange"
            onClick={this.addClickHandle}
          >
            Create
          </Button>
        </FlexRow>

        <Tab
          onTabChange={this.handleTabChange}
          menu={{ attached: false }}
          panes={[
            ...tabs.map(tab => ({
              menuItem: tab,
              render: () => (
                <Tab.Pane attached={false}>
                  <PropertyList
                    status={tab}
                    loading={loading}
                    properties={properties}
                    count={Math.ceil(propertyCount / pageSize)}
                    handlePageChange={this.handlePageChange}
                  />
                </Tab.Pane>
              )
            })),
            {
              menuItem: (
                <>
                  <Search
                    onChange={this.handleSearchChange}
                    style={{ minWidth: "300px", flexGrow: "1" }}
                  />
                </>
              )
            }
          ]}
        />
      </FlexColumn>
    );
  }
}

export default Properties;
