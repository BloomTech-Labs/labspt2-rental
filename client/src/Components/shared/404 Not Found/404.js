import React, { Fragment } from "react";
import { Header, Button, Icon, Responsive } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { NotFoundImage } from "./404_undraw";
import { FlexColumn } from "../../../custom-components/index";

export const NotFound = () => {
  return (
    <Fragment>
      <MobileNotFound />
      <DesktopNotFound />
    </Fragment>
  );
};

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const MobileNotFound = () => {
  return (
    <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
      <FlexColumn
        justifyCenter
        alignCenter
        style={{ width: "90%", marginTop: "5em" }}
      >
        <Header as="h1" style={{ textAlign: "center", marginBottom: "0.5em" }}>
          Ooops!
        </Header>
        <p style={{ fontWeight: "bold", textAlign: "center" }}>
          Looks like you thought of something we didn't.
        </p>
        <p
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "5em"
          }}
        >
          This page doesn't exist...yet.
        </p>

        <NotFoundImage width={"60vw"} />

        <Link to="/">
          <Button
            primary
            size="large"
            style={{ marginBottom: "4em", marginTop: "4em" }}
          >
            Return Home
            <Icon name="right arrow" />
          </Button>
        </Link>
      </FlexColumn>
    </Responsive>
  );
};

const DesktopNotFound = () => {
  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <FlexColumn
        justifyCenter
        alignCenter
        style={{ width: "90%", marginTop: "5em" }}
      >
        <Header
          as="h1"
          style={{
            textAlign: "center",
            marginBottom: "0.5em",
            fontSize: "3.5em"
          }}
        >
          Ooops!
        </Header>
        <p
          style={{ fontWeight: "bold", textAlign: "center", fontSize: "1.5em" }}
        >
          Looks like you thought of something we didn't.
        </p>
        <p
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "5em",
            fontSize: "1.5em"
          }}
        >
          This page doesn't exist...yet.
        </p>

        <NotFoundImage width={"500px"} />

        <Link to="/">
          <Button
            primary
            size="large"
            style={{ marginBottom: "4em", marginTop: "4em" }}
          >
            Return Home
            <Icon name="right arrow" />
          </Button>
        </Link>
      </FlexColumn>
    </Responsive>
  );
};
