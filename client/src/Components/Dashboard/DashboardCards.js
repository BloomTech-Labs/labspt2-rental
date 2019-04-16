import React, { Component } from "react";
import { Header, Icon } from "semantic-ui-react";
import { FlexColumn, FlexRow } from "custom-components";

const DashboardCards = props => {
  return (
    <FlexColumn alignCenter width="full" className="space-bottom-20">
      <FlexRow>
        <Icon name={props.iconName} size="big" className='space-top-20' />
        <Header as="h3">{props.title}</Header>
      </FlexRow>
    </FlexColumn>
  );
};

export default DashboardCards;
