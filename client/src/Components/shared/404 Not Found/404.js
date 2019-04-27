import React from "react";
import { Header, Button, Icon, Responsive } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { NotFoundImage } from './404_undraw';

export const NotFound = ({mobile}) => {
  const getWidth = () => {
    const isSSR = typeof window === "undefined";
    console.log('getwidth', Responsive.onlyTablet.minWidth)
  
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
  };

  return(
    <Responsive
    getWidth={getWidth}
    maxWidth={Responsive.onlyMobile.maxWidth}
  >
        <Header as='h3'>Hmm... what you're looking for doesn't seem to be here...</Header>

        <NotFoundImage width={ mobile ? '599px' : '200px' } />

        <Link to="/">
            <Button primary size="large" style={{ marginBottom: mobile ? "4em" : 0 }}>
                Return Home
                <Icon name="right arrow" />
            </Button>
        </Link>
    </Responsive>
  )
};
