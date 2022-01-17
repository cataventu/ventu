import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import Statistics from './Statistics';
import LineChart from './LineChart';
import Feed from './Feed';
import Calendar from './Calendar';
import PieChart from './PieChart';
import Appointments from './Appointments';
import Projects from './Projects';
import BarChart from './BarChart';

const Default = () => (
  <Container fluid className="p-0">
    <Statistics />
    <Row>
      <Col lg="8" className="d-flex">
        <LineChart />
      </Col>
      <Col lg="4" className="d-flex">
        <Feed />
      </Col>
    </Row>
    <Row>
      <Col lg="6" xl="4" className="d-flex">
        <Calendar />
      </Col>
      <Col lg="6" xl="4" className="d-flex">
        <PieChart />
      </Col>
      <Col lg="6" xl="4" className="d-flex">
        <Appointments />
      </Col>
    </Row>
    <Row>
      <Col lg="6" xl="8" className="d-flex">
        <Projects />
      </Col>
      <Col lg="6" xl="4" className="d-flex">
        <BarChart />
      </Col>
    </Row>
  </Container>
);

export default Default;
