import React, { Component } from "react";
import { Button, Header, Tab } from "semantic-ui-react";
import { FlexColumn, FlexRow } from "custom-components";
import ReservationList from "./ReservationList";
import Search from "../shared/Search/Search";
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

export default class Reservations extends Component {
  constructor(props) {
    super(props);

    this.query = {
      page: 1,
      pageSize: 4,
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

    return (
      <FlexColumn>
        <FlexRow width="full" justifyBetween alignCenter spaceBottom>
          <Header as="h1" style={{ margin: 0 }}>
            Reservations
          </Header>
          <Button
            as={DesktopButton}
            color="orange"
            onClick={() =>
              this.props.history.push("/dashboard/reservations/add")
            }
          >
            Create Reservation
          </Button>
          <Button
            as={MobileButton}
            color="orange"
            onClick={() =>
              this.props.history.push("/dashboard/reservations/add")
            }
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
                  onChange={this.handleSearchChange}
                  key="1"
                  style={{ minWidth: "300px", flexGrow: "1" }}
                />
              )
            }
          ]}
        />
      </FlexColumn>
    );
  }
}
