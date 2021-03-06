import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import BarChart from './BarChart';
import RadarChart from './RadarChart';
import PieChart from './PieChart';

import Statistics from './Statistics';
import WorldMap from './WorldMap';
import Languages from './Languages';
import Traffic from './Traffic';

const Analytics = () => (
  <Container fluid className="p-0">
    <Row>
      <Col lg="6" xl="5" className="d-flex">
        <Statistics />
      </Col>
      <Col lg="6" xl="7" className="d-flex">
        <WorldMap />
      </Col>
    </Row>
    <Row>
      <Col lg="4" className="d-flex">
        <Languages />
      </Col>
      <Col lg="4" className="d-flex">
        <BarChart />
      </Col>
      <Col lg="4" className="d-flex">
        <RadarChart />
      </Col>
    </Row>
    <Row>
      <Col lg="5" xl="4" className="d-flex">
        <PieChart />
      </Col>
      <Col lg="7" xl="8" className="d-flex">
        <Traffic />
      </Col>
    </Row>
  </Container>
);

export default Analytics;
