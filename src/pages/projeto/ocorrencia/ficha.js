///////// IMPORTS ///////////////
/////////////////////////////////
import React from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, CardBody, Card, Col,
} from 'reactstrap';
import {
  TabsProjeto, FichaOcorrencia, PageTitle, CardHeaderName,
} from '../../../components';

function OcorrenciaProjetoFicha(props) {
  const { id: id_projeto } = props.match.params;

  return (
    <Container fluid className="p-0">
      <PageTitle
        history={props.history}
        title="Projeto"
        subtitle="/ Ocorrências / Cadastrar"
        voltar
        linkTo={`/projeto/painel/${id_projeto}/ocorrencias`}
      />

      <TabsProjeto ativo={7} props={props} />

      <Row>
        <Col sm={12}>
          <Card>
            <CardBody className="pb-0">

              <CardHeaderName {...props} titulo={props.nomeProjeto} label="Projeto:" />

              <FichaOcorrencia props={props} page="PROJETO" />

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
  nomeProjeto: state.projeto.nomeProjeto,
  fichaData: state.ocorrencia.fichaData,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  status_ocorrencia: state.sistema.status_ocorrencia,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  autoCompletarId_Pfisica: state.autoCompletar.autoCompletarId_Pfisica,
  autoCompletarId_Pjuridica: state.autoCompletar.autoCompletarId_Pjuridica,
  autoCompletarId_Projeto: state.autoCompletar.autoCompletarId_Projeto,
});
export default connect(() => (mapState))(OcorrenciaProjetoFicha);
