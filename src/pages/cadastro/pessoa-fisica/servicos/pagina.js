///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react'; import { connect } from 'react-redux';
import {
  Card, CardBody, Col, Row, Container,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import {
  PageTitle, MenuPFisica, Buttons, Modal,
  CardHeaderName,
} from '../../../../components';
import { showModal, hideModal, goToPage } from '../../../../functions/sistema';
import { getRServicoPagina, deletePFisicaRServico, resetFieldsPFisicaRServicoFichaData } from '../../../../functions/cadastro/pessoa-fisica';

function RServicosPagina(props) {
  const [tableData, setTableData] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const tableColumns = [
    {
      dataField: 'servico', text: 'Serviço', sort: true, classes: 'tb-rservico-servico', headerClasses: 'bg-dark text-white tb-rservico-servico',
    },
    {
      dataField: 'pag_prazo', text: 'Prazo Pagto', sort: true, classes: 'tb-rservico-pag_prazo', headerClasses: 'bg-dark text-white tb-rservico-pag_prazo',
    },
    {
      dataField: 'dpag_criterio', text: 'Critério Pagto', sort: true, classes: 'tb-rservico-dpag_criterio', headerClasses: 'bg-dark text-white tb-rservico-dpag_criterio',
    },
    {
      dataField: 'rec_prazo', text: 'Prazo Receb.', sort: true, classes: 'tb-rservico-rec_prazo', headerClasses: 'bg-dark text-white tb-rservico-rec_prazo',
    },
    {
      dataField: 'drec_criterio', text: 'Critério Receb.', sort: true, classes: 'tb-rservico-drec_criterio', headerClasses: 'bg-dark text-white tb-rservico-drec_criterio',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: 'tb-rservico-buttons', headerClasses: 'bg-dark text-white tb-rservico-buttons',
    },
  ];

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      resetFieldsPFisicaRServicoFichaData(props, id);
      if (id > 0) { getRServicoPagina(props, id); }
      //getPagina(  props, 'TsmRSERVICO/PAGINA', '@GET_RSERVICO_PAGINA');
      setFirstLoad(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const tableData = [];

    props.rservicoTableData.rservico_regs.forEach((item) => {
      const Buttons = [];

      if (item.id !== 0 && item.id !== '') {
        Buttons.push(
          <FontAwesomeIcon icon={icons.faTrashAlt} onClick={() => showModal(props, item.id)} className="h4 p-0 m-0 ml-2 mr-2 cursor text-danger float-right" />,
          //<FontAwesomeIcon  icon={icons.faEdit} onClick={ (e) => goToPage("/endereco/ficha/"+ item.id, e) } className="h4 p-0 m-0 ml-2 mr-2 cursor text-blue float-right" />
          <FontAwesomeIcon icon={icons.faEdit} onClick={() => goToPage(props, item.id)} className="h4 p-0 m-0 ml-2 mr-2 cursor text-blue float-right" />,

        );
      }

      tableData.push(
        {
          servico: item.servico,
          pag_prazo: item.pag_prazo,
          dpag_criterio: item.dpag_criterio,
          rec_prazo: item.rec_prazo,
          drec_criterio: item.drec_criterio,
          buttons: Buttons,
        },
      );
    });
    setTableData(tableData);
  }, [props, props.tableData]);

  ///////// RENDER ////////////////
  /////////////////////////////////
  return (
    <Container fluid className="p-0">
      <Modal
        open={props.modalVisibility}
        descricao="Confirma a exclusão do registro?"
        nao={() => hideModal(props)}
        sim={() => deletePFisicaRServico(props, props.modalId)}
      />
      <PageTitle
        title="Pessoa Física"
        subtitle="/ Serviço"
        voltar
        history={props.history}
        linkTo="/cadastro/pessoa-fisica"
        buttons={(
          <Buttons
            linkTo={`${props.location.pathname}/ficha/0`}
            description="Cadastrar"
            icon="faPlus"
            color="primary"
            title="Cadastrar novo registro."
          />
        )}
      />
      <Row>
        {/*** MENU ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuPFisica {...props} item_13="active" />
        </Col>
        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
          <Card>
            <CardBody className="pb-3">
              {/*** CARD HEADER ***/}
              <CardHeaderName {...props} titulo={props.rservicoTableData.nome} />
              <BootstrapTable
                keyField="id"
                data={tableData}
                classes="table-striped"
                columns={tableColumns}
                bootstrap4
                bordered={false}
                pagination={paginationFactory({
                  sizePerPage: 25,
                  sizePerPageList: [5, 10, 25, 50, 100],
                })}
              />
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
  rservicoTableData: state.pFisica.rservicoTableData,

  visibilityPageCadastro: state.usuario.visibilityPageCadastro,

  auth: state.sistema.auth,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(RServicosPagina);
