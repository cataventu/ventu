///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Container, Row, CardBody, Card, Col,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  CardHeaderName, Buttons, MenuPFisica, PageTitle, PaginaOcorrencia,
} from '../../../../components';
import { handleSidebar } from '../../../../functions/sistema';
import { getPFisicaPessoalFicha } from '../../../../functions/cadastro/pessoa-fisica';

function OcorrenciaPFisicaPagina(props) {
  const [firstLoad, setFirst] = useState(true);
  const [nomeCompleto, setNomeCompleto] = useState(true);

  const ActionButtons = [
    <Buttons
      linkTo={`/cadastro/pessoa-fisica/ficha/${props.match.params.id}/ocorrencias/ficha/0`}
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
  ];

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getPFisicaPessoalFicha(props, id);
      handleSidebar(props.dispatch, props.sidebar);
    }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    if (props.fichaData) { setNomeCompleto(props.fichaData.nome_completo); }
  }, [props.fichaData]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle
          history={props.history}
          title="Pessoa Física"
          subtitle="/ Ocorrências"
          buttons={ActionButtons}
          voltar
          linkTo="/cadastro/pessoa-fisica"
        />

        <Row>
          <Col sm={3} md={3} lg={2} xl={2}>
            <MenuPFisica {...props} item_11="active" />
          </Col>
          {/*** BODY ***/}
          <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
            <Card>
              <CardBody className="pb-0">
                <Row>
                  <Col className="pl-3 pr-3 pt-0 pb-3 m-0" sm={12}>

                    <CardHeaderName
                      {...props}
                      titulo={nomeCompleto}
                      //excel={true}
                      //onClickExcel={ () => getExcel( props, '/TsmRSVP/EXCEL', { id_projeto } ) }
                    />

                    <PaginaOcorrencia props={props} page="PFISICA" />

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
  fichaData: state.pFisica.pessoalFichaData,

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
export default connect(() => (mapState))(OcorrenciaPFisicaPagina);
