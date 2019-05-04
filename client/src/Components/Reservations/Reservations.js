import React, { Component } from "react";
import { Button, Header, Tab, Loader, Dimmer } from "semantic-ui-react";
import { FlexColumn, FlexRow } from "custom-components";
import ReservationList from "./ReservationList";
import Search from "../shared/Search/Search";
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

export default class Reservations extends Component {
  constructor(props) {
    super(props);

    this.query = {
      page: 1,
      pageSize: 3,
      sort: "_id",
      filter: { status: "upcoming" },
      search: ""
    };

    this.state = {
      tabs: ["Upcoming", "Incomplete", "Complete"]
    };
  }

  componentDidMount() {
    const { page, pageSize, sort, filter } = this.query;
    this.props.getReservations({ page, pageSize, sort, filter });
    this.props.fetchReservationCount("upcoming");
  }

  handleSearchChange = value => {
    this.query.search = value || "";
    this.props.searchReservations({ ...this.query });
  };

  handleTabChange = (e, data) => {
    const { tabs } = this.state;
    const activeTab = tabs[data.activeIndex].toLowerCase();
    this.query.filter = { status: activeTab };
    this.props.getReservations({ ...this.query });
    this.props.fetchReservationCount(activeTab);
  };

  handlePageChange = (event, data) => {
    this.query.page = data.activePage;
    this.props.getReservations({ ...this.query });
  };

  render() {
    const { pageSize } = this.query;
    const { tabs } = this.state;
    const { reservations, loading, reservationCount } = this.props;
    let loadingComponent;
    if (loading) {
      loadingComponent = (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      );
    } else {
      loadingComponent = (
        <Dimmer inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      );
    }
    return (
      <FlexColumn 
      // style={{ width: "65vw" }} 
      // alignCenter
      >
        {loadingComponent}
        <FlexRow width="full" justifyBetween alignCenter spaceBottom>
          <Header as="h1" style={{ margin: 0 }}>
            Reservations
          </Header>
          <Button
            as={DesktopButton}
            color="blue"
            onClick={() =>
              this.props.history.push("/dashboard/reservations/add")
            }
          >
            Create Reservation
          </Button>
          <Button
            as={MobileButton}
            color="blue"
            onClick={() =>
              this.props.history.push("/dashboard/reservations/add")
            }
          >
            Create
          </Button>
        </FlexRow>
        <CustomWidthTab
          // style={{ width: "60vw", marginBottom: "5px" }}
          onTabChange={this.handleTabChange}
          menu={{ attached: false }}
          panes={[
            ...tabs.map(tab => ({
              menuItem: tab,
              render: () => (
                <Tab.Pane attached={false}>
                  <ReservationList
                    status={tab}
                    loading={loading}
                    reservations={reservations}
                    count={Math.ceil(reservationCount / pageSize)}
                    handlePageChange={this.handlePageChange}
                  />
                </Tab.Pane>
              )
            })),
            {
              menuItem: (
                <Search
                  active="false"
                  onChange={this.handleSearchChange}
                  key="1"
                  style={{ minWidth: "230px", flexGrow: "1" }}
                />
              )
            }
          ]}
        />
      </FlexColumn>
    );
  }
}
