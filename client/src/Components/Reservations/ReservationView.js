import React, { Component } from "react";
import {
  Header,
  Button,
  Label,
  Icon,
  Image,
  Dimmer,
  Loader,
  Responsive
} from "semantic-ui-react";
import { FlexRow, FlexColumn, Container } from "custom-components";
import { Link } from "react-router-dom";
import { differenceInDays, format } from "date-fns";
import styled from "styled-components";

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class ReservationView extends Component {
  componentDidMount() {
    this.props.fetchSingleReservation(this.props.match.params.id);
  }

  render() {
    const { reservation } = this.props;

    const propImage = reservation.property
    ? reservation.property.image
      ? `http://res.cloudinary.com/roostr-labpt2/image/upload/c_scale,q_80,r_0,w_640/v1556327124/${
        reservation.property.image
        }.jpg`
      : `https://res.cloudinary.com/roostr-labpt2/image/upload/c_fill,h_150,w_200/v1556771202/q01phvk7ecxb4ztfyll2.jpg`
    : null;

    let processPaymentButton;

    if (reservation.paid) {
      processPaymentButton = null;
    } else {
      processPaymentButton = (
        <Link to={`/dashboard/checkout/${reservation._id}`}>
          <Button basic color="blue">
            Process Payment
          </Button>{" "}
        </Link>
      );
    }

    let loadingComponent;
    if (!reservation.guest) {
      loadingComponent = (
        <Container width="full" style={{ display: "flex" }}>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </Container>
      );
    } else {
      const nights = differenceInDays(
        new Date(reservation.checkOut),
        new Date(reservation.checkIn)
      );

      const checkIn = format(new Date(reservation.checkIn), "MM/DD/YYYY");

      const checkInMonth = format(new Date(reservation.checkIn), "MMM");

      const checkInDay = format(new Date(reservation.checkIn), "dddd");

      const checkOut = format(new Date(reservation.checkOut), "MM/DD/YYYY");

      const checkOutMonth = format(new Date(reservation.checkOut), "MMM");

      const checkOutDay = format(new Date(reservation.checkOut), "dddd");

      loadingComponent = (
        <FlexRow
          alignCenter
          justifyBetween
          style={{
            width: "full",
            display: "flex",
            justifyContent: "center",
            margin: "1em",
            paddingTop: "2em"
          }}
        >
          <FlexColumn style={{ paddingLeft: "2%", paddingTop: "2%" }}>
            <FlexRow justifyBetween style={{ width: "100%" }}>
              <Header as="h1" style={{ marginBottom: "2em" }}>
                {reservation.guest.firstName} {reservation.guest.lastName}'s
                Reservation
              </Header>

              {!reservation.paid && (
                <Label color="red" style={{ marginRight: "5%" }}>
                  Not Paid
                </Label>
              )}

              {reservation.paid && (
                <Label color="green" style={{ marginRight: "5%" }}>
                  Paid
                </Label>
              )}
            </FlexRow>

            <MobileContainer>
              <FlexColumn style={{ width: "80%" }}>
                <Header as="h3">{reservation.property.name}</Header>

                <p style={{ marginBottom: 0 }}>
                  {reservation.property.address1}
                </p>
                <p>
                  {reservation.property.city}, {reservation.property.state}{" "}
                  {reservation.property.zip}
                </p>

                <FlexColumn
                  style={{
                    width: "60%",
                    alignItems: "baseline",
                    marginTop: "2%"
                  }}
                >
                  <FlexRow
                    style={{
                      marginTop: "5%",
                      width: "100%",
                      alignItems: "center",
                      marginBottom: '3%'
                    }}
                  >
                    <Icon
                      name="moon outline"
                      size="large"
                      style={{ marginRight: "2%", color: "light green" }}
                    />
                    <p style={{ marginLeft: "5%" }}>{nights} nights</p>
                  </FlexRow>

                  <FlexRow
                    style={{
                      marginTop: "1%",
                      width: "100%",
                      alignItems: "center"
                    }}
                  >
                    <Icon
                      name="user outline"
                      size="large"
                      style={{ marginRight: "2%" }}
                    />
                    <p style={{ marginLeft: "5%" }}>
                      Guests: {this.props.reservation.guests}
                    </p>
                  </FlexRow>
                </FlexColumn>
              </FlexColumn>

              <Image
                src={propImage}
                style={{ marginBottom: '1em'}}
              />
              </MobileContainer>

              <DesktopContainer>
              <FlexColumn style={{ width: "80%" }}>
                <Header as="h3">{reservation.property.name}</Header>

                <p style={{ marginBottom: 0 }}>
                  {reservation.property.address1}
                </p>
                <p>
                  {reservation.property.city}, {reservation.property.state}{" "}
                  {reservation.property.zip}
                </p>

                <FlexRow
                  style={{
                    width: "90%",
                    alignItems: "baseline",
                    marginTop: "2%"
                  }}
                >
                  <FlexRow
                    style={{
                      marginTop: "5%",
                      width: "80%",
                      alignItems: "center"
                    }}
                  >
                    <Icon
                      name="moon outline"
                      size="large"
                      style={{ marginRight: "2%", color: "light green" }}
                    />
                    <p style={{ marginLeft: "5%" }}>{nights} nights</p>
                  </FlexRow>

                  <FlexRow
                    style={{
                      marginTop: "1%",
                      width: "80%",
                      alignItems: "center"
                    }}
                  >
                    <Icon
                      name="user outline"
                      size="large"
                      style={{ marginRight: "2%" }}
                    />
                    <p style={{ marginLeft: "5%" }}>
                      Guests: {this.props.reservation.guests}
                    </p>
                  </FlexRow>
                </FlexRow>
              </FlexColumn>

              <Image
                src={propImage}
              />
              </DesktopContainer>

            {/* Check In and Check Out View */}
            <FlexRow
              justifyBetween
              style={{ marginTop: "3em", width: "90%", alignSelf: "center" }}
            >
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

            <FlexRow
              style={{
                marginTop: "7%",
                width: "80%",
                marginLeft: "5%",
                alignItems: "center",
                marginBottom: "2%",
                minHeight: "12vh"
              }}
            >
              <Image
                src={`https://res.cloudinary.com/roostr-labpt2/image/upload/c_lfill,g_center,h_500,w_400/v1556336341/${
                  reservation.assistant.image
                }.jpg`}
                size="tiny"
              />

              <FlexColumn
                style={{ marginLeft: "5%", alignItems: "flex-start" }}
              >
                <Header as="h3">On Site Contact</Header>
                <p>
                  <strong>Name:</strong> {reservation.assistant.firstName}{" "}
                  {reservation.assistant.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {reservation.assistant.email}
                </p>
              </FlexColumn>
            </FlexRow>

            <React.Fragment>
              <FlexRow
                width="90%"
                spaceTop
                alignEnd
                justifyBetween
                style={{
                  alignSelf: "center",
                  marginTop: "3em",
                  marginBottom: "2em"
                }}
              >
                <Link to={`/dashboard/reservations/edit/${reservation._id}`}>
                  <Button basic>Edit</Button>
                </Link>

                {processPaymentButton}
              </FlexRow>
            </React.Fragment>
          </FlexColumn>
        </FlexRow>
      );
    }

    return <React.Fragment>{loadingComponent}</React.Fragment>;
  }
}

export default ReservationView;

const DesktopContainer = styled.div`
  &&& {
    display: flex;
    justify-content: space-between;
    width: 90%;
    min-height: 125px;
    align-items: center;
    margin-bottom: 1em;
    align-self: center;

    @media (max-width: 470px) {
    display: none;
    justify-content: space-between;
    width: 90%;
    min-height: 125px;
    align-items: center;
    margin-bottom: 1em;
    align-self: center;
    border: 1px solid blue;
    }
  }
`;

const MobileContainer = styled.div`
&&& {
  display: none;
  @media (max-width: 470px) {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    width: 90%;
    min-height: 125px;
    align-items: center;
    margin-bottom: 1em;
    align-self: center;
  }
}
`;