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
  Buttons, PageTitle, Modal, TableButton, DropdownRelatorio,
} from '../../../components';
import {
  editGrupo, consultaGrupo, getGrupoExcel, resetFieldsGrupoFicha,
} from '../../../functions/financeiro/grupo';
import {
  showModal, hideModal, toggleFiltro, handleSidebar, getPagina, deleteRegistro, autoClickPagination,
} from '../../../functions/sistema';
import GrupoFiltro from './filtro';

function GrupoPagina(props) {
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
      dataField: 'id', text: 'Id', sort: true, classes: 'tb-grupo-id', headerClasses: 'tb-col-1 bg-dark text-white tb-grupo-id',
    },
    {
      dataField: 'tipo', text: 'Tipo', sort: true, classes: 'tb-grupo-tipo', headerClasses: 'tb-col-3 bg-dark text-white tb-grupo-tipo',
    },
    {
      dataField: 'descricao', text: 'Descrição', sort: true, classes: 'tb-grupo-descricao', headerClasses: 'tb-col-6 bg-dark text-white tb-grupo-descricao',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: 'tb-grupo-buttons', headerClasses: 'tb-col-2 bg-dark text-white tb-grupo-buttons',
    },
  ];

  const ActionButtons = [
    <Buttons
      linkTo="/financeiro/grupo/ficha"
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
    <Buttons
      onClick={() => toggleFiltro(props, 'tabela-grupo-filtro')}
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
          onClick={() => getGrupoExcel(props)}
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
      resetFieldsGrupoFicha(props);
      handleSidebar(props.dispatch, props.sidebar);
      getPagina(props,
        '/TsmGRUPO/PAGINA/',
        '@GET_GRUPO_PAGINA',
        JSON.parse(localStorage.getItem('TABELAS_GRUPO_FILTRO')),
        '@SET_GRUPO_FILTRO_FLAG_FALSE');
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
          <TableButton action="Editar" click={() => editGrupo(props, item.id)} permission={props} />,
          <TableButton action="Consultar" click={() => consultaGrupo(props, item.id)} permission={props} />,
        );
      }

      arrayTemp.push({
        id: item.id,
        tipo: item.dtipo,
        descricao: item.descricao,
        buttons: Buttons,

      });
    });

    setTableData(arrayTemp);
  }, [props, props.tableData]);

  useEffect(() => {
    if (props.filtroFlag) {
      getPagina(props,
        '/TsmGRUPO/PAGINA/',
        '@GET_GRUPO_PAGINA',
        JSON.parse(localStorage.getItem('TABELAS_GRUPO_FILTRO')),
        '@SET_GRUPO_FILTRO_FLAG_FALSE');
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
        sim={() => deleteRegistro(props, '/TsmGRUPO/EXCLUI/', '@SET_GRUPO_FILTRO_FLAG_TRUE')}
      />
      <Container fluid className="p-0">
        <PageTitle title="Grupo" buttons={ActionButtons} voltar={false} />
        <GrupoFiltro />
        <Card>
          {/****** header ***************/}
          {/*****************************/}
          <CardHeader className="pt-2 pb-2">
            { Reports }
            {/*<Pesquisar id="grupo-pesquisa" pesquisar={ () => functions.pesquisaGrupo(props) } /> */}
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
                  props.dispatch({ type: '@SET_INDEX_PAGINATION_GRUPO', payload: page });
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
  indexPagination: state.grupo.indexPagination,

  filtroColor: state.grupo.filtroColor,
  filtroAtivo: state.grupo.filtroAtivo,
  tableData: state.grupo.tableData,

  filtroFlag: state.grupo.filtroFlag,

  isLoading: state.loading.isLoading,

  visibilityPageFinanceiro: state.usuario.visibilityPageFinanceiro,

  auth: state.sistema.auth,
  filtroVisibility: state.sistema.filtroVisibility,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(GrupoPagina);
