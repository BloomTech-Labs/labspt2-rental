import React, { Fragment } from "react";
import { FlexColumn, FlexRow } from "custom-components";
import { Header, Responsive, Button, Icon, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const PropertyStats = props => {
  let percentage;
  if (props.propTotal) {
    percentage = Math.floor(
      (props.noReservations.length / props.propTotal) * 100
    );
  }
  return (
    <Fragment>
      <Properties
        percentage={percentage}
        propTotal={props.propTotal}
        noReservations={props.noReservations}
        mobile={props.mobile}
      />
    </Fragment>
  );
};

const Properties = props => {
  const { propTotal, noReservations, percentage } = props;
  let properties;
  if (!propTotal) {
    return null;
  } else if (propTotal === 0) {
    properties = <ZeroProperties />;
  } else {
    properties = (
      <OneProperty
        percentage={percentage}
        propTotal={propTotal}
        noReservations={noReservations}
      />
    );
  }

  return (
    <Responsive
      style={{
        width: props.mobile ? "90%" : "40%",
        backgroundColor: "#f6f9fc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2%",
        boxShadow: "3px 8px 10px 1px rgba(0, 0, 255, .2)",
        marginBottom: props.mobile ? "10%" : null
      }}
    >
      {properties}
    </Responsive>
  );
};

const ZeroProperties = () => {
  return (
    <FlexColumn alignCenter>
      <Header as="h2">Uh oh!</Header>
      <Header as="h4" style={{ marginTop: "0.5em", marginBottom: 0 }}>
        No properties to show.
      </Header>
      <Link to="/dashboard/properties/add" style={{ marginTop: "2em" }}>
        <Button basic color="blue">
          Add New Property
        </Button>
      </Link>
    </FlexColumn>
  );
};

const OneProperty = props => {
  let icon;
  if (props.percentage > 50) {
    icon = (
      <FlexRow
        style={{
          width: "70%",
          alignItems: "baseline",
          justifyContent: "flex-start",
          marginLeft: "1%",
          marginTop: "2%"
        }}
      >
        <Icon name="exclamation triangle" color="red" size="large" />
        <FlexRow style={{ marginLeft: "5%" }}>
          <p style={{ fontSize: "1.2em" }}>
            <strong>{props.percentage}%</strong> are underbooked
          </p>
          <Popup
            trigger={
              <Icon
                name="info"
                size="small"
                style={{
                  alignSelf: "flex-start",
                  opacity: "0.8",
                  paddingLeft: "4%"
                }}
              />
            }
            content="Property has no upcoming reservations after this week."
            hideOnScroll
            position="right center"
            style={{ width: "10vw" }}
          />
        </FlexRow>
      </FlexRow>
    );
  } else if (props.percentage < 50 && props.percentage > 0) {
    icon = (
      <FlexRow
        style={{
          width: "70%",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginLeft: "1%"
        }}
      >
        <Icon name="exclamation triangle" color="yellow" size="large" />
        <p style={{ fontSize: "1.2em" }}>
          <strong>{props.percentage}%</strong> are underbooked
        </p>
      </FlexRow>
    );
  } else {
    icon = (
      <FlexRow
        style={{
          width: "80%",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: "1%"
        }}
      >
        <Icon name="checked calendar" color="green" size="large" />
        <p style={{ fontSize: "1.2em" }}>
          <strong>All your properties are performing well!</strong>
        </p>
      </FlexRow>
    );
  }

  let buttons;
  if (Object.keys(props.noReservations).length === 1) {
    buttons = (
      <FlexRow style={{ marginBottom: "1em", marginTop: "2em" }}>
        <Link to={`/dashboard/properties/view/${props.noReservations[0]._id}`}>
          <Button color="blue" basic animated>
            <Button.Content visible>
              <Icon name="home" />
              {props.noReservations[0].name}
            </Button.Content>
            <Button.Content hidden>
              View <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Link>
      </FlexRow>
    );
  } else if (Object.keys(props.noReservations).length === 0) {
    buttons = (
      <Link to="/dashboard/properties" style={{ marginTop: "2em" }}>
        <Button basic color="blue">
          View Properties
        </Button>
      </Link>
    );
  } else {
    buttons = (
      <FlexRow style={{ marginBottom: "1em", marginTop: "2em" }}>
        <Link to={`/dashboard/properties/view/${props.noReservations[0]._id}`}>
          <Button color="blue" basic animated>
            <Button.Content visible>
              <Icon name="home" />
              {props.noReservations[0].name}
            </Button.Content>
            <Button.Content hidden>
              View <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Link>

        <Link to={`/dashboard/properties/view/${props.noReservations[1]._id}`}>
          <Button color="blue" basic animated>
            <Button.Content visible>
              <Icon name="home" />
              {props.noReservations[1].name}
            </Button.Content>
            <Button.Content hidden>
              View <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Link>
      </FlexRow>
    );
  }

  return (
    <FlexColumn
      style={{
        width: "100%",
        marginTop: "1em",
        marginLeft: "2%",
        marginBottom: "1em"
      }}
    >
      <Header as="h2">Property Overview</Header>

      {icon}

      <FlexRow
        style={{
          width: "110%",
          alignItems: "baseline",
          justifyContent: "flex-start",
          marginLeft: "1%",
          marginTop: "1em"
        }}
      >
        <Icon name="chart line" size="large" />
        <p style={{ fontSize: "1.2em", paddingLeft: "3%", width: "100%" }}>
          <strong>Promote a property:</strong>
        </p>
      </FlexRow>

      {buttons}
    </FlexColumn>
  );
};
