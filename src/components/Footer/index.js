import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

const Footer = (props) => (
  <footer className="footer text-muted d-print-none">
    <Container fluid>
      <Row>
        <Col className="text-right">
          <p className="mb-0">
            <span>CATAVENTU - Sistema Integrado</span>
            <span className="mr-3 ml-3">|</span>
            <span>
              <b className="mr-1">Versão</b>
              {' '}
              {props.versao}
            </span>
            <span className="mr-3 ml-3">|</span>
            <span>
              <b className="mr-1">última atualização</b>
              {' '}
              {props.ult_atualizacao}
            </span>
            <span className="mr-3 ml-3">|</span>
            <span>Integrasis Informática - 2019 &copy;</span>
            <span className="ml-3">|</span>
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
);

/// export default Footer;

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (store) => ({
  versao: store.sistema.versao,
  ult_atualizacao: store.sistema.ult_atualizacao,
});
export default memo(connect(() => (mapState))(Footer));
