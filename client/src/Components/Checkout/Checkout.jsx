import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Header, Statistic, Label, Button, Segment, Dimmer, Loader, Divider, Icon } from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";
import CheckoutInvoiceItemCard from "./CheckoutInvoiceItemCard";
import { differenceInDays, format } from 'date-fns';
import CheckoutModal from './checkoutModal';

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
              this.calculateTotal();
              this.setState({
                loading: false
              })
            })
        })
    })
  }

  calculateTotal = () => {
    const nights = differenceInDays(
      new Date(this.props.reservation.checkOut),
      new Date(this.props.reservation.checkIn)
    );
    const totalBill = (nights * this.props.property.price) + this.props.reservation.cleaningFee;
    this.setState({
      total: totalBill
    })
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

      const checkInMonth = format(
        new Date(this.props.reservation.checkIn),
        'MMM'
      );

      const checkInDay = format(
        new Date(this.props.reservation.checkIn),
        'dddd'
      );

      const checkOut = format(
        new Date(this.props.reservation.checkOut),
        'MM/DD/YYYY'
      );

      const checkOutMonth = format(
        new Date(this.props.reservation.checkOut),
        'MMM'
      );

      const checkOutDay = format(
        new Date(this.props.reservation.checkOut),
        'dddd'
      );

    loading = (
    <FlexRow alignCenter justifyBetween style={{ width: "650px" }}>
      <FlexColumn style={{paddingLeft: '2%'}}>
        <Header as='h1'>
          Review Your Reservation
        </Header>

        <Header as='h3'>{nights} nights in {this.props.property.city}</Header>


        <FlexRow justifyBetween style={{marginTop: '1.5em', width: '80%'}}>
            <FlexRow style={{width: '45%'}}>
              <FlexColumn alignCenter style={{backgroundColor: '#e2e2e2', width: '60px', height: '54px', marginRight: '7%'}}>
                <p style={{marginBottom: '-5%', marginTop: '13%', fontWeight: 'bold'}}>{checkInMonth}</p>
                <p style={{fontWeight: 'bold'}}>{checkIn[3]}{checkIn[4]}</p>
              </FlexColumn>

              <FlexColumn >
                <p style={{margin: 0, marginTop: '4%', marginBottom: '1%'}}>{checkInDay} Check In</p>
                <p style={{}}>2 PM - 8 PM</p>
              </FlexColumn>
            </FlexRow >

            <FlexRow style={{width: '45%'}}>
              <FlexColumn alignCenter style={{backgroundColor: '#e2e2e2', width: '60px', height: '54px', marginRight: '7%'}}>
                <p style={{marginBottom: '-5%', marginTop: '13%', fontWeight: 'bold'}}>{checkOutMonth}</p>
                <p style={{fontWeight: 'bold'}}>{checkOut[3]}{checkOut[4]}</p>
              </FlexColumn>

              <FlexColumn >
                <p style={{margin: 0, marginTop: '4%', marginBottom: '1%'}}>{checkOutDay} Check Out</p>
                <p style={{}}>10AM</p>
              </FlexColumn>

              </FlexRow>
        </FlexRow>

        <FlexRow style={{marginTop: '5%', width: '80%'}}>
          <Icon name='handshake outline' size='large' style={{marginRight: '2%'}} />
          <p>On Site Staff Member: {this.props.employee.firstName} {this.props.employee.lastName}</p>
        </FlexRow>

        {/* <Header size="medium">{this.props.reservation.guest.firstName} {this.props.reservation.guest.lastName}</Header>
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
        </FlexRow> */}

        <FlexRow style={{ marginTop: "10px" }}>
          <Link to="/dashboard/reservations">
            <Button color="grey">Exit</Button>
          </Link>
          {/* <Button color="teal">Send Invoice</Button> */}

          <CheckoutModal 
            guest={this.props.reservation.guest} 
            total={this.state.total} 
            nights={nights} 
            cleaningFee={this.props.reservation.cleaningFee} 
            price={this.props.property.price}
            checkout={this.props.checkout} 
            reservationID={this.props.reservation._id}
          />
        </FlexRow>

      </FlexColumn>
    </FlexRow>)
    }

    return (
      <React.Fragment>{loading}</React.Fragment>
  );
};
}
