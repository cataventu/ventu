///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Container, Row, CardBody, Card, Col,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  CardHeaderName, Buttons, MenuPJuridica, PaginaOcorrencia, PageTitle,
} from '../../../../components';
import { handleSidebar } from '../../../../functions/sistema';
import { getPJuridicaComercialFicha } from '../../../../functions/cadastro/pessoa-juridica';

function OcorrenciaPjuridicaPagina(props) {
  const [firstLoad, setFirst] = useState(true);
  const [nomeFantasia, setNomeFantasia] = useState(true);

  const ActionButtons = [
    <Buttons
      linkTo={`/cadastro/pessoa-juridica/ficha/${props.match.params.id}/ocorrencias/ficha/0`}
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
  ];

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getPJuridicaComercialFicha(props, id);
      handleSidebar(props.dispatch, props.sidebar);
    }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    if (props.fichaData) { setNomeFantasia(props.fichaData.nome_fantasia); }
  }, [props.fichaData]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle
          history={props.history}
          title="Pessoa Jurídica"
          subtitle="/ Ocorrências"
          buttons={ActionButtons}
          voltar
          linkTo="/cadastro/pessoa-juridica"
        />

        <Row>
          <Col sm={3} md={3} lg={2} xl={2}>
            <MenuPJuridica {...props} item_4="active" />
          </Col>
          {/*** BODY ***/}
          <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
            <Card>
              <CardBody className="pb-0">
                <Row>
                  <Col className="pl-3 pr-3 pt-0 pb-3 m-0" sm={12}>

                    <CardHeaderName
                      {...props}
                      titulo={nomeFantasia}
                      //excel={true}
                      //onClickExcel={ () => getExcel( props, '/TsmRSVP/EXCEL', { id_projeto } ) }
                    />

                    <PaginaOcorrencia props={props} page="PJURIDICA" />

                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  sidebar: state.sidebar,
  fichaData: state.pJuridica.comercialFichaData,

  tableData: state.ocorrencia.tableData,
  flagTableUpdate: state.ocorrencia.flagTableUpdate,
  flagDelete: state.ocorrencia.flagDelete,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,

  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,

  visibilityPageCadastro: state.usuario.visibilityPageCadastro,
});
export default connect(() => (mapState))(OcorrenciaPjuridicaPagina);
