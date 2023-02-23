import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SidebarLayout from "../components/SidebarLayout";

const WithLayout = (
  wrappedComponent,
  includeSidebar
) => {
  return (
    <Row>
      <Col sm={1}>{includeSidebar && <SidebarLayout />}</Col>
      <Col sm={12}>
        {wrappedComponent}
      </Col>
    </Row>
  );
};

export default WithLayout;
