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
import { PageTitle, MenuParametros } from '../../../../components';
import { goToPage, handleSidebar, goToConsult } from '../../../../functions/sistema';
import { getParametroGrupoPagina } from '../../../../functions/sistema/parametros';

function GrupoPagina(props) {
  const [tableData, setTableData] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, classes: 'tb-grupo-id', headerClasses: 'tb-col-1 bg-dark text-white tb-grupo-id',
    },
    {
      dataField: 'descricao', text: 'Descrição', sort: true, classes: 'tb-grupo-descricao', headerClasses: 'tb-col-3 bg-dark text-white tb-grupo-descricao',
    },
    {
      dataField: 'subgrupo', text: 'Grupo', sort: true, classes: 'tb-grupo-grupo', headerClasses: 'tb-col-6 bg-dark text-white tb-grupo-grupo',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: 'tb-grupo-buttons', headerClasses: 'tb-col-2 bg-dark text-white tb-grupo-buttons',
    },
  ];

  useEffect(() => {
    if (firstLoad) {
      handleSidebar(props.dispatch, props.sidebar);
      getParametroGrupoPagina(props);
      setFirstLoad(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const tableData = [];
    props.tableData.rpargrp_regs.forEach((item) => {
      const Buttons = [];

      if (item.id !== 0 && item.id !== '') {
        Buttons.push(
          <FontAwesomeIcon icon={icons.faEdit} onClick={() => goToPage(props, item.id)} className="h4 p-0 m-0 ml-2 mr-2 cursor text-blue float-right" />,
          <FontAwesomeIcon icon={icons.faFileAlt} onClick={() => goToConsult(props, item.id)} className="h4 p-0 m-0 ml-2 mr-2 cursor text-muted float-right" />,
        );
      }

      tableData.push(
        {
          id: item.id,
          descricao: item.descricao,
          subgrupo: item.subgrupo,
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

      <PageTitle
        title="Parâmetros"
        subtitle="/ Grupo"
        voltar={false}
        history={props.history}
      />
      <Row>
        {/*** MenuParametros ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuParametros {...props} item_2="active" />
        </Col>

        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
          <Card>
            <CardBody className="pb-1">
              {/*** CARD HEADER ***/}

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
  sidebar: state.sidebar,
  tableData: state.parametros.tableData,

  isLoading: state.loading.isLoading,

  visibilityPageSistema: state.usuario.visibilityPageSistema,

  auth: state.sistema.auth,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(GrupoPagina);
