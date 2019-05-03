import React, { Component } from "react";
import {
  Header,
  Image,
  Segment,
  Dimmer,
  Loader,
  Grid,
  Icon
} from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";
import { differenceInDays, format } from "date-fns";
import CheckoutElement from "./checkoutElement";
import { Elements, StripeProvider } from "react-stripe-elements";
import { config } from "../../config/dev";

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, total: 0, stripeTotal: 0 };
  }

  componentDidMount = () => {
    this.props
      .getReservation(`${this.props.match.params.id}`)
      .then(response => {
        this.calculateTotal();
        this.setState({
          loading: false
        });
      });
  };

  calculateTotal = () => {
    const nights = differenceInDays(
      new Date(this.props.reservation.checkOut),
      new Date(this.props.reservation.checkIn)
    );
    let cleaningFee = 0;

    if (!this.props.property.cleaningFee) {
      cleaningFee = 30;
    } else {
      cleaningFee = this.props.property.cleaningFee;
    }
    const totalBill = nights * this.props.property.price + cleaningFee;
    const stripeTotal = totalBill * 100;
    this.setState({
      total: totalBill,
      stripeTotal: stripeTotal
    });
  };

  render() {
    let loading;
    if (this.state.loading) {
      loading = (
        <Segment>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </Segment>
      );
    } else {
      const nights = differenceInDays(
        new Date(this.props.reservation.checkOut),
        new Date(this.props.reservation.checkIn)
      );

      const checkIn = format(
        new Date(this.props.reservation.checkIn),
        "MM/DD/YYYY"
      );

      const checkInMonth = format(
        new Date(this.props.reservation.checkIn),
        "MMM"
      );

      const checkInDay = format(
        new Date(this.props.reservation.checkIn),
        "dddd"
      );

      const checkOut = format(
        new Date(this.props.reservation.checkOut),
        "MM/DD/YYYY"
      );

      const checkOutMonth = format(
        new Date(this.props.reservation.checkOut),
        "MMM"
      );

      const checkOutDay = format(
        new Date(this.props.reservation.checkOut),
        "dddd"
      );

      loading = (
        <FlexRow alignCenter justifyBetween style={{ width: "650px" }}>
          <FlexColumn style={{ paddingLeft: "2%", paddingTop: "2%" }}>
            <Header as="h1">Review Your Reservation</Header>

            <FlexRow justifyBetween style={{ width: "90%", marginTop: "-5%" }}>
              <Header as="h3" style={{ alignSelf: "flex-end" }}>
                {nights} nights in {this.props.property.city}
              </Header>
              <Image
                src={`https://res.cloudinary.com/roostr-labpt2/image/upload/c_scale,w_180/v1556327124/${
                  this.props.property.image
                }.jpg`}
              />
            </FlexRow>

            {/* Check In and Check Out View */}
            <FlexRow justifyBetween style={{ marginTop: "2em", width: "100%" }}>
              <FlexRow style={{ width: "25vw", marginRight: "5vw" }}>
                <FlexColumn
                  alignCenter
                  style={{
                    backgroundColor: "#e2e2e2",
                    width: "60px",
                    height: "54px",
                    marginRight: "7%"
                  }}
                >
                  <p
                    style={{
                      marginBottom: "-5%",
                      marginTop: "13%",
                      fontWeight: "bold"
                    }}
                  >
                    {checkInMonth}
                  </p>
                  <p style={{ fontWeight: "bold" }}>
                    {checkIn[3]}
                    {checkIn[4]}
                  </p>
                </FlexColumn>

                <FlexColumn>
                  <p style={{ margin: 0, marginTop: "4%", marginBottom: "1%" }}>
                    {checkInDay} Check In
                  </p>
                  <p style={{}}>2 PM - 8 PM</p>
                </FlexColumn>
              </FlexRow>

              <FlexRow style={{ width: "25vw", marginRight: "5vw" }}>
                <FlexColumn
                  alignCenter
                  style={{
                    backgroundColor: "#e2e2e2",
                    width: "60px",
                    height: "54px",
                    marginRight: "7%"
                  }}
                >
                  <p
                    style={{
                      marginBottom: "-5%",
                      marginTop: "13%",
                      fontWeight: "bold"
                    }}
                  >
                    {checkOutMonth}
                  </p>
                  <p style={{ fontWeight: "bold" }}>
                    {checkOut[3]}
                    {checkOut[4]}
                  </p>
                </FlexColumn>

                <FlexColumn>
                  <p style={{ margin: 0, marginTop: "4%", marginBottom: "1%" }}>
                    {checkOutDay} Check Out
                  </p>
                  <p style={{}}>10AM</p>
                </FlexColumn>
              </FlexRow>
            </FlexRow>

            {/* Reservation Details and Cost Breakdown */}
            <React.Fragment>
              <Grid
                divided="vertically"
                style={{ marginLeft: "0%", marginTop: "0%", width: "100%" }}
              >
                <Grid.Row>
                  <FlexRow
                    style={{ marginTop: "5%", width: "80%", marginLeft: "10%" }}
                  >
                    <Icon
                      name="moon outline"
                      size="large"
                      style={{ marginRight: "2%", color: "light green" }}
                    />
                    <p>
                      ${this.props.property.price}.00 X {nights} nights
                    </p>
                  </FlexRow>
                </Grid.Row>

                <Grid.Row>
                  <FlexRow
                    style={{ marginTop: "1%", width: "80%", marginLeft: "10%" }}
                  >
                    <Icon
                      name="user outline"
                      size="large"
                      style={{ marginRight: "2%" }}
                    />
                    <p>Guests: {this.props.reservation.guests}</p>
                  </FlexRow>
                </Grid.Row>

                <Grid.Row>
                  <FlexRow
                    style={{ marginTop: "1%", width: "80%", marginLeft: "10%" }}
                  >
                    <Icon
                      name="star outline"
                      size="large"
                      style={{ marginRight: "2%" }}
                    />
                    <p>Cleaning Fee: ${this.props.property.cleaningFee}.00</p>
                  </FlexRow>
                </Grid.Row>

                <Grid.Row>
                  <FlexRow style={{ marginLeft: "10%" }}>
                    <p>
                      <strong>Total:</strong> ${this.state.total}.00
                    </p>
                  </FlexRow>
                </Grid.Row>
              </Grid>
            </React.Fragment>

            <FlexColumn style={{ width: "100%" }}>
              <StripeProvider apiKey={config.stripeApiKey}>
                <Elements>
                  <CheckoutElement
                    close={this.close}
                    guest={this.props.reservation.guest}
                    checkout={this.props.checkout}
                    reservationID={this.props.reservation._id}
                    totalAmount={this.state.stripeTotal}
                  />
                </Elements>
              </StripeProvider>
            </FlexColumn>
          </FlexColumn>
        </FlexRow>
      );
    }

    return <React.Fragment>{loading}</React.Fragment>;
  }
}
