///////// IMPORTS ///////////////
/////////////////////////////////
import React from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, Card, CardBody,
} from 'reactstrap';

function cardFooter(props) {
  return (
    <>
      {/*** CARD FOOTER ***/}
      <Card className="m-0 mt-1 card-shadow">
        <CardBody className="p-0 m-0">
          <Row className="p-2 m-0">
            <Col sm={12} className="p-0 m-0 text-right">
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
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  versao: state.sistema.versao,
  ult_atualizacao: state.sistema.ult_atualizacao,
});
export default connect(() => (mapState))(cardFooter);
