import React, { memo } from 'react';
import { Row, Col } from 'reactstrap';

const ConsultaHeader = ({ titulo }) => (
  <>
    <Row className="p-3 text-center">
      <Col sm={12} className="align-self-center">
        <span className="lead text-dark pr-2"><i>Consulta</i></span>
        <span className="h1 text-dark">{ titulo }</span>
      </Col>
    </Row>
    <hr className="bg-black m-0 p-0 mb-4" />
  </>
);

export default memo(ConsultaHeader);
