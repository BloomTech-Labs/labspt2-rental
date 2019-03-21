import React from 'react';
import { Header } from 'semantic-ui-react';
import AccountForm from './accountForm.jsx';

const user = {
    firstName: 'Hayley',
    lastName: 'Steingarten',
    email: 'hayley@gmail.com',
    phone: '466-462-9353'
}

const Account = () => {
    return(
        <div>
            <Header as='h1'>Account Settings</Header>
            <AccountForm user={user}/>
        </div>
    )
    
}

export default Account;