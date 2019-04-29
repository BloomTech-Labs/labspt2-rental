import React, { Fragment } from "react";
import { FlexColumn } from "custom-components";
import { Divider, Header, Icon, Responsive, List, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const getWidth = () => {
    const isSSR = typeof window === "undefined";  
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
  };

// Pass props for if mobile or not, and how many employees

export const EmployeeList = (props) => {
    console.log(props.employees[0]);
    let container;
    if (getWidth() < Responsive.onlyTablet.minWidth) {
        container = <p>MOBILE</p>
    } else {
        container = <Employees employees={props.employees}/>
    }

    return (
        <Fragment>
            {container}
        </Fragment>
    );
  }

const Employees = (props) => {
    console.log(props)
      let employees;
      const number = 1;
      // instead, pass a prop of something that won't be null to test in case no employees
      if (props.employees.length === 0){
          employees = null;
      }
      else if( number === 0 ){
          employees = <ZeroEmployees />
      } else if ( number === 1 ) {
          employees = <OneEmployee employees={props.employees} />
      }
  
      return (
          <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth} style={{width: '45%', height: '20vh', border: '1px solid pink', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2%'}}>
            {employees}
          </Responsive>
      );
    }

const ZeroEmployees = () => {
    return (
        <FlexColumn alignCenter >
            <Header as='h2'>You currently have no employees</Header>
            <Link to='/employees/add' style={{ marginTop: '2em'}}>
                <Button basic color='blue'>Add New Employees</Button>
            </Link>
        </FlexColumn>
    )
}

const OneEmployee = (props) => {
    console.log(props)
    return (
        <List relaxed>
            <List.Item>
            <Image avatar src={`https://res.cloudinary.com/roostr-labpt2/image/upload/c_lfill,g_center,h_500,w_400/v1556336341/${props.employees[0].image}.jpg`} />
            <List.Content>
                <List.Header as='a'>{props.employees[0].firstName} {props.employees[0].lastName}</List.Header>
                <List.Description>
                Last seen watching{' '}
                <a>
                    <b>Arrested Development</b>
                </a>{' '}
                just now.
                </List.Description>
            </List.Content>
            </List.Item>
        </List>
    )
}

const TwoEmployees = () => {
    return (
        <Fragment>
            <List.Item>
            {/* <Image avatar src={} /> */}
            <List.Content>
                <List.Header as='a'>Daniel Louise</List.Header>
                <List.Description>
                Last seen watching{' '}
                <a>
                    <b>Arrested Development</b>
                </a>{' '}
                just now.
                </List.Description>
            </List.Content>
            </List.Item>

            <List.Item>
            {/* <Image avatar src={} /> */}
            <List.Content>
                <List.Header as='a'>Daniel Louise</List.Header>
                <List.Description>
                Last seen watching{' '}
                <a>
                    <b>Arrested Development</b>
                </a>{' '}
                just now.
                </List.Description>
            </List.Content>
            </List.Item>
        </Fragment>
    )
}