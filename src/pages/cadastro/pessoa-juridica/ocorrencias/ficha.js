///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, CardBody, Card, Col,
} from 'reactstrap';
import {
  FichaOcorrencia, MenuPJuridica, CardHeaderName, PageTitle,
} from '../../../../components';
import { getPJuridicaComercialFicha } from '../../../../functions/cadastro/pessoa-juridica';

function OcorrenciaPJuridicaFicha(props) {
  const [nomeFantasia, setNomeFantasia] = useState(true);
  const [firstLoad, setFirst] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getPJuridicaComercialFicha(props, id);
    }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    if (props.fichaComerciais) { setNomeFantasia(props.fichaComerciais.nome_fantasia); }
  }, [props.fichaComerciais]);

  return (
    <Container fluid className="p-0">
      <PageTitle
        history={props.history}
        title="Pessoa Jurídica"
        subtitle="/ Ocorrências"
        voltar
      />
      <Row>
        {/*** MenuPJuridica ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuPJuridica {...props} item_4="active" />
        </Col>
        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
          <Card>
            <CardBody className="pb-0">

              <CardHeaderName {...props} titulo={nomeFantasia} />

              <FichaOcorrencia props={props} page="PJURIDICA" />

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
  fichaComerciais: state.pJuridica.comercialFichaData,
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
export default connect(() => (mapState))(OcorrenciaPJuridicaFicha);
