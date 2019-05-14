import React, { Fragment } from "react";
import { FlexColumn, FlexRow } from "custom-components";
import { Header, Responsive, List, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const EmployeeList = props => {
  let employeeTaskObject = {};
  if (props.employeeTasks) {
    const { employee0, employee1, employee2 } = props.employeeTasks;

    employeeTaskObject = createEmployeeTaskObject(
      employee0,
      employee1,
      employee2
    );
  }
  return (
    <Fragment>
      <Employees
        user={props.user}
        employeeTaskObject={employeeTaskObject}
        employees={props.employees}
        mobile={props.mobile}
      />
    </Fragment>
  );
};

const Employees = props => {
  const { render, count } = props.employeeTaskObject;
  let employees;
  if (!render) {
    return null;
  } else if (render.employee0 === false) {
    employees = <ZeroEmployees />;
  } else if (render.employee1 === false) {
    employees = <OneEmployee employees={props.employees} count={count} />;
  } else if (render.employee2 === false) {
    employees = <TwoEmployees employees={props.employees} count={count} />;
  } else {
    employees = <ThreeEmployees employees={props.employees} count={count} />;
  }

  return (
    <Responsive
      style={{
        width: props.mobile ? "90%" : "50%",
        backgroundColor: "#f6f9fc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2%",
        boxShadow: "3px 8px 10px 1px rgba(0, 0, 255, .2)",
        marginBottom: props.mobile ? "10%" : null
      }}
    >
      {employees}
    </Responsive>
  );
};

const ZeroEmployees = () => {
  return (
    <FlexColumn alignCenter>
      <Header as="h2">Uh oh!</Header>
      <Header as="h4" style={{ marginTop: "0.5em", marginBottom: 0 }}>
        No employees to show.
      </Header>
      <Link to="/dashboard/employees/add" style={{ marginTop: "2em" }}>
        <Button basic color="blue">
          Add New Employees
        </Button>
      </Link>
    </FlexColumn>
  );
};

const OneEmployee = props => {
  return (
    <FlexColumn
      style={{
        width: "100%",
        marginTop: "1em",
        marginLeft: "2%",
        marginBottom: "1em"
      }}
    >
      <Header as="h2">Employee Overview</Header>
      <List relaxed style={{ width: "100%" }}>
        <List.Item
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "80%"
          }}
        >
          <Image
            style={{ width: "3em", height: "3em" }}
            avatar
            src={`https://res.cloudinary.com/roostr-labpt2/image/upload/c_lfill,g_center,h_500,w_400/v1556336341/${
              props.employees[0].image
            }.jpg`}
          />
          <List.Content>
            <Link to={`/dashboard/employees/${props.employees[0]._id}`}>
              <List.Header>
                {props.employees[0].firstName} {props.employees[0].lastName}
              </List.Header>
            </Link>
            <FlexRow style={{ marginTop: "3%" }}>
              <List.Description style={{ marginRight: "1.5em" }}>
                Overdue tasks:{" "}
                <strong>
                  <b>{props.count.employee0.overdue}</b>
                </strong>{" "}
              </List.Description>
              <List.Description>
                Today's tasks:{" "}
                <strong>
                  <b>{props.count.employee0.today}</b>
                </strong>{" "}
              </List.Description>
            </FlexRow>
          </List.Content>
        </List.Item>
      </List>

      <Link to="/dashboard/employees/add" style={{ marginTop: "2em" }}>
        <Button basic color="blue">
          Add New Employees
        </Button>
      </Link>
    </FlexColumn>
  );
};

const TwoEmployees = props => {
  return (
    <FlexColumn
      style={{
        width: "100%",
        marginTop: "1em",
        marginLeft: "2%",
        marginBottom: "1em"
      }}
    >
      <Header as="h2">Employee Overview</Header>
      <List relaxed style={{ width: "100%" }}>
        <List.Item
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "80%"
          }}
        >
          <Image
            style={{ width: "3em", height: "3em" }}
            avatar
            src={`https://res.cloudinary.com/roostr-labpt2/image/upload/c_lfill,g_center,h_500,w_400/v1556336341/${
              props.employees[0].image
            }.jpg`}
          />
          <List.Content>
            <Link to={`/dashboard/employees/${props.employees[0]._id}`}>
              <List.Header>
                {props.employees[0].firstName} {props.employees[0].lastName}
              </List.Header>
            </Link>
            <FlexRow style={{ marginTop: "3%" }}>
              <List.Description style={{ marginRight: "1.5em" }}>
                Overdue tasks:{" "}
                <strong>
                  <b>{props.count.employee0.overdue}</b>
                </strong>{" "}
              </List.Description>
              <List.Description>
                Today's tasks:{" "}
                <strong>
                  <b>{props.count.employee0.today}</b>
                </strong>{" "}
              </List.Description>
            </FlexRow>
          </List.Content>
        </List.Item>

        <List.Item
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "80%",
            marginTop: "0.5em"
          }}
        >
          <Image
            style={{ width: "3em", height: "3em" }}
            avatar
            src={`https://res.cloudinary.com/roostr-labpt2/image/upload/c_lfill,g_center,h_500,w_400/v1556336341/${
              props.employees[1].image
            }.jpg`}
          />
          <List.Content>
            <Link to={`/dashboard/employees/${props.employees[1]._id}`}>
              <List.Header>
                {props.employees[1].firstName} {props.employees[1].lastName}
              </List.Header>
            </Link>
            <FlexRow style={{ marginTop: "3%" }}>
              <List.Description style={{ marginRight: "1.5em" }}>
                Overdue tasks:{" "}
                <strong>
                  <b>{props.count.employee1.overdue}</b>
                </strong>{" "}
              </List.Description>
              <List.Description>
                Today's tasks:{" "}
                <strong>
                  <b>{props.count.employee1.today}</b>
                </strong>{" "}
              </List.Description>
            </FlexRow>
          </List.Content>
        </List.Item>
      </List>

      <Link to="/dashboard/employees" style={{ marginTop: "1em" }}>
        <Button basic color="blue">
          View Employees
        </Button>
      </Link>
    </FlexColumn>
  );
};

