import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import Billing from './billing';
import Account from './account.js';

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