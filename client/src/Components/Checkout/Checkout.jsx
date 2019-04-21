import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Header, Statistic, Label, Image, Button, Segment, Dimmer, Loader, Grid, Icon } from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";
import { differenceInDays, format } from 'date-fns';
import CheckoutModal from './checkoutModal';
import CheckoutElement from './checkoutElement';
import { Elements, StripeProvider } from "react-stripe-elements";
import { config } from "../../config/dev";

export default class Checkout extends Component {
  constructor(props){
    super(props);
    this.state = { loading: true, total: 0, stripeTotal: 0 }
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
    const stripeTotal = totalBill * 100;
    this.setState({
      total: totalBill,
      stripeTotal: stripeTotal
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
      const nightlyTotal = nights * this.props.property.price;

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
      <FlexColumn style={{paddingLeft: '2%', paddingTop: '2%'}}>

        <Header as='h1'>
          Review Your Reservation
        </Header>

        <FlexRow justifyBetween style={{width: '100%', marginTop: '-5%'}}>
          <Header as='h3' style={{ alignSelf: 'flex-end'}}>{nights} nights in {this.props.property.city}</Header>
          <Image src={`${this.props.property.image}`} size='small' />
        </FlexRow>


        {/* Check In and Check Out View */}
        <FlexRow justifyBetween style={{marginTop: '1.5em', width: '100%'}}>
            <FlexRow style={{width: '25vw', marginRight: '5vw'}}>
              <FlexColumn alignCenter style={{backgroundColor: '#e2e2e2', width: '60px', height: '54px', marginRight: '7%'}}>
                <p style={{marginBottom: '-5%', marginTop: '13%', fontWeight: 'bold'}}>{checkInMonth}</p>
                <p style={{fontWeight: 'bold'}}>{checkIn[3]}{checkIn[4]}</p>
              </FlexColumn>

              <FlexColumn >
                <p style={{margin: 0, marginTop: '4%', marginBottom: '1%'}}>{checkInDay} Check In</p>
                <p style={{}}>2 PM - 8 PM</p>
              </FlexColumn>
            </FlexRow >

            <FlexRow style={{width: '25vw', marginRight: '5vw'}}>
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

        {/* Reservation Details and Cost Breakdown */}
        <React.Fragment >
          <Grid divided='vertically' style={{marginLeft: '0%', marginTop: '0%', width: '100%'}} >
            <Grid.Row>
              <FlexRow style={{marginTop: '5%', width: '80%', marginLeft: '10%'}}>
                <Icon name='moon outline' size='large' style={{marginRight: '2%', color: 'light green'}} />
                {/* <FlexRow justifyBetween style={{width: '70%'}}> */}
                  <p>${this.props.property.price}.00 X {nights} nights</p>
                  {/* <p>${nightlyTotal}.00</p>
                </FlexRow> */}
              </FlexRow>
            </Grid.Row>

            <Grid.Row>
              <FlexRow style={{marginTop: '1%', width: '80%', marginLeft: '10%'}}>
                <Icon name='user outline' size='large' style={{marginRight: '2%'}} />
                <p>Guests: {this.props.reservation.guests}</p>
              </FlexRow>
            </Grid.Row>

            <Grid.Row>
              <FlexRow style={{marginTop: '1%', width: '80%', marginLeft: '10%'}}>
                <Icon name='star outline' size='large' style={{marginRight: '2%'}} />
                <o>Cleaning Fee: ${this.props.reservation.cleaningFee}.00</o>
              </FlexRow>
            </Grid.Row>

            <Grid.Row >
              <FlexRow style={{marginLeft: '10%'}}>
                <p><strong>Total:</strong> ${this.state.total}.00</p>
              </FlexRow>
            </Grid.Row>
          </Grid>
        </React.Fragment>

        {/* <Header size="medium">{this.props.reservation.guest.firstName} {this.props.reservation.guest.lastName}</Header>
        <p>{this.props.reservation.guest.email}</p>
        <p>{this.props.reservation.guest.phoneNumber}</p>

        <Label color="blue" horizontal style={{ marginTop: "20px" }}>
          {this.props.property.name}
        </Label>
        <Header>Address: {this.props.property.address1}, {this.props.property.city}, {this.props.property.state} {this.props.property.zip} </Header>

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

        <FlexRow style={{width: '100%'}}>

        <StripeProvider apiKey={config.stripeApiKey}>
          <Elements >
            <CheckoutElement
              close={this.close} guest={this.props.reservation.guest} checkout={this.props.checkout} reservationID={this.props.reservation._id}
              // totalAmount={stripeTotalAmount} 
            />
          </Elements>
        </StripeProvider>

        </FlexRow>

      </FlexColumn>
    </FlexRow>)
    }

    return (
      <React.Fragment>{loading}</React.Fragment>
  );
};
}
