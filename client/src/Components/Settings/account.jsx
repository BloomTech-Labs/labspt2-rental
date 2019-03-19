import React, { Component } from 'react';
import { Header, Form } from 'semantic-ui-react';

export default class Account extends Component {
    constructor() {
        super();

    }

    render(){
        return(
            <div>
                <Header as='h1'>Account Settings</Header>
            </div>
        )
    }
}