import React, { memo } from 'react';
import { Row, Col } from 'reactstrap';
import Logo from '../../assets/img/ventu/Logo-Ventu-Branco.png';

const ConsultaFooter = () => (
  <Row className="p-3 text-center consulta-footer">
    <Col sm={12} className="text-white bg-black pt-3 pb-3">
      <img src={Logo} width="60" alt="logo" className="mb-2" />
      <small>
        <p>Rua Fradique Coutinho, 212</p>
        <p>Cj. 12 – Pinheiros – São Paulo/SP</p>
        <p>Tel.: +55 11 3280-8076</p>
      </small>
    </Col>
  </Row>
);

export default memo(ConsultaFooter);
