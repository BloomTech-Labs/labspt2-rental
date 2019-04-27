import React from "react";
import { Header, Icon, Label, List, Popup } from "semantic-ui-react";
import { FlexRow } from "custom-components";

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
        <Popup
          trigger={
            <List.Item>
              <Label horizontal color={props.color1}>
                {props.value1}
              </Label>
              {props.label1}
            </List.Item>
          }
          content={props.popupText1}
        />
        {props.label2 ? (
          <Popup
            trigger={
              <List.Item>
                <Label horizontal color={props.color2}>
                  {props.value2}
                </Label>
                {props.label2}
              </List.Item>
            }
            content={props.popupText2}
          />
        ) : null}
      </List>
    </FlexRow>
  );
};

export default DashboardCards;