const ThreeEmployees = props => {
  return (
    <FlexColumn
      style={{
        width: "100%",
        marginTop: "1em",
        marginLeft: "2%",
        marginBottom: "1em"
      }}
    >
      <Header as="h2">Employee Overview</Header>
      <List relaxed style={{ width: "100%" }}>
        <List.Item
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "80%"
          }}
        >
          <Image
            style={{ width: "3em", height: "3em" }}
            avatar
            src={`https://res.cloudinary.com/roostr-labpt2/image/upload/c_lfill,g_center,h_500,w_400/v1556336341/${
              props.employees[0].image
            }.jpg`}
          />
          <List.Content>
            <Link to={`/dashboard/employees/${props.employees[0]._id}`}>
              <List.Header>
                {props.employees[0].firstName} {props.employees[0].lastName}
              </List.Header>
            </Link>
            <FlexRow style={{ marginTop: "3%" }}>
              <List.Description style={{ marginRight: "1.5em" }}>
                Overdue tasks:{" "}
                <strong>
                  <b>{props.count.employee0.overdue}</b>
                </strong>{" "}
              </List.Description>
              <List.Description>
                Today's tasks:{" "}
                <strong>
                  <b>{props.count.employee0.today}</b>
                </strong>{" "}
              </List.Description>
            </FlexRow>
          </List.Content>
        </List.Item>

        <List.Item
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "80%",
            marginTop: "0.5em"
          }}
        >
          <Image
            style={{ width: "3em", height: "3em" }}
            avatar
            src={`https://res.cloudinary.com/roostr-labpt2/image/upload/c_lfill,g_center,h_500,w_400/v1556336341/${
              props.employees[1].image
            }.jpg`}
          />
          <List.Content>
            <Link to={`/dashboard/employees/${props.employees[1]._id}`}>
              <List.Header>
                {props.employees[1].firstName} {props.employees[1].lastName}
              </List.Header>
            </Link>
            <FlexRow style={{ marginTop: "3%" }}>
              <List.Description style={{ marginRight: "1.5em" }}>
                Overdue tasks:{" "}
                <strong>
                  <b>{props.count.employee1.overdue}</b>
                </strong>{" "}
              </List.Description>
              <List.Description>
                Today's tasks:{" "}
                <strong>
                  <b>{props.count.employee1.today}</b>
                </strong>{" "}
              </List.Description>
            </FlexRow>
          </List.Content>
        </List.Item>

        <List.Item
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "80%",
            marginTop: "0.5em"
          }}
        >
          <Image
            style={{ width: "3em", height: "3em" }}
            avatar
            src={`https://res.cloudinary.com/roostr-labpt2/image/upload/c_lfill,g_center,h_500,w_400/v1556336341/${
              props.employees[2].image
            }.jpg`}
          />
          <List.Content>
            <Link to={`/dashboard/employees/${props.employees[2]._id}`}>
              <List.Header>
                {props.employees[2].firstName} {props.employees[2].lastName}
              </List.Header>
            </Link>
            <FlexRow style={{ marginTop: "3%" }}>
              <List.Description style={{ marginRight: "1.5em" }}>
                Overdue tasks:{" "}
                <strong>
                  <b>{props.count.employee2.overdue}</b>
                </strong>{" "}
              </List.Description>
              <List.Description>
                Today's tasks:{" "}
                <strong>
                  <b>{props.count.employee2.today}</b>
                </strong>{" "}
              </List.Description>
            </FlexRow>
          </List.Content>
        </List.Item>
      </List>

      <Link to="/dashboard/employees" style={{ marginTop: "1.5em" }}>
        <Button basic color="blue">
          View All Employees
        </Button>
      </Link>
    </FlexColumn>
  );
};

const countEmployees = array => {
  let overdueCount = 0;
  let todayCount = 0;
  array.forEach(item => {
    if (item.status === "due today") {
      overdueCount++;
    } else if (item.status === "overdue") {
      todayCount++;
    }
  });
  return { overdue: overdueCount, today: todayCount };
};

const createEmployeeTaskObject = (employee0, employee1, employee2) => {
  let employeeTaskCount = {};
  let employeeRender = {
    employee0: false,
    employee1: false,
    employee2: false
  };

  if (employee0) {
    if (employee0.length > 0) {
      employeeTaskCount = {
        ...employeeTaskCount,
        employee0: countEmployees(employee0)
      };
      employeeRender.employee0 = true;
    }
    if (employee0.length === 0) {
      employeeTaskCount = { ...employeeTaskCount, employee0: 0 };
    }
  }
  if (employee1) {
    if (employee1.length > 0) {
      employeeTaskCount = {
        ...employeeTaskCount,
        employee1: countEmployees(employee1)
      };
      employeeRender.employee1 = true;
    }
    if (employee1.length === 0) {
      employeeTaskCount = { ...employeeTaskCount, employee1: 0 };
    }
  }
  if (employee2) {
    if (employee2.length > 0) {
      employeeTaskCount = {
        ...employeeTaskCount,
        employee2: countEmployees(employee2)
      };
      employeeRender.employee2 = true;
    }
    if (employee2.length === 0) {
      employeeTaskCount = { ...employeeTaskCount, employee2: 0 };
    }
  }

  return { render: employeeRender, count: employeeTaskCount };
};
