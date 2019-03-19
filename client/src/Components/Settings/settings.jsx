import React, { Component } from 'react';
import { Header, Tab } from 'semantic-ui-react';

export default class Settings extends Component {
    constructor() {
        super();

        this.panes = [
            { menuItem: 'Account', render: () => <Tab.Pane attached={false}></Tab.Pane>},
            { menuItem: 'Billing', render: () => <Tab.Pane attached={false}></Tab.Pane>}
        ]
    }

    render () {
        return (
            <div>
                <Header as='h1'>Settings</Header>
                <Tab menu={{ attached: false }} panes={this.panes}/>
            </div>
        )
    }
}