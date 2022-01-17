///////// IMPORTS ///////////////
/////////////////////////////////
import React from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, CardBody, Card, Col,
} from 'reactstrap';
import { PageTitle, FichaOcorrencia } from '../../../components';

function OcorrenciaProjetoFicha(props) {
  return (
    <Container fluid className="p-0">
      <PageTitle
        history={props.history}
        title="Ocorrência"
        subtitle="/ Cadastrar"
        voltar
        linkTo="/sistema/ocorrencia"
      />
      <Row>
        <Col sm={12}>
          <Card>
            <CardBody className="pb-0">

              <FichaOcorrencia props={props} page="OCORRENCIA" />

            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  fichaData: state.ocorrencia.fichaData,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  status_ocorrencia: state.sistema.status_ocorrencia,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  autoCompletarCursor: state.autoCompletar.autoCompletarCursor,

  autoCompletarId_Pfisica: state.autoCompletar.autoCompletarId_Pfisica,
  autoCompletarPfisica: state.autoCompletar.autoCompletarPfisica,

  autoCompletarId_Pjuridica: state.autoCompletar.autoCompletarId_Pjuridica,
  autoCompletarPjuridica: state.autoCompletar.autoCompletarPjuridica,

  autoCompletarId_Projeto: state.autoCompletar.autoCompletarId_Projeto,
  autoCompletarProjeto: state.autoCompletar.autoCompletarProjeto,
});
export default connect(() => (mapState))(OcorrenciaProjetoFicha);
