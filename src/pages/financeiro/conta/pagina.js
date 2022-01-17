///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, CardHeader, Container, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import { MoreHorizontal } from 'react-feather';
import { connect } from 'react-redux';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {
  Buttons, PageTitle, Modal, TableButton, DropdownRelatorio,
} from '../../../components';
import {
  editConta, consultaConta, getContaExcel, resetFieldsContaFicha,
} from '../../../functions/financeiro/conta';
import {
  showModal, hideModal, toggleFiltro, handleSidebar, getPagina, deleteRegistro, autoClickPagination,
} from '../../../functions/sistema';

import ContaFiltro from './filtro';

function ContaPagina(props) {
  const [tableData, setTableData] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  //PAGINATION INDEX
  const { indexPagination } = props;
  const [startPagination] = useState(indexPagination);
  const [retryPagination, setRetryPagination] = useState(true);
  const paginationList = document.getElementsByClassName('page-link');
  /////////
  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, classes: 'tb-conta-id', headerClasses: 'tb-col-1 bg-dark text-white tb-conta-id',
    },
    {
      dataField: 'descricao', text: 'Descrição', sort: true, classes: 'tb-conta-descricao', headerClasses: 'tb-col-6 bg-dark text-white tb-conta-descricao',
    },
    {
      dataField: 'moeda', text: 'Moeda', sort: true, classes: 'tb-conta-moeda', headerClasses: 'tb-col-3 bg-dark text-white tb-conta-moeda',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: 'tb-conta-buttons', headerClasses: 'tb-col-2 bg-dark text-white tb-conta-buttons',
    },
  ];

  const ActionButtons = [
    <Buttons
      linkTo="/financeiro/conta/ficha"
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
    <Buttons
      onClick={() => toggleFiltro(props, 'tabela-conta-filtro')}
      description="Filtrar"
      color={props.filtroColor[props.filtroAtivo]}
      title="Filtro de informações."
      permission={props}
    />,
  ];

  const Reports = [
    <UncontrolledDropdown className="float-right mt-1">
      <DropdownToggle tag="a">
        <MoreHorizontal />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownRelatorio
          onClick={() => getContaExcel(props)}
          icon={faFileExcel}
          titulo="Exportar Excel"
          permission={props}
          action="Excel"
        />
      </DropdownMenu>
    </UncontrolledDropdown>,
  ];

  useEffect(() => {
    if (firstLoad) {
      resetFieldsContaFicha(props);
      handleSidebar(props.dispatch, props.sidebar);
      getPagina(props,
        '/TsmCONTA/PAGINA/',
        '@GET_CONTA_PAGINA',
        JSON.parse(localStorage.getItem('TABELAS_CONTA_FILTRO')),
        '@SET_CONTA_FILTRO_FLAG_FALSE');
    }
    setFirstLoad(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const arrayTemp = [];
    props.tableData.forEach((item) => {
      const Buttons = [];
      if (item.id !== 0 && item.id !== '') {
        Buttons.push(
          <TableButton action="Excluir" click={() => showModal(props, item.id)} permission={props} />,
          <TableButton action="Editar" click={() => editConta(props, item.id)} permission={props} />,
          <TableButton action="Consultar" click={() => consultaConta(props, item.id)} permission={props} />,
        );
      }

      arrayTemp.push({
        id: item.id,
        descricao: item.descricao,
        moeda: item.moeda,
        buttons: Buttons,

      });
    });

    setTableData(arrayTemp);
  }, [props, props.tableData]);

  useEffect(() => {
    if (props.filtroFlag) {
      getPagina(props,
        '/TsmCONTA/PAGINA/',
        '@GET_CONTA_PAGINA',
        JSON.parse(localStorage.getItem('TABELAS_CONTA_FILTRO')),
        '@SET_CONTA_FILTRO_FLAG_FALSE');
    }
  }, [props, props.filtroFlag]);

  ////// AUTO-CLICK PAGINATION
  useEffect(() => {
    autoClickPagination(
      paginationList,
      indexPagination,
      startPagination,
      retryPagination,
      setRetryPagination,
    );
  }, [tableData, indexPagination, startPagination, retryPagination, paginationList]);

  return (
    <>
      <Modal
        open={props.modalVisibility}
        descricao="Confirma a exclusão do registro?"
        nao={() => hideModal(props)}
        sim={() => deleteRegistro(props, '/TsmCONTA/EXCLUI/', '@SET_CONTA_FILTRO_FLAG_TRUE')}
      />
      <Container fluid className="p-0">
        <PageTitle title="Conta" buttons={ActionButtons} voltar={false} />
        <ContaFiltro />
        <Card>
          {/****** header ***************/}
          {/*****************************/}
          <CardHeader className="pt-2 pb-2">
            { Reports }
            {/*<Pesquisar id="conta-pesquisa" pesquisar={ () => functions.pesquisaConta(props) } /> */}
          </CardHeader>
          {/****** body *****************/}
          {/*****************************/}
          <CardBody className="pt-0">
            <BootstrapTable
              keyField="id"
              data={tableData}
              classes="table-striped"
              columns={tableColumns}
              bootstrap4
              bordered={false}
              pagination={paginationFactory({
                alwaysShowAllBtns: true,
                sizePerPage: 10,
                sizePerPageList: [5, 10, 25, 50, 100],
                onPageChange: (page) => {
                  props.dispatch({ type: '@SET_INDEX_PAGINATION_CONTA', payload: page });
                },
              })}
            />
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  sidebar: state.sidebar,
  indexPagination: state.conta.indexPagination,
  filtroColor: state.conta.filtroColor,
  filtroAtivo: state.conta.filtroAtivo,
  tableData: state.conta.tableData,

  filtroFlag: state.conta.filtroFlag,

  isLoading: state.loading.isLoading,

  visibilityPageFinanceiro: state.usuario.visibilityPageFinanceiro,

  auth: state.sistema.auth,
  filtroVisibility: state.sistema.filtroVisibility,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(ContaPagina);
