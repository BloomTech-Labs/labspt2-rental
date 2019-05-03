import React, { Component } from "react";
import { Statistic, Icon } from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";

class CheckoutInvoiceItemCard extends Component {
  constructor(props) {
    super(props);

    this.details = [
      { icon: "moon", option: "Nights of Stay:", amount: props.nights },
      { icon: "users", option: "Guests:", amount: props.guests },
      // this next item is on the wireframes but not the mockups so it's commented out
      { icon: "leaf", option: "Cleaning fee", amount: `$${props.cleaningFee}` }
    ];
  }

  render() {
    return (
      <div style={{ width: "800px" }}>
        {this.details.map((detail, ind) => (
          <FlexRow style={{ padding: "10px" }}>
            <FlexColumn style={{ paddingRight: "5px" }}>
              <Icon name={detail.icon} size="huge" />
            </FlexColumn>
            <FlexColumn style={{ padding: "5px" }}>
              <Statistic size="tiny">
                <Statistic.Label>{detail.option}</Statistic.Label>
                <Statistic.Value>{detail.amount}</Statistic.Value>
              </Statistic>
            </FlexColumn>
          </FlexRow>
        ))}
      </div>
    );
  }
}

export default CheckoutInvoiceItemCard;
