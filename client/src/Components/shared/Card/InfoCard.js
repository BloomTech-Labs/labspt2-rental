import React, { Component } from "react";
import {
  Header,
  Image,
  Button,
  Icon,
  Popup,
  Label,
  Statistic,
  Responsive
} from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";
import { Link } from "react-router-dom";

const title = ({ children }) => (
  <Header size="medium" style={{ margin: "0" }}>
    {children}&nbsp;
  </Header>
);
const image = ({ children }) =>
  children ? (
    <Image rounded src={children} size="small" />
  ) : (
    <Icon className="space-left-20" name="user circle" size="massive" />
  );
const id = ({ children }) => (
  <Popup
    trigger={
      <Label circular style={{ marginLeft: "10px" }}>
        <Icon fitted name="info" />
      </Label>
    }
    content={children}
  />
);
const label = ({ children, hover }) => (
  <Popup
    trigger={<Label as="a" color="blue" content={children} icon="home" />}
    content={hover}
  />
);
const statA = ({ children, label }) => (
  <Statistic size="tiny" style={{ margin: "0 15px 0 0" }}>
    <Statistic.Label>{label}</Statistic.Label>
    <Statistic.Value>{children}</Statistic.Value>
  </Statistic>
);
const statB = ({ children, label }) => (
  <Statistic size="tiny" style={{ margin: "0 15px" }}>
    <Statistic.Label>{label}</Statistic.Label>
    <Statistic.Value>{children}</Statistic.Value>
  </Statistic>
);
class InfoCard extends Component {
  static Title = title;
  static Image = image;
  static ID = id;
  static Label = label;
  static StatA = statA;
  static StatB = statB;

  render() {
    const props = this.props;

    let components = {};
    React.Children.map(props.children, child => {
      components[child.type.name] = child;
      return null;
    });

    return (
      <>
        {/* Desktop view */}
        <Responsive minWidth={701}>
          <FlexRow alignCenter justifyBetween width="full" wrap>
            {components.image}

            <FlexColumn grow="1" spaceLeft="20px" spaceRight="20px">
              <FlexRow alignCenter spaceBottom="10px">
                {components.title}
                {components.id}
              </FlexRow>

              {components.label}
            </FlexColumn>

            <FlexRow grow="1" justifyBetween spaceTop>
              <FlexRow spaceRight="20px">
                {components.statA}
                {components.statB}
              </FlexRow>

              <FlexColumn>
                <Link to={props.link}>
                  <Button style={{ margin: "10px 0" }}>
                    {props.linkName || "More Info"}
                  </Button>
                </Link>
              </FlexColumn>
            </FlexRow>
          </FlexRow>
        </Responsive>
      </>
    );
  }
}

export default InfoCard;
// {
//   /*<Icon className="space-left-20" name="user circle" size="massive" />*/
// }
