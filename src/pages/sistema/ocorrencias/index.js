///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Container, Row, CardBody, Card, Col,
} from 'reactstrap';
import { connect } from 'react-redux';
import { PaginaOcorrencia, PageTitle, Buttons } from '../../../components';
import { handleSidebar, toggleFiltro } from '../../../functions/sistema';
import Filtro from './filtro';

function OcorrenciaProjetoPagina(props) {
  const [firstLoad, setFirst] = useState(true);

  const ActionButtons = [
    <Buttons
      linkTo="/sistema/ocorrencia/ficha/0"
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
    <Buttons
      onClick={() => toggleFiltro(props, 'projeto-ocorrencia-filtro')}
      description="Filtrar"
      color={props.filtroColor[props.filtroAtivo]}
      title="Filtro de informações."
      permission={props}
    />,
  ];

  useEffect(() => {
    if (firstLoad) {
      handleSidebar(props.dispatch, props.sidebar);
    }
    setFirst(false);
  }, [props, firstLoad]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle
          history={props.history}
          title="Ocorrência"
          buttons={ActionButtons}
          voltar={false}
        />

        <Filtro />

        <Row>
          <Col sm={12}>
            <Card>
              <CardBody className="pb-0">
                <Row>
                  <Col className="pl-3 pr-3 pt-0 pb-3 m-0" sm={12}>

                    <PaginaOcorrencia props={props} page="OCORRENCIAS" />

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

  tableData: state.ocorrencia.tableData,
  flagTableUpdate: state.ocorrencia.flagTableUpdate,
  flagDelete: state.ocorrencia.flagDelete,

  filtroAtivo: state.ocorrencia.filtroAtivo,
  filtroColor: state.ocorrencia.filtroColor,
  flagFiltro: state.ocorrencia.flagFiltro,

  // visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilityPageSistema: state.usuario.visibilityPageSistema,
 
 
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,

  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(OcorrenciaProjetoPagina);
