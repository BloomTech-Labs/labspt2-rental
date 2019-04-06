import React from "react";
import { Header } from "semantic-ui-react";
import AccountForm from "./accountForm.jsx";
import { FlexColumn } from "../../custom-components/index.js";

const user = {
  firstName: "Hayley",
  lastName: "Steingarten",
  email: "hayley@gmail.com",
  phone: "466-462-9353"
};

const Account = () => {
  return (
    <FlexColumn width="800px">
      <Header as="h1">Account Settings</Header>
      <AccountForm user={user} />
    </FlexColumn>
  );
};

export default Account;
