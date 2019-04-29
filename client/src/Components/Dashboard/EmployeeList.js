import React, { Fragment } from "react";
import { FlexColumn } from "custom-components";
import { Divider, Header, Icon, Responsive, List, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import config from '../../config/index';

// Pass props for if mobile or not, and how many employees

export const EmployeeList = (props) => {
    let count = 0;
    if(props.employeeTasks){
        const {
            employee0,
            employee1,
            employee2
        } = props.employeeTasks

        const employeeTaskObject = createEmployeeTaskObject(employee0, employee1, employee2);
        console.log(employeeTaskObject)
    }

    let container;
    if (getWidth() < Responsive.onlyTablet.minWidth) {
        container = <p>MOBILE</p>
    } else {
        container = <Employees employees={props.employees} mobile={false}/>
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
          <Responsive style={{width: '45%', height: '20vh', border: '1px solid pink', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2%'}}>
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
                <Link to={`/dashboard/employees/${props.employees[0]._id}`}>
                <List.Header>{props.employees[0].firstName} {props.employees[0].lastName}</List.Header>
                </Link>
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

const getWidth = () => {
    const isSSR = typeof window === "undefined";  
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
  };

let employeeTaskCount = {};

const countEmployees = (array) => {
    let overdueCount = 0;
    let todayCount = 0;
    array.forEach(item => {
        if(item.status === 'due today'){
            overdueCount++
        } else if (item.status === 'overdue'){
            todayCount++
        }
    })
    return { overdue: overdueCount, today: todayCount }
};

const createEmployeeTaskObject = (employee0, employee1, employee2) => {
    let employeeTaskCount = {};
    let employeeRender = {
        employee0: false,
        employee1: false,
        employee2: false
    };

    if(employee0.length > 0){
        employeeTaskCount = {...employeeTaskCount, employee0: countEmployees(employee0) };
        employeeRender.employee0 = true;
    }
    if(employee0.length === 0){
        employeeTaskCount = {...employeeTaskCount, employee0: 0 };
    }
    if(employee1.length > 0){
        employeeTaskCount = {...employeeTaskCount, employee1: countEmployees(employee1) };
        employeeRender.employee1 = true;
    }
    if(employee1.length === 0){
        employeeTaskCount = {...employeeTaskCount, employee1: 0 };
    }
    if(employee2.length > 0){
        employeeTaskCount = {...employeeTaskCount, employee2: countEmployees(employee2) };
        employeeRender.employee2 = true;
    }
    if(employee2.length === 0){
        employeeTaskCount = {...employeeTaskCount, employee2: 0 };
    }

    return { render: employeeRender, count: employeeTaskCount}
}