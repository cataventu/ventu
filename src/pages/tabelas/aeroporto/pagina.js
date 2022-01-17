///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card, CardBody, CardHeader, Container, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import { MoreHorizontal } from 'react-feather';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import {
  DropdownRelatorio, TableButton, Modal, Buttons, PageTitle,
} from '../../../components';
import { editAeroporto, consultaAeroporto, getAeroportoExcel } from '../../../functions/tabelas/aeroporto';
import {
  showModal, hideModal, toggleFiltro, handleSidebar, getPagina, deleteRegistro, autoClickPagination,
} from '../../../functions/sistema';
import AeroportoFiltro from './filtro';

function AeroportoPagina(props) {
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
      dataField: 'id', text: 'Id', sort: true, classes: 'tb-aeroporto-id', headerClasses: 'bg-dark text-white tb-aeroporto-id',
    },
    {
      dataField: 'codigo', text: 'Código', sort: true, classes: 'tb-aeroporto-codigo', headerClasses: 'bg-dark text-white tb-aeroporto-codigo',
    },
    {
      dataField: 'nome', text: 'Nome', sort: true, classes: 'tb-aeroporto-nome', headerClasses: 'bg-dark text-white tb-aeroporto-nome',
    },
    {
      dataField: 'municipio', text: 'Município', sort: true, classes: 'tb-aeroporto-municipio', headerClasses: 'bg-dark text-white tb-aeroporto-municipio',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: 'tb-aeroporto-buttons', headerClasses: 'bg-dark text-white tb-aeroporto-buttons',
    },
  ];

  const ActionButtons = [
    <Buttons
      linkTo="/tabelas/aeroporto/ficha"
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
    <Buttons
      onClick={() => toggleFiltro(props, 'tabela-aeroporto-filtro')}
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
          onClick={() => getAeroportoExcel(props)}
          icon={faFileExcel}
          titulo="Exportar Excel"
          permission={props}
          action="Excel"
        />
      </DropdownMenu>
    </UncontrolledDropdown>,
  ];

  const handleTabela = useCallback(() => {
    async function getTabela() {
      /// ATO 1 - RECEBER DADOS
      const response = await getPagina(props, '/TsmAEROPORTO/PAGINA/',
        '@GET_AEROPORTO_PAGINA',
        JSON.parse(localStorage.getItem('TABELAS_AEROPORTO_FILTRO')),
        '@SET_AEROPORTO_FILTRO_FLAG_FALSE');

      /// ATO 2 - LEITURA E ATUALIZAÇÃO DO STATE INTERNO
      const temp = [];
      response.forEach((item) => {
        const Buttons = [];
        if (item.id !== 0 && item.id !== '') {
          Buttons.push(
            <TableButton action="Excluir" click={() => showModal(props, item.id)} permission={props} />,
            <TableButton action="Editar" click={() => editAeroporto(props, item.id)} permission={props} />,
            <TableButton action="Consultar" click={() => consultaAeroporto(props, item.id)} permission={props} />,
          );
        }

        temp.push({
          id: item.id,
          codigo: item.codigo,
          nome: item.nome,
          municipio: item.municipio,
          buttons: Buttons,
        });
      });
      setTableData(temp);
    }
    getTabela();
  }, [props]);

  /// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      handleSidebar(props.dispatch, props.sidebar);
      handleTabela();
    }
  }, [props, firstLoad, handleTabela]);

  /// MONITORA FILTRO
  useEffect(() => {
    if (props.filtroFlag) { handleTabela(); }
  }, [props.filtroFlag, handleTabela]);

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
        sim={() => deleteRegistro(props, '/TsmAEROPORTO/EXCLUI/', '@SET_AEROPORTO_FILTRO_FLAG_TRUE')}
      />
      <Container fluid className="p-0">
        <PageTitle title="Aeroporto" buttons={ActionButtons} voltar={false} />
        <AeroportoFiltro />
        <Card>
          {/****** header ***************/}
          {/*****************************/}
          <CardHeader className="pt-2 pb-2">
            { Reports }
            {/*<Pesquisar id="aeroporto-pesquisa" pesquisar={ () => functions.pesquisaAeroporto(props) } /> */}
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
                  props.dispatch({ type: '@SET_INDEX_PAGINATION_AEROPORTO', payload: page });
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
  indexPagination: state.aeroporto.indexPagination,
  filtroColor: state.aeroporto.filtroColor,
  filtroAtivo: state.aeroporto.filtroAtivo,
  filtroFlag: state.aeroporto.filtroFlag,

  isLoading: state.loading.isLoading,

  visibilityPageTabelas: state.usuario.visibilityPageTabelas,

  auth: state.sistema.auth,
  filtroVisibility: state.sistema.filtroVisibility,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(AeroportoPagina);
