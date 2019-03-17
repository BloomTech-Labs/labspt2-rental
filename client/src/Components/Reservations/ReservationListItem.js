import React from "react";
import {
  Image,
  Header,
  Button,
  Label,
  Statistic,
  Popup,
  Icon
} from "semantic-ui-react";
import { FlexRow, FlexColumn, Text } from "custom-components";

const ReservationListItem = () => {
  return (
    <FlexRow alignCenter justifyBetween width="full">
      <Image
        rounded
        src="https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/05/22224952/beagle-puppy-in-large-cushion-chair.jpg"
        size="small"
      />

      <FlexColumn
        grow="1"
        className="space-left-20"
        style={{ height: "100px" }}
      >
        <FlexRow alignCenter spaceBottom="20px">
          <Header size="medium" style={{ margin: "0" }}>
            Guest Name&nbsp;
          </Header>

          <Popup
            trigger={
              <Label circular>
                <Icon fitted name="info" />
              </Label>
            }
            content="54759eb3c090d83494e2d804"
          />
        </FlexRow>

        <Popup
          trigger={<Label as="a" color="red" content="House 1" icon="home" />}
          content="1800 S Jackson St Seattle, WA 98144"
        />
      </FlexColumn>

      <br />

      <FlexRow grow="1">
        <Statistic size="tiny" style={{ margin: "0 15px" }}>
          <Statistic.Label>Check In</Statistic.Label>
          <Statistic.Value>1/24</Statistic.Value>
        </Statistic>

        <Statistic size="tiny" style={{ margin: "0 15px" }}>
          <Statistic.Label>Check Out</Statistic.Label>
          <Statistic.Value>1/28</Statistic.Value>
        </Statistic>
      </FlexRow>

      <FlexColumn>
        <Button>MORE INFO</Button>
      </FlexColumn>
    </FlexRow>
  );
};

export default ReservationListItem;
