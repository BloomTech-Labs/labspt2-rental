import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ImageContainer = styled(FlexRow)`
  position: relative;
  min-width: 125px;
`;

const LabelContainer = styled.div`
  position: absolute;
  left: 3px;
  bottom: 0;
`;

const HideId = styled.div`
  &&& {
    @media (max-width: 400px) {
      display: none;
    }
  }
`;

class InfoCardMobile extends Component {
  render() {
    const { components, link, linkName } = this.props;

    return (
      <FlexColumn width="full">
        <FlexRow width="full" justifyBetween alignCenter>
          <ImageContainer>
            {components.image}
            <LabelContainer>{components.label}</LabelContainer>
          </ImageContainer>

          <FlexRow
            width="full"
            justifyBetween
            alignCenter
            wrap
            spaceLeft="20px"
          >
            <FlexRow alignCenter spaceRight>
              {components.title}
              <HideId>{components.id}</HideId>
            </FlexRow>

            <Link to={link}>
              <Button style={{ margin: "10px 0", minWidth: "110px" }}>
                {linkName || "More Info"}
              </Button>
            </Link>
          </FlexRow>
        </FlexRow>
      </FlexColumn>
    );
  }
}

export default InfoCardMobile;
