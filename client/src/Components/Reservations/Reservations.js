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
  constructor() {
    super();

    this.state = {};

    this.panes = [
      {
        menuItem: "Upcoming",
        render: () => (
          <Tab.Pane attached={false}>
            <ReservationList status="upcoming" />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Incomplete",
        render: () => (
          <Tab.Pane attached={false}>
            <ReservationList status="incomplete" />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Complete",
        render: () => (
          <Tab.Pane attached={false}>
            <ReservationList status="complete" />
          </Tab.Pane>
        )
      },
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
    ];
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

  render() {
    return (
      <FlexColumn>
        <Header as="h1">Reservations</Header>
        <Tab menu={{ attached: false }} panes={this.panes} />
      </FlexColumn>
    );
  }
}
