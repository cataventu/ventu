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
  editSubGrupo, consultaSubGrupo, getSubGrupoExcel, resetFieldsSubGrupoFicha,
} from '../../../functions/financeiro/subgrupo';
import {
  showModal, hideModal, toggleFiltro, handleSidebar, getPagina, deleteRegistro, autoClickPagination,
} from '../../../functions/sistema';
import SubGrupoFiltro from './filtro';

function SubGrupoPagina(props) {
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
      dataField: 'id', text: 'Id', sort: true, classes: 'tb-subgrupo-id', headerClasses: 'tb-col-1 bg-dark text-white tb-subgrupo-id',
    },
    {
      dataField: 'grupo', text: 'Grupo', sort: true, classes: 'tb-subgrupo-grupo', headerClasses: 'tb-col-4 bg-dark text-white tb-subgrupo-grupo',
    },
    {
      dataField: 'descricao', text: 'Descrição', sort: true, classes: 'tb-subgrupo-descricao', headerClasses: 'tb-col-5 bg-dark text-white tb-subgrupo-descricao',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: 'tb-subgrupo-buttons', headerClasses: 'tb-col-2 bg-dark text-white tb-subgrupo-buttons',
    },
  ];

  const ActionButtons = [
    <Buttons
      linkTo="/financeiro/subgrupo/ficha"
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
    <Buttons
      onClick={() => toggleFiltro(props, 'tabela-subgrupo-filtro')}
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
          onClick={() => getSubGrupoExcel(props)}
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
      resetFieldsSubGrupoFicha(props);
      handleSidebar(props.dispatch, props.sidebar);
      getPagina(props,
        '/TsmSUBGRUPO/PAGINA/',
        '@GET_SUBGRUPO_PAGINA',
        JSON.parse(localStorage.getItem('TABELAS_SUBGRUPO_FILTRO')),
        '@SET_SUBGRUPO_FILTRO_FLAG_FALSE');
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
          <TableButton action="Editar" click={() => editSubGrupo(props, item.id)} permission={props} />,
          <TableButton action="Consultar" click={() => consultaSubGrupo(props, item.id)} permission={props} />,
        );
      }

      arrayTemp.push({
        id: item.id,
        grupo: item.grupo,
        descricao: item.descricao,
        buttons: Buttons,

      });
    });

    setTableData(arrayTemp);
  }, [props, props.tableData]);

  useEffect(() => {
    if (props.filtroFlag) {
      getPagina(props,
        '/TsmSUBGRUPO/PAGINA/',
        '@GET_SUBGRUPO_PAGINA',
        JSON.parse(localStorage.getItem('TABELAS_SUBGRUPO_FILTRO')),
        '@SET_SUBGRUPO_FILTRO_FLAG_FALSE');
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
        sim={() => deleteRegistro(props, '/TsmSUBGRUPO/EXCLUI/', '@SET_SUBGRUPO_FILTRO_FLAG_TRUE')}
      />
      <Container fluid className="p-0">
        <PageTitle title="SubGrupo" buttons={ActionButtons} voltar={false} />
        <SubGrupoFiltro />
        <Card>
          {/****** header ***************/}
          {/*****************************/}
          <CardHeader className="pt-2 pb-2">
            { Reports }
            {/*<Pesquisar id="subgrupo-pesquisa" pesquisar={ () => functions.pesquisaSubGrupo(props) } /> */}
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
                  props.dispatch({ type: '@SET_INDEX_PAGINATION_SUBGRUPO', payload: page });
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
  indexPagination: state.subgrupo.indexPagination,
  filtroColor: state.subgrupo.filtroColor,
  filtroAtivo: state.subgrupo.filtroAtivo,
  tableData: state.subgrupo.tableData,

  filtroFlag: state.subgrupo.filtroFlag,

  isLoading: state.loading.isLoading,

  visibilityPageFinanceiro: state.usuario.visibilityPageFinanceiro,

  auth: state.sistema.auth,
  filtroVisibility: state.sistema.filtroVisibility,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(SubGrupoPagina);
