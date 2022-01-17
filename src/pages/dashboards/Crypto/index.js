import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import Chart from './Chart';

import Tickers from './Tickers';
import Markets from './Markets';
import Orders from './Orders';

const Crypto = () => (
  <Container fluid className="p-0">
    <Tickers />
    <Row>
      <Col lg="5" className="d-flex col-xxl-4">
        <Markets />
      </Col>
      <Col lg="7" className="d-flex col-xxl-8">
        <Chart />
      </Col>
    </Row>
    <Orders />
  </Container>
);

export default Crypto;
