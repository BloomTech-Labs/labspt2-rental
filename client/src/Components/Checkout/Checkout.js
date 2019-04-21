import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Header, Statistic, Label, Button, Segment, Dimmer, Loader } from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";
import CheckoutInvoiceItemCard from "./CheckoutInvoiceItemCard";
import { differenceInDays, format } from 'date-fns';

export default class Checkout extends Component {
  constructor(props){
    super(props);
    this.state = { loading: true, total: 0 }
  }

  componentDidMount = () => {
    this.props.getReservation(`${this.props.match.params.id}`)
    .then(response => {
      this.props.getEmployee(this.props.reservation.assistant)
        .then(response => {
          this.props.getProperty(this.props.reservation.property)
            .then(response => {
              this.setState({
                loading: false
              })
            })
        })
    })
  }

  calculateTotal = () => {
    console.log('nightly price', this.props.property.price)
  }

  render(){
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
      let paid = this.props.reservation.paid;
      const nights = differenceInDays(
        new Date(this.props.reservation.checkOut),
        new Date(this.props.reservation.checkIn)
      );

      const checkIn = format(
        new Date(this.props.reservation.checkIn),
        'MM/DD/YYYY'
      );

      const checkOut = format(
        new Date(this.props.reservation.checkOut),
        'MM/DD/YYYY'
      );

    loading = (<FlexRow alignCenter justifyBetween style={{ width: "650px" }}>
      <FlexColumn>
        <Header size="large" color="orange">
          Booking ID: {this.props.match.params.id}
        </Header>

        <Header size="medium">{this.props.reservation.guest.firstName} {this.props.reservation.guest.lastName}</Header>
        <p>{this.props.reservation.guest.email}</p>
        <p>{this.props.reservation.guest.phoneNumber}</p>

        <Label color="blue" horizontal style={{ marginTop: "20px" }}>
          {this.props.property.name}
        </Label>
        <Header>Address: {this.props.property.address1}, {this.props.property.city}, {this.props.property.state} {this.props.property.zip} </Header>

        <FlexRow style={{ paddingTop: "10px" }}>
          <Statistic size="tiny">
            <Statistic.Label>Check-in</Statistic.Label>
            <Statistic.Value>{checkIn}</Statistic.Value>
          </Statistic>
          <Statistic size="tiny">
            <Statistic.Label>Check-out</Statistic.Label>
            <Statistic.Value>{checkOut}</Statistic.Value>
          </Statistic>
        </FlexRow>

        <CheckoutInvoiceItemCard nights={nights} guests={this.props.reservation.guests} cleaningFee={this.props.reservation.cleaningFee} />

         <FlexRow style={{ paddingTop: "10px" }}>
           <Header size="medium">Employee:</Header>
           <Label color="grey" style={{ marginLeft: "10px" }}>
             {this.props.employee.firstName} {this.props.employee.lastName}
           </Label>
         </FlexRow> 

        <FlexRow style={{ marginTop: "10px" }}>
          <Header size="medium">Total: ${this.state.total}</Header>
          <Header size="medium">Billing Status:</Header>
          <Label color="red" style={{ marginLeft: "10px" }}>
            { paid ? "Paid" : "Unpaid" }
          </Label>
        </FlexRow>

        <FlexRow style={{ marginTop: "10px" }}>
          <Link to="/dashboard/reservations">
            <Button color="grey">Exit</Button>
          </Link>
          <Button color="teal">Send Invoice</Button>
          <Button color="orange">Process Payment</Button>
        </FlexRow>

      </FlexColumn>
    </FlexRow>)
    }

    return (
      <React.Fragment>{loading}</React.Fragment>
  );
};
}
