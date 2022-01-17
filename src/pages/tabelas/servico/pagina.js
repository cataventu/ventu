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
  editServico, consultaServico, getServicoExcel, resetFieldsServicoFicha,
} from '../../../functions/tabelas/servico';
import {
  showModal, hideModal, toggleFiltro, handleSidebar, getPagina, deleteRegistro, autoClickPagination,
} from '../../../functions/sistema';

import ServicoFiltro from './filtro';

function ServicoPagina(props) {
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
      dataField: 'id', text: 'Id', sort: true, classes: '', headerClasses: 'bg-dark text-white tb-servico-id',
    },
    {
      dataField: 'dtipo', text: 'Tipo Serviço', sort: true, classes: '', headerClasses: 'bg-dark text-white tb-servico-tipo',
    },
    {
      dataField: 'descricao', text: 'Descrição', sort: true, classes: '', headerClasses: 'bg-dark text-white tb-servico-descricao',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: '', headerClasses: 'bg-dark text-white tb-servico-buttons',
    },
  ];

  const ActionButtons = [
    <Buttons
      linkTo="/tabelas/servico/ficha"
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
    <Buttons
      onClick={() => toggleFiltro(props, 'tabela-servico-filtro')}
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
          onClick={() => getServicoExcel(props)}
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
      resetFieldsServicoFicha(props);
      handleSidebar(props.dispatch, props.sidebar);
      getPagina(props,
        '/TsmSERVICO/PAGINA/',
        '@GET_SERVICO_PAGINA',
        JSON.parse(localStorage.getItem('TABELAS_SERVICO_FILTRO')),
        '@SET_SERVICO_FILTRO_FLAG_FALSE');
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
          <TableButton action="Editar" click={() => editServico(props, item.id)} permission={props} />,
          <TableButton action="Consultar" click={() => consultaServico(props, item.id)} permission={props} />,
        );
      }

      arrayTemp.push({
        id: item.id,
        dtipo: item.dtipo,
        descricao: item.descricao,
        buttons: Buttons,
      });
    });

    setTableData(arrayTemp);
  }, [props, props.tableData]);

  useEffect(() => {
    if (props.filtroFlag) {
      getPagina(props,
        '/TsmSERVICO/PAGINA/',
        '@GET_SERVICO_PAGINA',
        JSON.parse(localStorage.getItem('TABELAS_SERVICO_FILTRO')),
        '@SET_SERVICO_FILTRO_FLAG_FALSE');
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
        sim={() => deleteRegistro(props, '/TsmSERVICO/EXCLUI/', '@SET_SERVICO_FILTRO_FLAG_TRUE')}
      />
      <Container fluid className="p-0">
        <PageTitle title="Serviço" buttons={ActionButtons} voltar={false} />
        <ServicoFiltro />
        <Card>
          {/****** header ***************/}
          {/*****************************/}
          <CardHeader className="pt-2 pb-2">
            { Reports }
            {/*<Pesquisar id="servico-pesquisa" pesquisar={ () => pesquisaServico(props) } /> */}
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
                  props.dispatch({ type: '@SET_INDEX_PAGINATION_SERVICO', payload: page });
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

  tableData: state.servico.tableData,
  indexPagination: state.servico.indexPagination,
  filtroColor: state.servico.filtroColor,
  filtroAtivo: state.servico.filtroAtivo,
  filtroFlag: state.servico.filtroFlag,

  isLoading: state.loading.isLoading,

  visibilityPageTabelas: state.usuario.visibilityPageTabelas,

  auth: state.sistema.auth,

  filtroVisibility: state.sistema.filtroVisibility,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(ServicoPagina);
