import React from 'react';
import { Row, Col } from 'reactstrap';
import './style.css';

function Aviso() {
  return (
    <>
      <Row className="container-aviso pt-5">
        <Col className="text-center pt-5">
          <h1 className="text-dark mt-5">
            <strong>
              CATAVENTU - Sistema integrado
            </strong>
          </h1>
          <span className="text-dark lead">Resolução mínima: 720 x 405 px</span>
        </Col>
      </Row>
    </>
  );
}

export default Aviso;
