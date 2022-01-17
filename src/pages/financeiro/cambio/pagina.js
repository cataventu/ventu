///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, CardHeader, Container, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import { MoreHorizontal } from 'react-feather';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import {
  Buttons, PageTitle, Modal, DropdownRelatorio, TableButton,
} from '../../../components';
import {
  editCambio, consultaCambio, getCambioExcel, resetFieldsCambioFicha,
} from '../../../functions/financeiro/cambio';
import {
  showModal, hideModal, toggleFiltro, handleSidebar, getPagina, deleteRegistro, autoClickPagination,
} from '../../../functions/sistema';
import CambioFiltro from './filtro';

function CambioPagina(props) {
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
      dataField: 'id', text: 'Id', sort: true, classes: 'tb-cambio-id', headerClasses: 'tb-col-1 bg-dark text-white tb-cambio-id',
    },
    {
      dataField: 'data', text: 'Data', sort: true, classes: 'tb-cambio-data', headerClasses: 'tb-col-2 bg-dark text-white tb-cambio-data',
    },
    {
      dataField: 'moeda', text: 'Moeda', sort: true, classes: 'tb-cambio-moeda', headerClasses: 'tb-col-5 bg-dark text-white tb-cambio-moeda',
    },
    {
      dataField: 'cambio', text: 'Câmbio', sort: true, classes: 'tb-cambio-cambio', headerClasses: 'tb-col-2 bg-dark text-white tb-cambio-cambio',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: 'tb-cambio-buttons', headerClasses: 'tb-col-2 bg-dark text-white tb-cambio-buttons',
    },
  ];

  const ActionButtons = [
    <Buttons
      linkTo="/financeiro/cambio/ficha"
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
    <Buttons
      onClick={() => toggleFiltro(props, 'tabela-cambio-filtro')}
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
          onClick={() => getCambioExcel(props)}
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
      resetFieldsCambioFicha(props);
      handleSidebar(props.dispatch, props.sidebar);
      getPagina(props,
        '/TsmCAMBIO/PAGINA/',
        '@GET_CAMBIO_PAGINA',
        JSON.parse(localStorage.getItem('TABELAS_CAMBIO_FILTRO')),
        '@SET_CAMBIO_FILTRO_FLAG_FALSE');
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
          <TableButton action="Editar" click={() => editCambio(props, item.id)} permission={props} />,
          <TableButton action="Consultar" click={() => consultaCambio(props, item.id)} permission={props} />,
        );
      }

      arrayTemp.push({
        id: item.id,
        data: item.data,
        moeda: item.moeda,
        cambio: item.cambio,
        buttons: Buttons,

      });
    });

    setTableData(arrayTemp);
  }, [props, props.tableData]);

  useEffect(() => {
    if (props.filtroFlag) {
      getPagina(props,
        '/TsmCAMBIO/PAGINA/',
        '@GET_CAMBIO_PAGINA',
        JSON.parse(localStorage.getItem('TABELAS_CAMBIO_FILTRO')),
        '@SET_CAMBIO_FILTRO_FLAG_FALSE');
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
        sim={() => deleteRegistro(props, '/TsmCAMBIO/EXCLUI/', '@SET_CAMBIO_FILTRO_FLAG_TRUE')}
      />
      <Container fluid className="p-0">
        <PageTitle title="Câmbio" buttons={ActionButtons} voltar={false} />
        <CambioFiltro />
        <Card>
          {/****** header ***************/}
          {/*****************************/}
          <CardHeader className="pt-2 pb-2">
            { Reports }
            {/*<Pesquisar id="cambio-pesquisa" pesquisar={ () => functions.pesquisaCambio(props) } /> */}
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
                  props.dispatch({ type: '@SET_INDEX_PAGINATION_CAMBIO', payload: page });
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
  indexPagination: state.cambio.indexPagination,
  filtroColor: state.cambio.filtroColor,
  filtroAtivo: state.cambio.filtroAtivo,
  tableData: state.cambio.tableData,

  filtroFlag: state.cambio.filtroFlag,

  isLoading: state.loading.isLoading,

  visibilityPageFinanceiro: state.usuario.visibilityPageFinanceiro,

  auth: state.sistema.auth,
  filtroVisibility: state.sistema.filtroVisibility,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(CambioPagina);
