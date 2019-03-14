import React from "react";
import { Header, Image, Card, Button } from "semantic-ui-react";
import { FlexRow, Container } from "custom-components";

const InfoCard = props => {
  return (
    <div>
      <Card raised>
        <FlexRow>
          <Image src={props.imageLoc} size="small" />
          <div className="card-info">
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
          </div>
          <Button onClick={props.buttonFunction}>More Info</Button>
        </FlexRow>
      </Card>
    </div>
  );
};

export default InfoCard;
