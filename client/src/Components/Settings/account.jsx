import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import AccountForm from './accountForm.jsx';

export default class Account extends Component {

    user = {
        firstName: 'Julie',
        lastName: 'Jonak',
        email: 'juliejonak@gmail.com',
        phone: '832-859-5441'
    }

    render(){
        return(
            <div>
                <Header as='h1'>Account Settings</Header>
                <AccountForm props={this.user}/>
            </div>
        )
    }
}