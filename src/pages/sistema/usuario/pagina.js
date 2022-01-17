///////// IMPORTS ///////////////
/////////////////////////////////
import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Container, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import { MoreHorizontal } from 'react-feather';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import {
  DropdownRelatorio, TableButton, Modal, PageTitle, Buttons,
} from '../../../components';
import { getUsuarioExcel, recebeCookie, editUsuario } from '../../../functions/sistema/usuario';
import {
  showModal, hideModal, toggleFiltro, handleSidebar, getPagina, deleteRegistro,
} from '../../../functions/sistema';
import UsuarioFiltro from './filtro';

///////// TABELA Usuario //////////
/////////////////////////////////
class UsuarioPagina extends Component {
  async componentDidMount() {
    handleSidebar(this.props.dispatch, this.props.sidebar);
    await recebeCookie('filtroUsuario', this.props);
    //document.addEventListener("keydown", this.handleKeyDown);
    await getPagina(this.props, '/TsmUSUARIO/PAGINA/', '@GET_USUARIO_PAGINA', this.props.filtroData, '@SET_USUARIO_FILTRO_FLAG_FALSE');
    /// CRIA LISTENER TECLADO
    /// document.addEventListener( "keydown", (e) => this.handleKeyDownPAGINA, true );
  }

  async componentDidUpdate() {
    if (this.props.filtroFlag) {
      await getPagina(this.props, '/TsmUSUARIO/PAGINA/', '@GET_USUARIO_PAGINA', this.props.filtroData, '@SET_USUARIO_FILTRO_FLAG_FALSE');
    }
  }

  render() {
    ///////// ACTION BUTTONS ////////
    /////////////////////////////////
    const cadastroPath = '/sistema/usuario/ficha';
    const ActionButtons = [
      <Buttons
        linkTo={cadastroPath}
        description="Incluir"
        color="primary"
        title="Cadastrar novo registro."
        permission={this.props}
      />,
      <Buttons
        onClick={() => toggleFiltro(this.props, 'tabela-usuario-filtro')}
        description="Filtrar"
        color={this.props.filtroColor[this.props.filtroAtivo]}
        title="Filtro de informações."
        permission={this.props}
      />,
      <Buttons
        linkTo="/sistema/usuario/replicar"
        description="Replicar"
        color={this.props.filtroColor[this.props.filtroAtivo]}
        title="replicar permissões de usuários."
        permission={this.props}
      />,
    ];

    ///////// TABLE COLUMNS /////////
    /////////////////////////////////
    const tableColumns = [
      {
        dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-1 bg-dark text-white',
      },
      {
        dataField: 'nome', text: 'Nome', sort: true, headerClasses: 'tb-col-4 bg-dark text-white',
      },
      {
        dataField: 'gmail', text: 'Gmail', sort: true, headerClasses: 'tb-col-5 bg-dark text-white',
      },
      {
        dataField: 'buttons', text: '', sort: false, headerClasses: 'tb-col-2 bg-dark text-white',
      },
    ];

    ///////// TABLE DATA ////////////
    /////////////////////////////////
    const tableData = [];
    this.props.tableData.forEach((item) => {
      tableData.push(
        {
          id: item.id,
          nome: item.nome,
          gmail: item.gmail,
          buttons: [
            <TableButton action="Excluir" click={() => showModal(this.props, item.id)} permission={this.props} />,
            <TableButton action="Editar" click={() => editUsuario(this.props, item.id)} permission={this.props} />,
          ],
        },
      );
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
            onClick={() => getUsuarioExcel(this.props)}
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
          sim={() => deleteRegistro(this.props, '/TsmUSUARIO/EXCLUI/', '@SET_USUARIO_FILTRO_FLAG_TRUE')}
        />
        <Container fluid className="p-0">
          <PageTitle title="Usuário" buttons={ActionButtons} voltar={false} />
          <UsuarioFiltro />
          <Card>
            {/****** header ***************/}
            {/*****************************/}
            <CardHeader className="pt-2 pb-2">
              { Reports }
              {/*<Pesquisar id="usuario-pesquisa" pesquisar={ () => pesquisaUsuario(this.props) } /> */}
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
                  sizePerPage: 25,
                  sizePerPageList: [5, 10, 25, 50, 100],
                })}
              />
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

  filtroColor: state.usuario.filtroColor,
  filtroAtivo: state.usuario.filtroAtivo,
  tableData: state.usuario.tableData,
  filtroData: state.usuario.filtroData,
  filtroFlag: state.usuario.filtroFlag,

  visibilityPageSistema: state.usuario.visibilityPageSistema,

  auth: state.sistema.auth,
  filtroVisibility: state.sistema.filtroVisibility,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(UsuarioPagina);
