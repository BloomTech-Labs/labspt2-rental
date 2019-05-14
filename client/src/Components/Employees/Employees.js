import React, { Component } from "react";
import { Button, Header, Tab, Dimmer, Loader } from "semantic-ui-react";
import { FlexColumn, FlexRow } from "custom-components";
import EmployeeList from "./EmployeeList";
import Search from "../shared/Search/Search";
import styled from "styled-components";

const DesktopButton = styled.button`
  &&& {
    margin: 0;
    @media (max-width: 420px) {
      display: none;
    }
  }
`;

const MobileButton = styled.button`
  &&& {
    margin: 0;
    @media (min-width: 421px) {
      display: none;
    }
  }
`;

const CustomWidthTab = styled(Tab)`
  @media (max-width: 420px) {
    width: 85vw;
  }
  @media (min-width: 421px) and (max-width: 700px) {
    width: 85vw;
  }
  @media (min-width: 701px) {
    width: 65vw;
  }
  @media (min-width: 850px) {
    width: 75vw;
  }
`;

export default class Employees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabs: ["All"]
    };

    this.query = {
      page: 1,
      pageSize: 3,
      sort: "_id",
      search: ""
    };
  }

  componentDidMount() {
    this.props.getEmployees({ ...this.query });
  }

  handleSearchChange = value => {
    this.query.search = value || "";
    this.props.getEmployees({ ...this.query });
  };

  handleTabChange = e => {
    this.query = {
      page: 1,
      pageSize: 4,
      sort: "_id"
    };
    this.props.getEmployees({ ...this.query });
  };

  handlePageChange = (e, data) => {
    this.query.page = data.activePage;
    this.props.getEmployees({ ...this.query });
  };

  render() {
    const { tabs } = this.state;
    const { page, pageSize } = this.query;
    const {
      employees,
      loading,
      numPages,
      tasks,
      properties,
      user
    } = this.props;
    let loadingComponent;
    if (loading) {
      loadingComponent = (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      );
    } else {
      loadingComponent = (
        <Dimmer inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      );
    }
    return (
      <FlexColumn 
      // style={{ width: "65vw" }} 
      // alignCenter
      >
        {loadingComponent}
        <FlexRow width="full" justifyBetween alignCenter spaceBottom>
          <Header as="h1" style={{ margin: 0 }}>
            Employees
          </Header>

          {user && user.role === "owner" && (
            <>
              <Button
                as={DesktopButton}
                color="blue"
                onClick={() =>
                  this.props.history.push("/dashboard/employees/add")
                }
              >
                Create Employee
              </Button>
              <Button
                as={MobileButton}
                color="blue"
                onClick={() =>
                  this.props.history.push("/dashboard/employees/add")
                }
              >
                Create
              </Button>
            </>
          )}
        </FlexRow>
        <CustomWidthTab
          // style={{ width: "60vw" }}
          onTabChange={this.handleTabChange}
          menu={{ attached: false }}
          panes={[
            ...tabs.map((tab, index) => ({
              menuItem: tab,
              render: () => (
                <Tab.Pane attached={false}>
                  <EmployeeList
                    status={tab}
                    user={user}
                    employees={employees}
                    tasks={tasks}
                    properties={properties}
                    page={page}
                    pageSize={pageSize}
                    loading={loading}
                    numPages={numPages}
                    handlePageChange={this.handlePageChange}
                  />
                </Tab.Pane>
              )
            })),
            {
              menuItem: <Search active="false" key="1" style={{ minWidth: "230px", flexGrow: "1" }} onChange={this.handleSearchChange} />
            }
          ]}
        />
      </FlexColumn>
    );
  }
}
