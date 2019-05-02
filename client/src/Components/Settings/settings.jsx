import React, { Component } from "react";
import { Tab, Segment, Dimmer, Loader } from "semantic-ui-react";
import { Container } from '../../custom-components/index';
import Billing from "./billing";
import Account from "./account.js";

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.loading = this.props.loading;

    this.panes = [
      {
        menuItem: "Account",
        render: () => (
          <Tab.Pane attached={false}>
            <Account
              user={this.props.user}
              getUser={this.props.getUser}
              update={this.props.updateUser}
              updatePassword={this.props.updatePassword}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Billing",
        render: () => (
          <Tab.Pane attached={false}>
            <Billing
              user={this.props.user}
              getUser={this.props.getUser}
              update={this.props.updateUser}
              properties={this.props.properties}
              subscription={this.props.subscription}
              getSubscription={this.props.getSubscription}
            />
          </Tab.Pane>
        )
      }
    ];
  }

  componentDidMount = () => {
    this.props.getUser();
    this.props.getProperties().catch(err => console.log(err));
  };

  render() {
    let loading;
    if (this.loading) {
      loading = (
        <Container style={{ height: "100vh", width: "65vw", display: 'flex', alignItems: 'center'}}>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Tab menu={{ attached: false }} panes={this.panes} />
        </Container>
      );
    } else {
      loading = <Tab menu={{ attached: false }} panes={this.panes} />;
    }

    return <React.Fragment style={{ height: "100vh", width: "65vw", display: 'flex', alignItems: 'center'}} >{loading}</React.Fragment>;
  }
}
