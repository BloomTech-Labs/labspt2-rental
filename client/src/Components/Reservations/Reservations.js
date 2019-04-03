import React, { Component } from "react";
import { Header, Tab, Button } from "semantic-ui-react";
import { FlexColumn, FlexRow } from "custom-components";
import ReservationList from "./ReservationList";
import Search from "../shared/Search/Search";
import ReservationAdd from "./ReservationAdd";

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
  }

  handleSearchChange = value => {
    this.query.search = value || "";
    this.props.searchReservations({ ...this.query });
  };

  handleTabChange = (e, data) => {
    const { tabs } = this.state;
    this.query.filter = { status: tabs[data.activeIndex].toLowerCase() };
    this.props.getReservations({ ...this.query });
  };

  handlePageChange = (event, data) => {
    this.query.page = data.activePage;
    this.props.getReservations({ ...this.query });
  };

  render() {
    const { tabs, page, pageSize } = this.state;
    const { reservations, loading } = this.props;

    return (
      <FlexColumn>
        <Header as="h1">Reservations</Header>
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
                    handlePageChange={this.handlePageChange}
                  />
                </Tab.Pane>
              )
            })),
            {
              menuItem: <Search onChange={this.handleSearchChange} />
            }
          ]}
        />
      </FlexColumn>
    );
  }
}
