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
  PageTitle, Buttons, Modal, TableButton, DropdownRelatorio,
} from '../../../components';
import {
  editPFisica, consultaPFisica, getPFisicaExcel, resetFieldsPFisicaPessoalFichaData,
} from '../../../functions/cadastro/pessoa-fisica';
import { goToAnexoFicha } from '../../../functions/anexo';
import {
  handleSidebar, showModal, hideModal, toggleFiltro, getPagina, deleteRegistro, autoClickPagination,
} from '../../../functions/sistema';

import PessoaFisicaFiltro from './filtro';

function PessoaFisicaPagina(props) {
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
      dataField: 'id', text: 'Id', classes: 'tb-pessoa-fisica-id', headerClasses: 'bg-dark text-white tb-pessoa-fisica-id',
    },
    {
      dataField: 'nome_completo', text: 'Nome Completo', classes: 'tb-pessoa-fisica-nome_completo', headerClasses: 'bg-dark text-white tb-pessoa-fisica-nome_completo',
    },
    {
      dataField: 'nome_reserva', text: 'Nome para reserva', classes: 'tb-pessoa-fisica-nome_reserva', headerClasses: 'bg-dark text-white tb-pessoa-fisica-nome_reserva',
    },
    {
      dataField: 'buttons', text: '', classes: 'tb-pessoa-fisica-buttons', headerClasses: 'bg-dark text-white tb-pessoa-fisica-buttons',
    },
  ];

  const cadastroPath = '/cadastro/pessoa-fisica/ficha/0/dados-pessoais';
  const dashboardPF = '/cadastro/pessoa-fisica/dashboard';

  const ActionButtons = [
    <Buttons
      linkTo={dashboardPF}
      description="Dashboard"
      color="secundary"
      title="Dashboard"
      permission={props}
    />,
    <Buttons
      linkTo={cadastroPath}
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
    <Buttons
      onClick={() => toggleFiltro(props, 'tabela-pfisica-filtro')}
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
          onClick={() => getPFisicaExcel(props)}
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
      resetFieldsPFisicaPessoalFichaData(props);
      handleSidebar(props.dispatch, props.sidebar);
      /*
      // getPagina(props,
      //   '/TsmPFISICA/PAGINA/',
      //   '@GET_PFISICA_PAGINA',
      //   JSON.parse(localStorage.getItem('TABELAS_PFISICA_FILTRO')),
      //   '@SET_PFISICA_FILTRO_FLAG_FALSE');
      */
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
          <TableButton action="Anexar" click={() => goToAnexoFicha(props, item.id)} permission={props} />,
          <TableButton action="Editar" click={() => editPFisica(props, item.id, item.fornecedor)} permission={props} />,
          <TableButton action="Consultar" click={() => consultaPFisica(props, item.id)} permission={props} />,
        );
      }

      arrayTemp.push({
        id: item.id,
        nome_completo: item.nome_completo,
        nome_reserva: item.nome_reserva,
        buttons: Buttons,
      });
    });

    setTableData(arrayTemp);
  }, [props, props.tableData]);

  useEffect(() => {
    if (props.filtroFlag) {
      getPagina(props,
        '/TsmPFISICA/PAGINA/',
        '@GET_PFISICA_PAGINA',
        JSON.parse(localStorage.getItem('TABELAS_PFISICA_FILTRO')),
        '@SET_PFISICA_FILTRO_FLAG_FALSE');
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

  /////////// RENDER TABLE //////////
  /////////////////////////////////
  return (
    <>
      <Modal
        open={props.modalVisibility}
        descricao="Confirma a exclusão do registro?"
        nao={() => hideModal(props)}
        sim={() => deleteRegistro(props, '/TsmPFISICA/EXCLUI/', '@SET_PFISICA_FILTRO_FLAG_TRUE')}
      />
      <Container fluid className="p-0">
        <PageTitle title="Pessoa Física" buttons={ActionButtons} voltar={false} />
        <PessoaFisicaFiltro />
        <Card>
          {/****** header ***************/}
          {/*****************************/}
          <CardHeader className="pt-2 pb-2">
            { Reports }
            {/*<Pesquisar id="pfisica-pesquisa" pesquisar={ () => functions.pesquisaPFisica(props) } /> */}
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
              //rowEvents={ rowEvents }
              bordered={false}
              pagination={paginationFactory({
                alwaysShowAllBtns: true,
                sizePerPage: 10,
                sizePerPageList: [5, 10, 25, 50, 100],
                onPageChange: (page) => {
                  props.dispatch({ type: '@SET_INDEX_PAGINATION_PFISICA', payload: page });
                },
              })}
            />
>
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

  indexPagination: state.pFisica.indexPagination,
  filtroColor: state.pFisica.filtroColor,
  filtroAtivo: state.pFisica.filtroAtivo,
  tableData: state.pFisica.tableData,
  filtroFlag: state.pFisica.filtroFlag,

  isLoading: state.loading.isLoading,

  visibilityPageCadastro: state.usuario.visibilityPageCadastro,

  auth: state.sistema.auth,
  filtroVisibility: state.sistema.filtroVisibility,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(PessoaFisicaPagina);
