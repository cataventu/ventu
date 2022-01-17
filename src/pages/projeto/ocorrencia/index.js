///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Container, Row, CardBody, Card, Col,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  TabsProjeto, CardHeaderName, PageTitle, PaginaOcorrencia, Buttons,
} from '../../../components';
import { resetNomeProjeto } from '../../../functions/projeto';
import { handleSidebar } from '../../../functions/sistema';

function OcorrenciaProjetoPagina(props) {
  const [firstLoad, setFirst] = useState(true);

  const ActionButtons = [
    <Buttons
      linkTo={`/projeto/painel/${props.match.params.id}/ocorrencias/ficha/0`}
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
  ];

  useEffect(() => {
    if (firstLoad) {
      //const id = props.match.params.id;
      //setId_projeto(id);
      handleSidebar(props.dispatch, props.sidebar);
      resetNomeProjeto(props);
    }
    setFirst(false);
  }, [props, firstLoad]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle
          history={props.history}
          title="Projeto"
          subtitle="/ Ocorrências"
          buttons={ActionButtons}
          voltar
          linkTo="/projeto/painel"
        />

        <TabsProjeto ativo={7} props={props} />

        <Row>
          <Col sm={12}>
            <Card>
              <CardBody className="pb-0">
                <Row>
                  <Col className="pl-3 pr-3 pt-0 pb-3 m-0" sm={12}>

                    <CardHeaderName
                      {...props}
                      titulo={props.nomeProjeto}
                      label="Projeto:"
                      //excel={true}
                      //onClickExcel={ () => getExcel( props, '/TsmRSVP/EXCEL', { id_projeto } ) }
                    />

                    <PaginaOcorrencia props={props} page="PROJETO" />

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

  nomeProjeto: state.projeto.nomeProjeto,

  tableData: state.ocorrencia.tableData,
  flagTableUpdate: state.ocorrencia.flagTableUpdate,
  flagDelete: state.ocorrencia.flagDelete,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,

  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(OcorrenciaProjetoPagina);
