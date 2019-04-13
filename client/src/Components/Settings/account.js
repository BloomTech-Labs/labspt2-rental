import React from "react";
import { Header } from "semantic-ui-react";
import AccountForm from "./accountForm.jsx";
import { FlexColumn } from "../../custom-components/index.js";

const Account = props => {
  return (
    <React.Fragment>
      <FlexColumn width="800px">
        <Header as="h1">Account Settings</Header>
        <AccountForm
          user={props.user}
          update={props.update}
          getUser={props.getUser}
          updatePassword={props.updatePassword}
        />
      </FlexColumn>
    </React.Fragment>
  );
};

export default Account;
