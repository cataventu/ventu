///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, CardBody, Card, Col,
} from 'reactstrap';
import {
  PageTitle, CardHeaderName, MenuPFisica, FichaOcorrencia,
} from '../../../../components';
import { getPFisicaPessoalFicha } from '../../../../functions/cadastro/pessoa-fisica';

function OcorrenciaPFisicaFicha(props) {
  const { id: id_pfisica } = props.match.params;

  const [firstLoad, setFirst] = useState(true);
  const [nomeCompleto, setNomeCompleto] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      getPFisicaPessoalFicha(props, id_pfisica);
    }
    setFirst(false);
  }, [props, firstLoad, id_pfisica]);

  useEffect(() => {
    if (props.fichaPessoal) { setNomeCompleto(props.fichaPessoal.nome_completo); }
  }, [props.fichaPessoal]);

  return (
    <Container fluid className="p-0">
      <PageTitle
        history={props.history}
        title="Pessoa Física"
        subtitle="/ Ocorrências"
        voltar
        linkTo={`/cadastro/pessoa-fisica/ficha/${id_pfisica}/ocorrencias`}
      />
      <Row>
        {/*** MENU ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuPFisica {...props} item_11="active" />
        </Col>
        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
          <Card>
            <CardBody className="pb-0">

              <CardHeaderName {...props} titulo={nomeCompleto} />

              <FichaOcorrencia props={props} page="PFISICA" />

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
  fichaPessoal: state.pFisica.pessoalFichaData,
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

  visibilityPageCadastro: state.usuario.visibilityPageCadastro,
});
export default connect(() => (mapState))(OcorrenciaPFisicaFicha);
