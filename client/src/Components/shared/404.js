import React, { Fragment } from "react";
import {Header, Button, Icon} from 'semantic-ui-react';
import { Link } from "react-router-dom";

export const NotFound = ({mobile}) => {
  return(
    <Fragment>
        <Header as='h3'>Hmm... what you're looking for doesn't seem to be here...</Header>

        <Link to="/">
            <Button primary size="large" style={{ marginBottom: mobile ? "4em" : 0 }}>
                Return Home
                <Icon name="right arrow" />
            </Button>
        </Link>
    </Fragment>
  )
};
