import React, { Component } from "react";
import {
  Header,
  Image,
  Button,
  Icon,
  Popup,
  Label,
  Statistic
} from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";
import { Link } from "react-router-dom";

class InfoCardDesktop extends Component {
  render() {
    const { components, link, linkName } = this.props;

    return (
      <FlexRow alignCenter justifyBetween width="full">
        {components.image}

        <FlexColumn grow="1" spaceLeft="20px">
          <FlexRow alignCenter spaceBottom="10px">
            {components.title}
            {components.id}
          </FlexRow>

          <FlexRow justifyBetween alignCenter width="full">
            {components.label}

            <FlexRow grow="1" spaceRight="20px" spaceLeft="20px" justifyCenter>
              {components.statA}
              {components.statB}
            </FlexRow>

            <FlexColumn>
              <Link to={link}>
                <Button style={{ margin: "10px 0", minWidth: "110px" }}>
                  {linkName || "More Info"}
                </Button>
              </Link>
            </FlexColumn>
          </FlexRow>
        </FlexColumn>
      </FlexRow>
    );
  }
}

export default InfoCardDesktop;
