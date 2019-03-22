<<<<<<< HEAD
import React from 'react';
import { Header } from 'semantic-ui-react';
import AccountForm from './accountForm.jsx';
import { FlexColumn } from '../../custom-components/index.js';
=======
import React from "react";
import { Header } from "semantic-ui-react";
import AccountForm from "./accountForm.jsx";
>>>>>>> 9c167efa0de2ce2693a11b3069766a5662b7f703

const user = {
  firstName: "Hayley",
  lastName: "Steingarten",
  email: "hayley@gmail.com",
  phone: "466-462-9353"
};

const Account = () => {
<<<<<<< HEAD
    return(
        <FlexColumn width="800px">
            <Header as='h1'>Account Settings</Header>
            <AccountForm user={user}/>
        </FlexColumn>
    )
    
}
=======
  return (
    <div>
      <Header as="h1">Account Settings</Header>
      <AccountForm props={user} />
    </div>
  );
};
>>>>>>> 9c167efa0de2ce2693a11b3069766a5662b7f703

export default Account;
