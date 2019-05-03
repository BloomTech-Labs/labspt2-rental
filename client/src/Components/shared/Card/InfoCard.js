import React, { Component } from "react";
import {
  Header,
  Icon,
  Label,
  Popup,
  Responsive,
  Image,
  Statistic
} from "semantic-ui-react";
import InfoCardDesktop from "./InfoCardDesktop";
import InfoCardTablet from "./InfoCardTablet";
import InfoCardMobile from "./InfoCardMobile";
import styled from "styled-components";

const FullResponsive = styled.div`
  width: 100%;
`;

const title = ({ children }) => (
  <Header
    size="medium"
    style={{ margin: "0", maxWidth: "32vw", overflowWrap: "break-word" }}
  >
    {children}&nbsp;
  </Header>
);
const image = ({ children }) =>
  children ? (
    <Image
      rounded
      size="small"
      src={`https://res.cloudinary.com/roostr-labpt2/image/upload/c_fill,g_face,h_150,w_200/v1556336341/${children}.jpg`}
    />
  ) : (
    <Image rounded size="small" src={'https://res.cloudinary.com/roostr-labpt2/image/upload/c_fill,h_150,w_200/v1556771202/q01phvk7ecxb4ztfyll2.jpg'} />
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
    trigger={
      <Label
        className="ellipsis"
        style={{ maxWidth: "105px", minWidth: "75px" }}
        as="a"
        color="blue"
        content={children}
        icon="home"
      />
    }
    content={hover}
  />
);
const statA = ({ children, label }) => (
  <Statistic
    size="tiny"
    style={{ margin: "10px 15px", width: "70%", whiteSpace: "nowrap" }}
  >
    <Statistic.Label>{label}</Statistic.Label>
    <Statistic.Value className="ellipsis" style={{ maxWidth: "125px" }}>
      {children}
    </Statistic.Value>
  </Statistic>
);
const statB = ({ children, label }) => (
  <Statistic
    size="tiny"
    style={{ margin: "10px 15px", width: "70%", whiteSpace: "nowrap" }}
  >
    <Statistic.Label>{label}</Statistic.Label>
    <Statistic.Value className="ellipsis" style={{ maxWidth: "125px" }}>
      {children}
    </Statistic.Value>
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
    React.Children.forEach(props.children, child => {
      components[child.type.displayName] = child;
    });

    return (
      <>
        <Responsive as={FullResponsive} minWidth={1001}>
          <InfoCardDesktop {...{ ...props, components }}>
            {props.children}
          </InfoCardDesktop>
        </Responsive>
        <Responsive as={FullResponsive} minWidth={851} maxWidth={1000}>
          <InfoCardTablet {...{ ...props, components }}>
            {props.children}
          </InfoCardTablet>
        </Responsive>
        <Responsive as={FullResponsive} maxWidth={850}>
          <InfoCardMobile {...{ ...props, components }}>
            {props.children}
          </InfoCardMobile>
        </Responsive>
      </>
    );
  }
}

InfoCard.Title.displayName = "title";
InfoCard.Image.displayName = "image";
InfoCard.ID.displayName = "id";
InfoCard.Label.displayName = "label";
InfoCard.StatA.displayName = "statA";
InfoCard.StatB.displayName = "statB";

export default InfoCard;
