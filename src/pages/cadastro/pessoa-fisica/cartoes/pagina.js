///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardBody, Col, Row, Container,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import {
  PageTitle, MenuPFisica, Buttons, Modal, CardHeaderName,
} from '../../../../components';
import { showModal, hideModal, goToPage } from '../../../../functions/sistema';
import { getRCartaoPagina, deletePFisicaRCartao, resetFieldsPFisicaRCartaoFichaData } from '../../../../functions/cadastro/pessoa-fisica';

function PaginaRCartao(props) {
  const [tableData, setTableData] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  const tableColumns = [
    {
      dataField: 'tipo_cartao', text: 'Tipo', sort: true, classes: 'tb-cartoes-tipo_cartao', headerClasses: 'tb-col-3 bg-dark text-white tb-cartoes-tipo_cartao',
    },
    {
      dataField: 'numero', text: 'Número', sort: true, classes: 'tb-cartoes-numero', headerClasses: 'tb-col-3 bg-dark text-white tb-cartoes-numero',
    },
    {
      dataField: 'validade', text: 'Data Validade', sort: true, classes: 'tb-cartoes-validade', headerClasses: 'tb-col-3 bg-dark text-white tb-cartoes-validade',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: 'tb-cartoes-buttons', headerClasses: 'tb-col-3 bg-dark text-white tb-cartoes-buttons',
    },
  ];

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      resetFieldsPFisicaRCartaoFichaData(props, id);
      getRCartaoPagina(props, id);
      setFirstLoad(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const tableData = [];

    props.rcartaoTableData.rcartao_regs.forEach((item) => {
      const Buttons = [];

      if (item.id !== 0 && item.id !== '') {
        Buttons.push(
          <FontAwesomeIcon icon={icons.faTrashAlt} onClick={() => showModal(props, item.id)} className="h4 p-0 m-0 ml-2 mr-2 cursor text-danger float-right" />,
          <FontAwesomeIcon icon={icons.faEdit} onClick={() => goToPage(props, item.id)} className="h4 p-0 m-0 ml-2 mr-2 cursor text-blue float-right" />,

        );
      }

      tableData.push(
        {
          tipo_cartao: item.tipo_cartao,
          numero: item.numero,
          validade: item.validade,
          buttons: Buttons,
        },
      );
    });
    setTableData(tableData);
  }, [props, props.tableData]);

  return (
    <Container fluid className="p-0">
      <Modal
        open={props.modalVisibility}
        descricao="Confirma a exclusão do registro?"
        nao={() => hideModal(props)}
        sim={() => deletePFisicaRCartao(props, props.modalId)}
      />
      <PageTitle
        title="Pessoa Física"
        subtitle="/ Cartão"
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
        {/*** MenuPFisica ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuPFisica {...props} item_9="active" />
        </Col>

        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
          <Card>
            <CardBody className="pb-3">
              {/*** CARD HEADER ***/}
              <CardHeaderName {...props} titulo={props.rcartaoTableData.nome} />

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
  rcartaoTableData: state.pFisica.rcartaoTableData,

  visibilityPageCadastro: state.usuario.visibilityPageCadastro,

  auth: state.sistema.auth,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(PaginaRCartao);
