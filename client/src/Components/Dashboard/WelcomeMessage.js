import React, { Fragment } from "react";
import { FlexRow, FlexColumn } from "custom-components";
import { Header } from "semantic-ui-react";
import { WelcomeImage } from "./welcome_undraw";

export const WelcomeMessage = props => {
  let welcome;
  if (!props.user) {
    welcome = null;
  } else if (props.mobile) {
    welcome = (
      <FlexColumn
        justifyAround
        alignCenter
        style={{ width: "90%", marginTop: "2em", marginBottom: "3em" }}
      >
        <Header as="h1" style={{ fontSize: "3.5em", marginBottom: "8%" }}>
          Welcome {props.user.firstName}!
        </Header>
        <WelcomeImage width={"200px"} />
      </FlexColumn>
    );
  } else {
    welcome = (
      <FlexRow
        justifyAround
        alignCenter
        style={{ width: "90%", marginTop: "0.5em", marginBottom: "0.5em" }}
      >
        <Header as="h1" style={{ fontSize: "3.5em", marginTop: "5%" }}>
          Welcome {props.user.firstName}!
        </Header>
        <WelcomeImage width={"200px"} />
      </FlexRow>
    );
  }
  return <Fragment>{welcome}</Fragment>;
};
