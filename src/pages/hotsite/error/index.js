///////// IMPORTS ///////////////
/////////////////////////////////
import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

function Hotsite() {
  return (
    <>
      <Row className="body-hotsite p-5">

        <Col sm={12} className="hotsite-error-text-container">
          <FontAwesomeIcon icon={faExclamationTriangle} className="hotsite-error-icon mr-3 text-danger" />
          <div>
            <p className="h1 mb-2 text-danger">Ops!</p>
            <p className="h5"><i>Página não encontrada</i></p>
          </div>
        </Col>

      </Row>
    </>
  );
}

export default Hotsite;
