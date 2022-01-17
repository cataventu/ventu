import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Main } from '../components';

const Auth = ({ children }) => (
  <>
    <Main className="d-flex w-100">
      <Container className="d-flex flex-column">
        <Row className="h-100">
          <Col sm="10" md="8" lg="6" className="mx-auto d-table h-100">
            <div className="d-table-cell align-middle">{children}</div>
          </Col>
        </Row>
      </Container>
    </Main>
  </>
);

export default Auth;
