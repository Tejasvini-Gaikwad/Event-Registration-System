import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SidebarLayout from "../components/SidebarLayout";

const WithLayout = (
  wrappedComponent,
  includeSidebar
) => {
  return (
    <>
      <div>{includeSidebar && <SidebarLayout />}</div>
      <div>
        {wrappedComponent}
      </div></>
  );
};

export default WithLayout;
