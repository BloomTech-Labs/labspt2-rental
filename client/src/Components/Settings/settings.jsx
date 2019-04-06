import React, { Component } from 'react';
import { Tab, Segment, Dimmer, Loader } from 'semantic-ui-react';
import Billing from './billing';
import Account from './account.js';

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.loading = this.props.loading;

        this.panes = [
            { menuItem: 'Account', render: () => <Tab.Pane attached={false}><Account user={this.props.user} getUser={this.props.getUser} update={this.props.updateUser} updatePassword={this.props.updatePassword} /></Tab.Pane>},
            { menuItem: 'Billing', render: () => <Tab.Pane attached={false}><Billing/></Tab.Pane>}
        ]
    }

    componentDidMount = () => {
        this.props.getUser()
        .catch(err => console.log(err))
    }

    render () {
        let loading;
        if(this.loading){
            loading = <Segment><Dimmer active inverted><Loader inverted>Loading</Loader></Dimmer><Tab menu={{ attached: false }} panes={this.panes}/></Segment>
        } else {
            loading = <Tab menu={{ attached: false }} panes={this.panes}/>
        }

        return (
            <React.Fragment>
                {loading}
            </React.Fragment>
        )
    }
}
