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
  PageTitle, Buttons, Modal, DropdownRelatorio, TableButton,
} from '../../../components';

import {
  editPais, consultaPais, getPaisExcel, resetPaisFicha,
} from '../../../functions/tabelas/pais';
import {
  showModal, hideModal, toggleFiltro, handleSidebar, getPagina, deleteRegistro, autoClickPagination,
} from '../../../functions/sistema';
import PaisFiltro from './filtro';

function PaisPagina(props) {
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
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'bg-dark text-white tb-pais-id',
    },
    {
      dataField: 'sigla', text: 'Sigla', sort: true, headerClasses: 'bg-dark text-white tb-pais-sigla',
    },
    {
      dataField: 'pais', text: 'País', sort: true, headerClasses: 'bg-dark text-white tb-pais-pais',
    },
    {
      dataField: 'nacionalidade', text: 'Nacionalidade', sort: true, headerClasses: 'bg-dark text-white tb-pais-nacionalidade',
    },
    {
      dataField: 'buttons', text: '', sort: false, headerClasses: 'bg-dark text-white tb-pais-buttons',
    },
  ];

  const ActionButtons = [
    <Buttons
      linkTo="/tabelas/pais/ficha"
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
    <Buttons
      onClick={() => toggleFiltro(props, 'tabela-pais-filtro')}
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
          onClick={() => getPaisExcel(props)}
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
      resetPaisFicha(props);
      handleSidebar(props.dispatch, props.sidebar);
      getPagina(props,
        '/TsmPAIS/PAGINA/',
        '@GET_PAIS_PAGINA',
        JSON.parse(localStorage.getItem('TABELAS_PAIS_FILTRO')),
        '@SET_PAIS_FILTRO_FLAG_FALSE');
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
          <TableButton action="Editar" click={() => editPais(props, item.id)} permission={props} />,
          <TableButton action="Consultar" click={() => consultaPais(props, item.id)} permission={props} />,
        );
      }

      arrayTemp.push({
        id: item.id,
        pais: item.pais,
        sigla: item.sigla,
        nacionalidade: item.nacionalidade,
        buttons: Buttons,
      });
    });

    setTableData(arrayTemp);
  }, [props, props.tableData]);

  useEffect(() => {
    if (props.filtroFlag) {
      getPagina(props,
        '/TsmPAIS/PAGINA/',
        '@GET_PAIS_PAGINA',
        JSON.parse(localStorage.getItem('TABELAS_PAIS_FILTRO')),
        '@SET_PAIS_FILTRO_FLAG_FALSE');
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

  ///////// RENDER TABLE //////////
  /////////////////////////////////
  return (
    <>
      <Modal
        open={props.modalVisibility}
        descricao="Confirma a exclusão do registro?"
        nao={() => hideModal(props)}
        sim={() => deleteRegistro(props, '/TsmPAIS/EXCLUI/', '@SET_PAIS_FILTRO_FLAG_TRUE')}
      />
      <Container fluid className="p-0">
        <PageTitle title="Pais" buttons={ActionButtons} voltar={false} />
        <PaisFiltro />
        <Card>
          {/****** header ***************/}
          {/*****************************/}
          <CardHeader className="pt-2 pb-2">
            { Reports }
            {/*<Pesquisar id="pais-pesquisa" pesquisar={ () => functions.pesquisaPais(props) } /> */}
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
                  props.dispatch({ type: '@SET_INDEX_PAGINATION_PAIS', payload: page });
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
  indexPagination: state.pais.indexPagination,
  filtroColor: state.pais.filtroColor,
  filtroAtivo: state.pais.filtroAtivo,
  tableData: state.pais.tableData,
  filtroFlag: state.pais.filtroFlag,

  isLoading: state.loading.isLoading,

  visibilityPageTabelas: state.usuario.visibilityPageTabelas,

  auth: state.sistema.auth,
  filtroVisibility: state.sistema.filtroVisibility,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(PaisPagina);
