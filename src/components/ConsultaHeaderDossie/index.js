import React, { memo } from 'react';
import { Row, Col } from 'reactstrap';

const ConsultaHeaderDossie = ({ titulo }) => (
  <>
    <Row className="p-3 text-center">
      <Col sm={12} className="align-self-center">
        <span className="h1 text-dark">{ titulo }</span>
      </Col>
    </Row>
    <hr className="bg-black m-0 p-0 mb-4" />
  </>
);

export default memo(ConsultaHeaderDossie);
