import React, { Component } from "react";
import { Header, Tab, Button } from "semantic-ui-react";
import { FlexColumn, FlexRow } from "custom-components";
import ReservationList from "./ReservationList";
import Search from "../shared/Search/Search";

export default class Reservations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      pageSize: 4,
      sort: "_id",
      filter: { status: "upcoming" },
      search: "",
      loading: true,
      error: false,
      tabs: ["Upcoming", "Incomplete", "Complete"],
      reservations: []
    };
  }

  componentDidMount() {
    const { page, pageSize, sort, filter } = this.state;
    this.props.getReservations({ page, pageSize, sort, filter });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      reservations: nextProps.reservations,
      loading: nextProps.loading,
      error: nextProps.error
    });
  }

  handleSearchChange = value => {
    const { page, pageSize, sort, filter } = this.state;
    const search = value || "";
    this.setState({ search });
    this.props.searchReservations({ page, pageSize, sort, search, filter });
  };

  handleTabChange = (e, data) => {
    const { page, pageSize, sort, tabs } = this.state;
    const filter = { status: tabs[data.activeIndex].toLowerCase() };
    this.setState({ filter });
    this.props.getReservations({ page, pageSize, sort, filter });
  };

  render() {
    const { tabs, reservations, page, pageSize } = this.state;

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
                    reservations={reservations}
                    page={page}
                    pageSize={pageSize}
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
