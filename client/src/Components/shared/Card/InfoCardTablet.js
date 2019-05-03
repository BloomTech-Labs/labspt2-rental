import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";
import { Link } from "react-router-dom";

class InfoCardTablet extends Component {
  render() {
    const { components, link, linkName } = this.props;

    return (
      <FlexRow alignCenter justifyBetween width="full">
        {components.image}

        <FlexColumn spaceLeft="20px" width="65%">
          <FlexRow alignCenter justifyBetween spaceBottom="10px" width="full">
            <FlexRow alignCenter>
              {components.title}
              {components.id}
            </FlexRow>

            <FlexColumn>
              <Link to={link}>
                <Button style={{ margin: "10px 0", minWidth: "110px" }}>
                  {linkName || "More Info"}
                </Button>
              </Link>
            </FlexColumn>
          </FlexRow>

          <FlexRow justifyBetween alignCenter width="full">
            {components.label}

            <FlexRow spaceRight="20px" spaceLeft="20px" justifyCenter>
              {components.statA}
              {components.statB}
            </FlexRow>
          </FlexRow>
        </FlexColumn>
      </FlexRow>
    );
  }
}

export default InfoCardTablet;
