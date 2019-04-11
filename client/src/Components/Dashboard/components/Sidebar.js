import React from "react";
import { Container } from "custom-components";
import { Responsive, Segment } from "semantic-ui-react";
import { Menu } from "semantic-ui-react/dist/commonjs/collections/Menu";
import { Mobile } from "./Mobile";
import { Desktop } from "./Desktop";

const Sidebar = props => {
  const links = [
    { url: `/dashboard/reservations`, name: "Reservations", icon: "book" },
    { url: `/dashboard/properties`, name: "Properties", icon: "home" },
    { url: `/dashboard/employees`, name: "Employees", icon: "address card" },
    { url: `/dashboard/tasks`, name: "Tasks", icon: "tasks" },
    { url: `/dashboard/settings`, name: "Settings", icon: "setting" }
  ];

  return (
    <>
      <Responsive as={Container} maxWidth={700}>
        <Mobile pusher={props.children} links={links} />
      </Responsive>
      <Responsive as={Container} minWidth={701}>
        <Desktop pusher={props.children} links={links} />
      </Responsive>
    </>
  );
};

export default Sidebar;
