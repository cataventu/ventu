///////// IMPORTS ///////////////
/////////////////////////////////
import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Container, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import { MoreHorizontal } from 'react-feather';
import { connect } from 'react-redux';
import { faCheck, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {
  Buttons, PageTitle, Modal, DropdownRelatorio, TableTotal, TableButton,
} from '../../../components';
import {
  editFixo, consultaFixo, getFixoExcel, gerarFixo, resetFieldsFixoFicha,
} from '../../../functions/financeiro/fixo';
import {
  showModal, formatMesLabel, showModalFixo, hideModal, hideModalFixo, toggleFiltro, handleSidebar, getDados, getPagina, deleteRegistro, formatExibeValor,
} from '../../../functions/sistema';
import FixoFiltro from './filtro';

///////// TABELA FIXO //////////
/////////////////////////////////
class FixoPagina extends Component {
  async componentDidMount() {
    resetFieldsFixoFicha(this.props);
    handleSidebar(this.props.dispatch, this.props.sidebar);
    await getDados(this.props, '/TsmPARAMETRO/FIXO_FICHA', '@GET_PARAM_FIXO_FICHA');
    await getPagina(this.props,
      '/TsmFIXO/PAGINA/',
      '@GET_FIXO_PAGINA',
      JSON.parse(localStorage.getItem('TABELAS_FIXO_FILTRO')),
      '@SET_FIXO_FILTRO_FLAG_FALSE');
  }

  async componentDidUpdate() {
    if (this.props.filtroFlag) {
      await getPagina(this.props,
        '/TsmFIXO/PAGINA/',
        '@GET_FIXO_PAGINA',
        JSON.parse(localStorage.getItem('TABELAS_FIXO_FILTRO')),
        '@SET_FIXO_FILTRO_FLAG_FALSE');
    }
  }

  render() {
    ///////// ACTION BUTTONS ////////
    /////////////////////////////////
    const cadastroPath = '/financeiro/fixo/ficha';
    const ActionButtons = [
      <Buttons
        linkTo={cadastroPath}
        description="Incluir"
        color="primary"
        title="Cadastrar novo registro."
        permission={this.props}
      />,
      <Buttons
        onClick={() => toggleFiltro(this.props, 'tabela-fixo-filtro')}
        description="Filtrar"
        color={this.props.filtroColor[this.props.filtroAtivo]}
        title="Filtro de informações."
        permission={this.props}
      />,
      <Buttons
        onClick={() => showModalFixo(this.props)}
        description="Gerar fixos"
        color="primary"
        title="Gerar movimentos financeiros."
        permission={this.props}
      />,
    ];

    ///////// TABLE COLUMNS /////////
    /////////////////////////////////
    const tableColumns = [
      {
        dataField: 'id', text: 'Id', sort: true, classes: 'td-fixo-id text-left', headerClasses: 'bg-dark text-white td-fixo-id',
      },
      {
        dataField: 'restrito', text: 'Restrito', sort: true, classes: 'td-fixo-restrito text-center', headerClasses: 'bg-dark text-white td-fixo-restrito text-center',
      },
      {
        dataField: 'dia_vencimento', text: 'Dia', sort: true, classes: 'td-fixo-dia text-center', headerClasses: 'bg-dark text-white td-fixo-dia text-center',
      },
      {
        dataField: 'nome_pessoa', text: 'Contato', sort: true, classes: 'td-fixo-contato text-left', headerClasses: 'bg-dark text-white td-fixo-contato',
      },
      {
        dataField: 'descricao', text: 'Descrição', sort: true, classes: 'td-fixo-descricao text-left', headerClasses: 'bg-dark text-white td-fixo-descricao',
      },
      {
        dataField: 'valor', text: 'Valor', sort: true, classes: 'td-fixo-valor text-right', headerClasses: 'bg-dark text-white td-fixo-valor text-right',
      },
      {
        dataField: 'buttons', text: '', sort: false, classes: 'td-fixo-buttons text-left', headerClasses: 'bg-dark text-white td-fixo-buttons',
      },
    ];

    ///////// TABLE DATA ////////////
    /////////////////////////////////

    const tableData = [];
    const valor_pagar = [];
    const valor_receber = [];

    this.props.tableData.forEach((item) => {
      const Buttons = [];
      const Restrito = [];

      /// ACESSO AOS DADOS
      if (parseInt(item.id, 10) > 0 && item.id !== '') {
        Buttons.push(
          <TableButton action="Excluir" click={() => showModal(this.props, item.id)} permission={this.props} />,
          <TableButton action="Editar" click={() => editFixo(this.props, item.id)} permission={this.props} />,
          <TableButton action="Consultar" click={() => consultaFixo(this.props, item.id)} permission={this.props} />,
        );

        if (item.restrito) { Restrito.push(<FontAwesomeIcon icon={faCheck} className="p-0 m-0 cursor mr-2 mt-1" />); }

        tableData.push(
          {
            id: item.id,
            nome_pessoa: item.nome_pessoa,
            dia_vencimento: item.dia_vencimento,
            valor: formatExibeValor(item.valor),
            restrito: Restrito,
            descricao: item.descricao,
            buttons: Buttons,
          },
        );
      }

      /// MENSAGEM DE ERRO NO FILTRO
      if (parseInt(item.id, 10) === 0 && item.descricao !== '') {
        tableData.push({ id: '', nome_pessoa: item.descricao });
      }

      /// VALORES TOTAIS
      if (item.nome_pessoa === 'PAGAR') {
        valor_pagar.push(item.valor);
      }

      /// VALORES TOTAIS
      if (item.nome_pessoa === 'RECEBER') {
        valor_receber.push(item.valor);
      }
    });

    ///////// MENU RELATORIO ////////
    /////////////////////////////////
    const Reports = [
      <UncontrolledDropdown className="float-right mt-1">
        <DropdownToggle tag="a">
          <MoreHorizontal />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownRelatorio
            onClick={() => getFixoExcel(this.props)}
            icon={faFileExcel}
            titulo="Exportar Excel"
            permission={this.props}
            action="Excel"
          />
        </DropdownMenu>
      </UncontrolledDropdown>,
    ];

    ///////// RENDER TABLE //////////
    /////////////////////////////////
    return (
      <>
        <Modal
          open={this.props.modalVisibility}
          descricao="Confirma a exclusão do registro?"
          nao={() => hideModal(this.props)}
          sim={() => deleteRegistro(this.props, '/TsmFIXO/EXCLUI/', '@SET_FIXO_FILTRO_FLAG_TRUE')}
        />

        <Modal
          open={this.props.modalVisibilityFixo}
          descricao="Confirma o processamento dos movimentos Fixos?"
          adicional={`Período de ${formatMesLabel(this.props.paramFixoFicha.mes)} / ${this.props.paramFixoFicha.ano}`}
          nao={() => hideModalFixo(this.props)}
          sim={() => gerarFixo(this.props)}
        />

        <Container fluid className="p-0">
          <PageTitle title="Fixo" buttons={ActionButtons} voltar={false} />
          <FixoFiltro />
          <Card>
            {/****** header ***************/}
            {/*****************************/}
            <CardHeader className="pt-2 pb-2">
              { Reports }
              {/*<Pesquisar id="fixo-pesquisa" pesquisar={ () => functions.pesquisaFixo(this.props) } />*/}
            </CardHeader>
            {/****** body *****************/}
            {/*****************************/}
            <CardBody className="pt-0 pb-1">
              <BootstrapTable
                keyField="id"
                data={tableData}
                classes="table-striped"
                columns={tableColumns}
                bootstrap4
                bordered={false}
                pagination={paginationFactory({
                  sizePerPage: 10,
                  sizePerPageList: [5, 10, 25, 50, 100],
                })}
              />

              <TableTotal pagar={formatExibeValor(valor_pagar)} receber={formatExibeValor(valor_receber)} />

            </CardBody>
          </Card>

        </Container>
      </>

    );
  }
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  sidebar: state.sidebar,
  paramFixoFicha: state.fixo.paramFixoFicha,

  filtroColor: state.fixo.filtroColor,
  filtroAtivo: state.fixo.filtroAtivo,
  tableData: state.fixo.tableData,

  filtroFlag: state.fixo.filtroFlag,

  isLoading: state.loading.isLoading,

  visibilityPageFinanceiro: state.usuario.visibilityPageFinanceiro,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  filtroVisibility: state.sistema.filtroVisibility,
  modalVisibility: state.sistema.modalVisibility,
  modalVisibilityFixo: state.sistema.modalVisibilityFixo,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(FixoPagina);
