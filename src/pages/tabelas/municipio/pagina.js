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
  PageTitle, Buttons, Modal, TableButton, DropdownRelatorio,
} from '../../../components';
import {
  editMunicipio, consultaMunicipio, getMunicipioExcel, resetMunicipioFicha,
} from '../../../functions/tabelas/municipio';
import {
  showModal, hideModal, toggleFiltro, handleSidebar, getPagina, deleteRegistro, autoClickPagination,
} from '../../../functions/sistema';
import MunicipioFiltro from './filtro';

///////// TABELA Municipio //////////
/////////////////////////////////
function MunicipioPagina(props) {
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
      dataField: 'id', text: 'Id', classes: 'tb-municipio-id', headerClasses: 'bg-dark text-white tb-municipio-id',
    },
    {
      dataField: 'pais', text: 'País', classes: 'tb-municipio-pais', headerClasses: 'bg-dark text-white tb-municipio-pais',
    },
    {
      dataField: 'municipio', text: 'Municipio', classes: 'tb-municipio-municipio', headerClasses: 'bg-dark text-white tb-municipio-municipio',
    },
    {
      dataField: 'buttons', text: '', classes: 'tb-municipio-buttons', headerClasses: 'bg-dark text-white tb-municipio-buttons',
    },
  ];

  const ActionButtons = [
    <Buttons
      linkTo="/tabelas/municipio/ficha"
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
    <Buttons
      onClick={() => toggleFiltro(props, 'tabela-municipio-filtro')}
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
          onClick={() => getMunicipioExcel(props)}
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
      resetMunicipioFicha(props);
      handleSidebar(props.dispatch, props.sidebar);
      getPagina(props,
        '/TsmMUNICIPIO/PAGINA/',
        '@GET_MUNICIPIO_PAGINA',
        JSON.parse(localStorage.getItem('TABELAS_MUNICIPIO_FILTRO')),
        '@SET_MUNICIPIO_FILTRO_FLAG_FALSE');
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
          <TableButton action="Editar" click={() => editMunicipio(props, item.id)} permission={props} />,
          <TableButton action="Consultar" click={() => consultaMunicipio(props, item.id)} permission={props} />,
        );
      }

      arrayTemp.push({
        id: item.id,
        pais: item.pais,
        municipio: item.municipio,
        buttons: Buttons,
      });
    });

    setTableData(arrayTemp);
  }, [props, props.tableData]);

  useEffect(() => {
    if (props.filtroFlag) {
      getPagina(props,
        '/TsmMUNICIPIO/PAGINA/',
        '@GET_MUNICIPIO_PAGINA',
        JSON.parse(localStorage.getItem('TABELAS_MUNICIPIO_FILTRO')),
        '@SET_MUNICIPIO_FILTRO_FLAG_FALSE');
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
        sim={() => deleteRegistro(props, '/TsmMUNICIPIO/EXCLUI/', '@SET_MUNICIPIO_FILTRO_FLAG_TRUE')}
      />
      <Container fluid className="p-0">
        <PageTitle title="Municipio" buttons={ActionButtons} voltar={false} />
        <MunicipioFiltro />
        <Card>
          {/****** header ***************/}
          {/*****************************/}
          <CardHeader className="pt-2 pb-2">
            { Reports }
            {/*<Pesquisar id="municipio-pesquisa" pesquisar={ () => functions.pesquisaMunicipio(props) } /> */}
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
                  props.dispatch({ type: '@SET_INDEX_PAGINATION_MUNICIPIO', payload: page });
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
  indexPagination: state.municipio.indexPagination,
  filtroColor: state.municipio.filtroColor,
  filtroAtivo: state.municipio.filtroAtivo,
  tableData: state.municipio.tableData,
  filtroFlag: state.municipio.filtroFlag,

  isLoading: state.loading.isLoading,

  visibilityPageTabelas: state.usuario.visibilityPageTabelas,

  auth: state.sistema.auth,
  filtroVisibility: state.sistema.filtroVisibility,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(MunicipioPagina);
