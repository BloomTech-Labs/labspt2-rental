import React from "react";
import { Header, Image, Card, Button } from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";

const InfoCard = props => {
  return (
    <Card className="info-card-main" style={{ width: "60%" }} raised>
      <FlexRow alignCenter justifyBetween>
        <Image src={props.imageLoc} size="small" />
        <FlexColumn
          className="space-left-20"
          style={{ width: "60%", padding: "5px" }}
        >
          <Header>{props.header}</Header>
          {props.lineOneTitle ? (
            <p className="lineOne card-info">
              {props.lineOneTitle}: {props.lineOneInfo}
            </p>
          ) : null}
          {props.lineTwoTitle ? (
            <p className="lineTwo card-info">
              {props.lineTwoTitle}: {props.lineTwoInfo}
            </p>
          ) : null}
          <FlexRow>
            {props.lineThreeTitle ? (
              <p className="lineThree card-info">
                {props.lineThreeTitle}: {props.lineThreeInfo}
              </p>
            ) : null}
            {props.lineFourTitle ? (
              <p className="lineFour card-info">
                {props.lineFourTitle}: {props.lineFourInfo}
              </p>
            ) : null}
          </FlexRow>
        </FlexColumn>
        <Button onClick={props.buttonFunction}>More Info</Button>
      </FlexRow>
    </Card>
  );
};

export default InfoCard;
