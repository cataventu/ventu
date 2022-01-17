///////// IMPORTS ///////////////
/////////////////////////////////
import React from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, CardBody, Card, Col,
} from 'reactstrap';
import {
  ConsultaOcorrencia, PageTitle, ConsultaFooter, ConsultaHeader,
} from '../../../components';

function OcorrenciaConsulta(props) {
  return (
    <Container fluid className="p-0 ">
      <PageTitle history={props.history} title="Consulta" voltar />
      <Card className="p-3">
        <div className="consulta-body">
          <ConsultaHeader titulo="Ocorrência" />
          <Row>

            <Col sm={12}>

              <CardBody className="pb-0">

                <ConsultaOcorrencia props={props} page="OCORRENCIAS" />

              </CardBody>

            </Col>
          </Row>

          <ConsultaFooter />
        </div>
      </Card>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  fichaData: state.ocorrencia.fichaData,
  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  visibilityPageSistema: state.usuario.visibilityPageSistema,
  visibilitySubPages: state.usuario.visibilitySubPages,

});
export default connect(() => (mapState))(OcorrenciaConsulta);
