import React, { Component } from "react";
import { Header, Tab, Search, Button } from "semantic-ui-react";
import { FlexColumn, FlexRow } from "custom-components";
import ReservationList from "./ReservationList";
import faker from "faker";
import _ from "lodash";

const source = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, "$")
}));

export default class Reservations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      pageSize: 10,
      sort: "_id",
      filter: { status: "upcoming" },
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

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch)
      });
    }, 300);
  };

  handleTabChange = (e, data) => {
    const { page, pageSize, sort, filter, tabs } = this.state;
    this.setState({ filter: { status: tabs[data.activeIndex].toLowerCase() } });
    this.props.getReservations({ page, pageSize, sort, filter });
  };

  render() {
    const { tabs, reservations } = this.state;

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
                  <ReservationList status={tab} reservations={reservations} />
                </Tab.Pane>
              )
            })),
            {
              menuItem: (
                <Search
                  style={{ flexGrow: 1, flexShrink: 0 }}
                  input={{
                    icon: "search",
                    iconPosition: "left",
                    className: "input-square",
                    fluid: true
                  }}
                  onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true
                  })}
                  value={this.state.value}
                  {...this.props}
                />
              )
            }
          ]}
        />
      </FlexColumn>
    );
  }
}
