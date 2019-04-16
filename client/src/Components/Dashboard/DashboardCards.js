import React, { Component } from "react";
import { Header, Icon, Label, List } from "semantic-ui-react";
import { FlexColumn, FlexRow } from "custom-components";

const DashboardCards = props => {
  // Takes in a title, icon, and up to two values, labels, and colors
  // the second value and label is optional
  return (
    <FlexRow justifyBetween width="50%" className="space-bottom-20">
      <FlexRow width="50%">
        <Icon name={props.iconName} size="big" className="space-top-20" />
        <Header as="h3" className="space-right">
          {props.title}
        </Header>
      </FlexRow>
      <List style={{ width: "50%" }}>
        <List.Item>
          <Label horizontal color={props.color1} >{props.value1}</Label>
          {props.label1}
        </List.Item>
        {props.label2 ? (
          <List.Item>
            <Label horizontal color={props.color2} >{props.value2}</Label>
            {props.label2}
          </List.Item>
        ) : null}
      </List>
    </FlexRow>
  );
};

export default DashboardCards;
