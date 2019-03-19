import React, { Component } from 'react';
import { Header, Tab } from 'semantic-ui-react';
import Account from './account';
import Billing from './billing'

export default class Settings extends Component {
    constructor() {
        super();

        this.panes = [
            { menuItem: 'Account', render: () => <Tab.Pane attached={false}><Account/></Tab.Pane>},
            { menuItem: 'Billing', render: () => <Tab.Pane attached={false}><Billing/></Tab.Pane>}
        ]
    }

    render () {
        return (
            <div>
                <Tab menu={{ attached: false }} panes={this.panes}/>
            </div>
        )
    }
}