import React from 'react';
import { Header } from 'semantic-ui-react';
import AccountForm from './accountForm.jsx';
import { FlexColumn } from '../../custom-components/index.js';

const Account = (props) => {
    return(
        <FlexColumn width="800px">
            <Header as='h1'>Account Settings</Header>
            <AccountForm user={props.user}/>
        </FlexColumn>
    )
};

export default Account;
