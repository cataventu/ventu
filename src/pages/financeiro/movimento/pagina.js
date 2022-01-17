///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card, CardBody, CardHeader, Container, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import { MoreHorizontal, MinusCircle, PlusCircle } from 'react-feather';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faFile, faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  DropdownRelatorio, TableTotal, TableButton, Modal, PageTitle, Buttons,
} from '../../../components';
import {
  editMovimento, consultaMovimento, getMovimentoExcel, agruparMovimento, resetFieldsMovimentoFicha, parcelarMovimento, duplicarMovimento,
} from '../../../functions/financeiro/movimento';
import {
  showModal, hideModal, toggleFiltro, handleSidebar, getPagina, deleteRegistro, formatExibeValor, getDados, autoClickPagination,
} from '../../../functions/sistema';
import MovimentoFiltro from './filtro';
import { goToAnexoFicha } from '../../../functions/anexo';

function MovimentoPagina(props) {
  const [tableData, setTableData] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [valor_pagar, setValor_pagar] = useState(0);
  const [valor_receber, setValor_receber] = useState(0);
  const [nonExpandable, setNonExpandable] = useState('');

  //PAGINATION INDEX
  const { indexPagination } = props;
  const [startPagination] = useState(indexPagination);
  const [retryPagination, setRetryPagination] = useState(true);
  const paginationList = document.getElementsByClassName('page-link');
  /////////

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, classes: 'td-movimento-id', headerClasses: 'td-movimento-id bg-dark text-white',
    },
    {
      dataField: 'nome_pessoa', text: 'Contato', sort: true, classes: 'td-movimento-contato', headerClasses: 'td-movimento-contato bg-dark text-white',
    },
    {
      dataField: 'descricao', text: 'Descrição', sort: true, classes: 'td-movimento-contato', headerClasses: 'td-movimento-contato bg-dark text-white',
    },
    {
      dataField: 'documento', text: 'Documento', sort: true, classes: 'td-movimento-documento', headerClasses: 'td-movimento-documento bg-dark text-white',
    },
    {
      dataField: 'dt_vencimento', text: 'Vencimento', sort: true, classes: 'td-movimento-vencimento', headerClasses: 'td-movimento-vencimento bg-dark text-white text-right',
    },
    {
      dataField: 'valor', text: 'Valor', sort: true, classes: 'td-movimento-valor', headerClasses: 'td-movimento-valor bg-dark text-white text-right',
    },
    {
      dataField: 'status', text: 'Status', sort: true, classes: 'td-movimento-status', headerClasses: 'td-movimento-status bg-dark text-white text-right',
    },
    {
      dataField: 'parcelado', text: 'PAR', sort: true, classes: 'td-movimento-parcelado', headerClasses: 'td-movimento-parcelado bg-dark text-white',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: 'td-movimento-botoes', headerClasses: 'td-movimento-botoes bg-dark text-white ',
    },
  ];

  const dashboardMOV = '/financeiro/movimento/dashboard';

  const ActionButtons = [
    <Buttons
      linkTo={dashboardMOV}
      description="Dashboard"
      color="secundary"
      title="Dashboard"
      permission={props}
    />,

    <Buttons
      linkTo="/financeiro/movimento/ficha"
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
    <Buttons
      onClick={() => toggleFiltro(props, 'tabela-movimento-filtro')}
      description="Filtrar"
      color={props.filtroColor[props.filtroAtivo]}
      title="Filtro de informações."
      permission={props}
    />,
    <Buttons
      linkTo="/financeiro/movimento/transferir"
      description="Transferir"
      color="blue"
      title="Filtro de informações."
      permission={props}
    />,
  ];

  const Reports = [
    <UncontrolledDropdown className="float-right mt-1">
      <DropdownToggle tag="a">
        <MoreHorizontal />
      </DropdownToggle>
      <DropdownMenu right className="dropdown-reports-movimento">
        <DropdownRelatorio
          onClick={() => getMovimentoExcel(props)}
          icon={faFileExcel}
          titulo="Exportar Excel"
          permission={props}
          action="Excel"
        />
        <DropdownItem divider />
        {/*</DropdownMenu> */}
        <DropdownRelatorio
          onClick={() => props.history.push('/financeiro/movimento/relatorios/fluxo-caixa')}
          icon={faFile}
          titulo="Relatório Fluxo Caixa"
          permission={props}
          action="Relatório Fluxo Caixa"
        />

        <DropdownRelatorio
          onClick={() => props.history.push('/financeiro/movimento/relatorios/dre')}
          icon={faFile}
          titulo="Relatório DRE"
          permission={props}
          action="Relatório DRE"
        />

        <DropdownRelatorio
          onClick={() => props.history.push('/financeiro/movimento/relatorios/transacao')}
          icon={faFile}
          titulo="Relatório Transação"
          permission={props}
          action="Relatório Transação"
        />

        <DropdownRelatorio
          onClick={() => props.history.push('/financeiro/movimento/relatorios/contato')}
          icon={faFile}
          titulo="Relatório Contato"
          permission={props}
          action="Relatório Contato"
        />

        <DropdownRelatorio
          onClick={() => props.history.push('/financeiro/movimento/relatorios/fechamento-mensal')}
          icon={faFile}
          titulo="Relatório Fechamento Mensal"
          permission={props}
          action="Relatório Fechamento Mensal"
        />

        <DropdownRelatorio
          onClick={() => props.history.push('/financeiro/movimento/relatorios/fechamento-anual')}
          icon={faFile}
          titulo="Relatório Fechamento Anual"
          permission={props}
          action="Relatório Fechamento Anual"
        />

      </DropdownMenu>

    </UncontrolledDropdown>,
  ];

  const expandRow = {
    renderer: (row) => (handleAgrupados(row)),
    showExpandColumn: true,
    nonExpandable,
    onlyOneExpanding: true,
    expandHeaderColumnRenderer: () => null,
    expandColumnRenderer: ({ expanded, expandable }) => (expandable ? (
      expanded ? (
        <MinusCircle width={14} height={14} />
      ) : (
        <PlusCircle width={14} height={14} />
      )
    ) : (
      null
    )),
  };

  const rowClasses = (row) => {
    let rowClass;
    row.transacao === 1 ? rowClass = 'text-danger' : rowClass = 'text-blue';
    return rowClass;
  };

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      resetFieldsMovimentoFicha(props);
      handleSidebar(props.dispatch, props.sidebar);
      localStorage.removeItem('RELATORIO_FLUXOCAIXA_FILTRO');
      const { dispatch } = props;

      dispatch({ type: '@RESET_CONTATO_DATA' });
      dispatch({ type: '@RESET_DRE_DATA' });
      dispatch({ type: '@RESET_FLUXOCAIXA_DATA' });
      dispatch({ type: '@RESET_TRANSACAO_DATA' });
      dispatch({ type: '@RESET_MOVIMENTO_AGRUPAR' });
      getDados(props, '/TsmPARAMETRO/MOVIMENTO_FICHA', '@GET_PARAM_MOVIMENTO_FICHA');

      getPagina(props,
        '/TsmMOVIMENTO/PAGINA/',
        '@GET_MOVIMENTO_PAGINA',
        JSON.parse(localStorage.getItem('TABELAS_MOVIMENTO_FILTRO')),
        '@SET_MOVIMENTO_FILTRO_FLAG_FALSE');
    }
    setFirstLoad(false);
  }, [props, firstLoad]);

  ////// TABLEDATA
  useEffect(() => {
    const tableData = [];
    const valor_pagar = [];
    const valor_receber = [];
    const nonExpandable = [];
    let userAdmin = false;

    ////// PERMISSAO ADMIN
    props.visibilityPageFinanceiro.forEach((modulo) => {
      const { nome, funcoes } = modulo;
      if (nome === 'MOVIMENTO') {
        funcoes.forEach((permissao) => {
          const { descricao, acesso } = permissao;
          if (descricao === 'ADMIN') {
            userAdmin = acesso;
          }
        });
      }
    });

    ////// ATUALIZA TABLE DATA
    props.tableData.forEach((movimento) => {
      const {
        id, admin, restrito, status, pai, id_parcelamento, descricao, nome_pessoa, documento,
        dt_vencimento, valor_pago, dstatus, filho_regs, transacao,
      } = movimento;

      ////// IMPEDE VISUALIZAÇÃO DA LINHA CASO ADMIN FALSE
      if (admin && !userAdmin) { return; }
      if (restrito && !userAdmin) { return; }

      /// ACESSO AOS DADOS
      if (parseInt(id, 10) > 0 && id !== '') {
        const Buttons = [];
        const IconParcelamento = [];

        const Duplicar = <TableButton action="Duplicar" click={() => duplicarMovimento(props, id)} permission={props} />;
        const Consulta = <TableButton action="Consultar" click={() => consultaMovimento(props, id)} permission={props} />;
        let Editar = <TableButton action="Editar" click={() => editMovimento(props, id)} permission={props} />;
        const Anexo = <TableButton action="Anexar" click={() => goToAnexoFicha(props, id)} permission={props} />;
        let Agrupar = <TableButton action="Agrupar" click={() => agruparMovimento(props, id)} permission={props} />;
        let Parcelar = <TableButton action="Parcelar" click={() => parcelarMovimento(props, id)} permission={props} />;
        let Deletar = <TableButton action="Excluir" click={() => showModal(props, id)} permission={props} />;

        ////// HABILITA BTS  EM CONFIRMADO / CONCILIADO
        if (parseInt(status, 10) === 1) {
          Parcelar = <TableButton action="Parcelar" permission={props} disable />;
          Agrupar = <TableButton action="Agrupar" permission={props} disable />;
        }

        ////// AGRUPADO OU PARCELADO
        if (pai) {
          Editar = <TableButton action="Editar" permission={props} disable />;
          Deletar = <TableButton action="Excluir" permission={props} disable />;
        }

        ////// DESABILITA BOTOES EM PARCELADO
        if (parseInt(status, 10) === 4) {
          Parcelar = <TableButton action="Parcelar" permission={props} disable />;
          Agrupar = <TableButton action="Agrupar" permission={props} disable />;
          Deletar = <TableButton action="Excluir" permission={props} disable />;
        }

        ///// ATUALIZA LISTA BOTOES NA TABELA
        Buttons.push(
          Deletar,
          Parcelar,
          Agrupar,
          Anexo,
          Duplicar,
          Editar,
          Consulta,
        );

        if (id_parcelamento || parseInt(status, 10) === 4) {
          IconParcelamento.push(<FontAwesomeIcon icon={faCheck} className="p-0 m-0 cursor ml-3 mt-1" />);
        }

        ///// ATUALIZA LINHA TABELA
        tableData.push(
          {
            id,
            nome_pessoa,
            descricao,
            documento,
            transacao,

            dt_vencimento,
            valor: formatExibeValor(valor_pago),
            status: dstatus,

            agrupamento_regs: filho_regs,
            parcelado: IconParcelamento,
            buttons: Buttons,
          },
        );
        if (!pai || parseInt(filho_regs.length, 10) === 0) { nonExpandable.push(id); }
      }

      /// MENSAGEM DE ERRO NO FILTRO
      if (parseInt(id, 10) === 0 && descricao !== '') {
        tableData.push({ id: '', nome_pessoa: descricao });
        nonExpandable.push('');
      }

      /// VALORES TOTAIS
      if (nome_pessoa === 'PAGAR') {
        valor_pagar.push(valor_pago);
      }

      /// VALORES TOTAIS
      if (nome_pessoa === 'RECEBER') {
        valor_receber.push(valor_pago);
      }
    });

    setTableData(tableData);
    setValor_pagar(valor_pagar);
    setValor_receber(valor_receber);
    setNonExpandable(nonExpandable);
  }, [props, props.tableData]);

  ////// MONITORA FILTRO
  useEffect(() => {
    if (props.filtroFlag) {
      getPagina(props,
        '/TsmMOVIMENTO/PAGINA/',
        '@GET_MOVIMENTO_PAGINA',
        JSON.parse(localStorage.getItem('TABELAS_MOVIMENTO_FILTRO')),
        '@SET_MOVIMENTO_FILTRO_FLAG_FALSE');
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

  const handleAgrupados = useCallback((row) => {
    const agrupamento = row.agrupamento_regs;
    const linhas = [];
    const table = [];
    agrupamento.forEach((linha) => {
      linhas.push(
        <tr>
          <td className="td-childrens td-movimento-acao">&nbsp;</td>
          <td className="td-childrens td-movimento-id">{ linha.id }</td>
          <td className="td-childrens td-movimento-contato">{ linha.nome_pessoa }</td>
          <td className="td-childrens td-movimento-contato">{ linha.descricao }</td>
          <td className="td-childrens td-movimento-documento">{ linha.documento }</td>
          <td className="td-childrens td-movimento-vencimento text-rigth">{ linha.dt_vencimento }</td>
          <td className="td-childrens td-movimento-valor">{ formatExibeValor(linha.valor_pago) }</td>
          <td className="td-childrens td-movimento-status">&nbsp;</td>
          <td className="td-childrens td-movimento-parcelado">&nbsp;</td>
          <td className="td-childrens td-movimento-botoes">&nbsp;</td>
        </tr>,
      );
    });

    table.push(
      <div className="div-childrens">
        <table className="table-childrens">
          { linhas }
        </table>
      </div>,
    );

    return table;
  }, []);

  return (
    <>
      <Modal
        open={props.modalVisibility}
        descricao="Confirma a exclusão do registro?"
        nao={() => hideModal(props)}
        sim={() => deleteRegistro(props, '/TsmMOVIMENTO/EXCLUI/', '@SET_MOVIMENTO_FILTRO_FLAG_TRUE')}
      />
      <Container fluid className="p-0">
        <PageTitle title="Movimento" buttons={ActionButtons} voltar={false} />
        <MovimentoFiltro />
        <Card>
          {/****** header ***************/}
          {/*****************************/}
          <CardHeader className="pt-2 pb-2">
            { Reports }
            {/*<Pesquisar id="movimento-pesquisa" pesquisar={ () => functions.pesquisaMovimento(props) } />*/}
          </CardHeader>
          {/****** body *****************/}
          {/*****************************/}
          <CardBody className="pt-0 pb-1">
            <BootstrapTable
              keyField="id"
              data={tableData}
              classes="table-striped table-movimento"
              columns={tableColumns}
              expandRow={expandRow}
              bootstrap4
              bordered={false}
              rowClasses={rowClasses}
              pagination={paginationFactory({
                alwaysShowAllBtns: true,
                sizePerPage: 10,
                sizePerPageList: [5, 10, 25, 50, 100],
                onPageChange: (page) => {
                  props.dispatch({ type: '@SET_INDEX_PAGINATION_MOVIMENTO', payload: page });
                },
              })}
            />

            <TableTotal pagar={formatExibeValor(valor_pagar)} receber={formatExibeValor(valor_receber)} />

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

  filtroColor: state.movimento.filtroColor,
  filtroAtivo: state.movimento.filtroAtivo,
  tableData: state.movimento.tableData,

  filtroFlag: state.movimento.filtroFlag,
  indexPagination: state.movimento.indexPagination,

  isLoading: state.loading.isLoading,

  visibilityPageFinanceiro: state.usuario.visibilityPageFinanceiro,

  user: state.usuario.fichaData,
  auth: state.sistema.auth,

  filtroVisibility: state.sistema.filtroVisibility,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(MovimentoPagina);
