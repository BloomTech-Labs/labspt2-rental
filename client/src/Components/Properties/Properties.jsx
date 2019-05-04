import React, { Component } from "react";
import PropertyList from "./PropertyList";
import { FlexColumn, FlexRow } from "custom-components";
import Search from "../shared/Search/Search";
import { Button, Modal, Tab, Header, Dimmer, Loader } from "semantic-ui-react";
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

const CustomWidthTab = styled(Tab)`
  @media (max-width: 420px) {
    width: 85vw;
  }
  @media (min-width: 421px) and (max-width: 700px) {
    width: 85vw;
  }
  @media (min-width: 701px) {
    width: 65vw;
  }
  @media (min-width: 850px) {
    width: 75vw;
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
      pageSize: 3,
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
    const { properties, propertyCount } = this.props;
    const modal = (
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
    );
    const panes = [
      ...tabs.map(tab => ({
        menuItem: tab,
        render: () => (
          <Tab.Pane attached={false}>
            <PropertyList
              status={tab}
              loading={this.loading}
              properties={properties}
              count={Math.ceil(propertyCount / pageSize)}
              handlePageChange={this.handlePageChange}
            />
          </Tab.Pane>
        )
      })),
      {
        menuItem: (
          <Search
            active="false"
            key="a"
            onChange={this.handleSearchChange}
            style={{ minWidth: "230px", flexGrow: "1" }}
          />
        )
      }
    ];

    let renderComponent;
    if (this.props.loading) {
      renderComponent = (
        <FlexColumn 
        // style={{ width: "65vw" }} 
        // alignCenter
        >
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>

          <FlexRow width="full" justifyBetween alignCenter spaceBottom>
            <Header as="h1" style={{ margin: 0 }}>
              Properties
            </Header>

            <Button
              as={DesktopButton}
              color="blue"
              onClick={this.addClickHandle}
            >
              Create Property
            </Button>
            <Button
              as={MobileButton}
              color="blue"
              onClick={this.addClickHandle}
            >
              Create
            </Button>
          </FlexRow>

          <CustomWidthTab
            // style={{ width: "60vw" }}
            onTabChange={this.handleTabChange}
            menu={{ attached: false }}
            panes={panes}
          />
        </FlexColumn>
      );
    } else {
      renderComponent = (
        <FlexColumn 
        // style={{ width: "65vw" }} 
        // alignCenter
        >
          {modal}

          <FlexRow width="full" justifyBetween alignCenter spaceBottom>
            <Header as="h1" style={{ margin: 0 }}>
              Properties
            </Header>

            <Button
              as={DesktopButton}
              color="blue"
              onClick={this.addClickHandle}
            >
              Create Property
            </Button>
            <Button
              as={MobileButton}
              color="blue"
              onClick={this.addClickHandle}
            >
              Create
            </Button>
          </FlexRow>

          <CustomWidthTab
            // style={{ width: "60vw" }}
            onTabChange={this.handleTabChange}
            menu={{ attached: false }}
            panes={panes}
          />
        </FlexColumn>
      );
    }

    return <React.Fragment>{renderComponent}</React.Fragment>;
  }
}

export default Properties;
