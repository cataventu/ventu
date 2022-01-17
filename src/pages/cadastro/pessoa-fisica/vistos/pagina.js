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
import { getRVistoPagina, deletePFisicaRVisto, resetFieldsPFisicaRVistoFichaData } from '../../../../functions/cadastro/pessoa-fisica';

function PaginaRVisto(props) {
  const [tableData, setTableData] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  const tableColumns = [
    {
      dataField: 'numero', text: 'Número', sort: true, classes: 'tb-vistos-numero', headerClasses: 'tb-col-3 bg-dark text-white tb-vistos-numero',
    },
    {
      dataField: 'mun_emissao', text: 'Município Emissão', sort: true, classes: 'tb-vistos-mun_emissao', headerClasses: 'tb-col-4 bg-dark text-white tb-vistos-mun_emissao',
    },
    {
      dataField: 'dt_validade', text: 'Data Validade', sort: true, classes: 'tb-vistos-dt_validade', headerClasses: 'tb-col-3 bg-dark text-white tb-vistos-dt_validade',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: 'tb-vistos-buttons', headerClasses: 'tb-col-2 bg-dark text-white tb-vistos-buttons',
    },
  ];

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      resetFieldsPFisicaRVistoFichaData(props, id);
      getRVistoPagina(props, id);
      setFirstLoad(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const tableData = [];

    props.rvistoTableData.rvisto_regs.forEach((item) => {
      const Buttons = [];

      if (item.id !== 0 && item.id !== '') {
        Buttons.push(
          <FontAwesomeIcon icon={icons.faTrashAlt} onClick={() => showModal(props, item.id)} className="h4 p-0 m-0 ml-2 mr-2 cursor text-danger float-right" />,
          <FontAwesomeIcon icon={icons.faEdit} onClick={() => goToPage(props, item.id)} className="h4 p-0 m-0 ml-2 mr-2 cursor text-blue float-right" />,
        );
      }

      tableData.push(
        {
          numero: item.numero,
          mun_emissao: item.mun_emissao,
          dt_validade: item.dt_validade,
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
        sim={() => deletePFisicaRVisto(props, props.modalId)}
      />
      <PageTitle
        title="Pessoa Física"
        subtitle="/ Visto"
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
          <MenuPFisica {...props} item_8="active" />
        </Col>

        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
          <Card>
            <CardBody className="pb-3">
              {/*** CARD HEADER ***/}
              <CardHeaderName {...props} titulo={props.rvistoTableData.nome} />
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
  rvistoTableData: state.pFisica.rvistoTableData,

  visibilityPageCadastro: state.usuario.visibilityPageCadastro,

  auth: state.sistema.auth,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(PaginaRVisto);
