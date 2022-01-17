import React, { memo } from 'react';
import { Row, Col } from 'reactstrap';
import Logo from '../../assets/img/ventu/Logo-Ventu-Preto.png';

const ConsultaFooter = () => (
  <Row className="p-0 text-center consulta-footer">
    {/* <Col sm={12}>
      <hr />
    </Col> */}
    <Col sm={5} className="text-black bg-white pt-3 pb-3" align="right">
      <img src={Logo} width="60" alt="logo" className="mb-2" />
    </Col>
    <Col sm={7} className="text-black bg-white pt-3 pb-3" align="left">
      <small>
        <p>Rua Fradique Coutinho, 212 - Cj. 12 – Pinheiros – São Paulo/SP</p>
        <p>Tel.: +55 11 3280-8076</p>
      </small>
    </Col>

  </Row>
);

export default memo(ConsultaFooter);
