import React, { Fragment } from "react";
import { FlexRow } from "custom-components";
import { Divider, Header, Icon, Responsive } from "semantic-ui-react";

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

export const DashboardStats = props => {
  return (
    <Fragment>
      <DesktopStats
        reservTotals={props.reservTotals}
        tasksOverdue={props.tasksOverdue}
        tasksToday={props.tasksToday}
      />
      <MobileStats
        reservTotals={props.reservTotals}
        tasksOverdue={props.tasksOverdue}
        tasksToday={props.tasksToday}
      />
    </Fragment>
  );
};

const DesktopStats = props => {
  const { reservTotals, tasksToday, tasksOverdue } = props;

  return (
    <Responsive
      getWidth={getWidth}
      minWidth={Responsive.onlyTablet.minWidth}
      style={{ width: "100%" }}
    >
      <FlexRow style={{ width: "100%" }}>
        <div
          style={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "2%",
            padding: "1%",
            backgroundColor: "#f6f9fc",
            boxShadow: "3px 8px 10px 1px rgba(0, 0, 255, .1)"
          }}
        >
          <Icon
            name="bar chart"
            size="big"
            style={{ alignSelf: "center", color: "#0080D6" }}
          />

          <Divider horizontal>
            <Header as="h4">Reservations</Header>
          </Divider>

          <p
            style={{ alignSelf: "center", fontSize: "1.5em", marginBottom: 0 }}
          >
            {" "}
            {reservTotals}
          </p>
        </div>

        <div
          style={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "2%",
            padding: "1%",
            backgroundColor: "#f6f9fc",
            boxShadow: "3px 8px 10px 1px rgba(0, 0, 255, .1)"
          }}
        >
          <Icon
            name="alarm"
            size="big"
            style={{ alignSelf: "center", color: "#ec0000" }}
          />
          <Divider horizontal>
            <Header as="h4">Overdue Tasks</Header>
          </Divider>
          <p
            style={{ alignSelf: "center", fontSize: "1.5em", marginBottom: 0 }}
          >
            {tasksOverdue}
          </p>
        </div>

        <div
          style={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "2%",
            padding: "1%",
            backgroundColor: "#f6f9fc",
            boxShadow: "3px 8px 10px 1px rgba(0, 0, 255, .1)"
          }}
        >
          <Icon
            name="clipboard list"
            color="green"
            size="big"
            style={{ alignSelf: "center" }}
          />
          <Divider horizontal>
            <Header as="h4">Today's Tasks</Header>
          </Divider>
          <p
            style={{ alignSelf: "center", fontSize: "1.5em", marginBottom: 0 }}
          >
            {tasksToday}
          </p>
        </div>
      </FlexRow>
    </Responsive>
  );
};

const MobileStats = props => {
  const { reservTotals, tasksToday, tasksOverdue } = props;

  return (
    <Responsive
      getWidth={getWidth}
      maxWidth={Responsive.onlyMobile.maxWidth}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center"
      }}
    >
      <div
        style={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "2%",
          padding: "2%",
          backgroundColor: "#f6f9fc",
          boxShadow: "rgba(0, 0, 255, 0.1) 3px 5px 8px 1px"
        }}
      >
        <p style={{ alignSelf: "center", fontSize: "2.5em", marginBottom: 0 }}>
          {reservTotals}
        </p>

        <Divider horizontal>
          <Header as="h4">Reservations</Header>
        </Divider>

        <Icon
          name="bar chart"
          size="big"
          style={{ alignSelf: "center", color: "#0080D6" }}
        />
      </div>

      <div
        style={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "2%",
          padding: "2%",
          backgroundColor: "#f6f9fc",
          boxShadow: "rgba(0, 0, 255, 0.1) 3px 5px 8px 1px"
        }}
      >
        <p style={{ alignSelf: "center", fontSize: "2.5em", marginBottom: 0 }}>
          {tasksOverdue}
        </p>

        <Divider horizontal>
          <Header as="h4">Overdue Tasks</Header>
        </Divider>

        <Icon
          name="alarm"
          size="big"
          style={{ alignSelf: "center", color: "#ec0000" }}
        />
      </div>

      <div
        style={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "2%",
          padding: "2%",
          backgroundColor: "#f6f9fc",
          boxShadow: "rgba(0, 0, 255, 0.1) 3px 5px 8px 1px"
        }}
      >
        <p style={{ alignSelf: "center", fontSize: "2.5em", marginBottom: 0 }}>
          {tasksToday}
        </p>

        <Divider horizontal>
          <Header as="h4">Today's Tasks</Header>
        </Divider>

        <Icon
          name="clipboard list"
          color="green"
          size="big"
          style={{ alignSelf: "center" }}
        />
      </div>
    </Responsive>
  );
};
