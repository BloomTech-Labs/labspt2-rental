import React, { Component } from "react";
import { Button, Grid } from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";
import { Link } from "react-router-dom";

class InfoCardDesktop extends Component {
  render() {
    const { components, link, linkName } = this.props;

    return (
      <FlexRow
        alignCenter
        justifyBetween
        width="full"
        style={{ paddingTop: "10px", paddingBottom: "10px", width: "100%" }}
      >
        {components.image}

        <FlexColumn spaceLeft="20px" width="full">
          <FlexRow alignCenter spaceBottom="10px">
            {components.title}
            {components.id}
          </FlexRow>

        
        <FlexRow justifyBetween alignCenter width="full">
          <Grid columns='equal' style={{ flexGrow: "1", alignItems: "baseline", alignContent: "center" }}>
            <Grid.Row style={{ display: "flex", alignItems: "Center" }}>

              <Grid.Column 
                style={{ marginRight: "-40px" }}
              >
                {components.label}
              </Grid.Column>

              <Grid.Column width={8}>
                <FlexRow 
                  justifyBetween
                  alignCenter
                >
                  {components.statA}
                  {components.statB}
              </FlexRow>
            </Grid.Column>

              <Grid.Column>
                <FlexColumn style={{ alignItems: "center" }}>
                  <Link to={link}>
                    <Button style={{ margin: "10px 0", minWidth: "30%" }}>
                      {linkName || "More Info"}
                    </Button>
                  </Link>
                </FlexColumn>
              </Grid.Column>
            </Grid.Row>
            </Grid>
          </FlexRow>
        </FlexColumn>
      </FlexRow>
    );
  }
}

export default InfoCardDesktop;
