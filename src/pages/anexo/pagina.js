///////// IMPORTS ///////////////
/////////////////////////////////
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Container } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import NavItem from 'reactstrap/lib/NavItem';
import {
  PageTitle, Buttons, Modal, TableButton, CardHeaderName,
} from '../../components';
import { showModal, hideModal } from '../../functions/sistema';
import {
  getAnexoPagina, editAnexo, renderIcon, deleteAnexo, calculaTamanho, 
  downloadAnexo, consultaAnexo,
} from '../../functions/anexo';


class AnexoPagina extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: '',
    };
  }

  async componentDidMount() {
    /// RECEBE DADOS
    await getAnexoPagina(this.props,
      this.props.id_pfisica,
      this.props.id_pjuridica,
      this.props.id_projeto,
      this.props.id_proservico,
      this.props.id_movimento);
    const page = this.props.location.pathname.split('/');
    this.setState({ page: `/${page[1]}/${page[2]}` });
  }

  render() {
    ///////// TABLE COLUMNS /////////
    /////////////////////////////////
    const tableColumns = [
      {
        dataField: 'icone', text: 'Tipo', sort: true, headerClasses: 'tb-col-1 sm-2 bg-dark text-white',
      },
      {
        dataField: 'data', text: 'Data', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
      },
      {
        dataField: 'documento', text: 'Documento', sort: true, headerClasses: 'tb-col-6  sm-2 bg-dark text-white',
      },
      {
        dataField: 'tamanho', text: 'Tamanho', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
      },
      {
        dataField: 'buttons', text: '', sort: false, headerClasses: 'tb-col-1 sm-2 bg-dark text-white',
      },
    ];

    ///////// TABLE DATA ////////////
    /////////////////////////////////
    const tableData = [];
    this.props.anexoTableData.anexo_regs.forEach((item) => {
      const Buttons = [];
      if (parseInt(item.id, 10) > 0 && item.id !== '') {
             
         const Deletar = <TableButton action="Excluir" click={() => showModal(this.props, item.id)} permission={this.props} />;
         const Editar = <TableButton action="Editar" click={() => editAnexo(this.props, item.id)} permission={this.props} />;
         let Ver = <TableButton action="Ver" click={() => consultaAnexo(this.props, item.id)} permission={this.props} />;
         
         
         ////// DESABILITA BOTAO VER
         if (item.extensao === '.doc' || item.extensao === '.docx' || item.extensao === '.xlsx' || item.extensao === '.xls' || item.extensao === '.ppt' || item.extensao === '.pptx' || item.extensao === '.ppsx'  ){
            Ver = <TableButton action="Ver" permission={this.props} disable/>;
          }

         Buttons.push(
          Deletar,
          Editar,
          Ver,
        );
  
        const _icone = (
          <span onClick={() => downloadAnexo(this.props, item.id)}>
            {' '}
            { renderIcon(item.extensao, 'h3') }
          </span>
  
        );
    
        tableData.push(
          {
            icone: _icone,
            data: item.data,
            documento: item.titulo,
            tamanho: calculaTamanho(item.tamanho),
            buttons: Buttons,
          },
        );
      }

   
    });

    ///////// RENDER ////////////////
    /////////////////////////////////
    return (
      <Container fluid className="p-0">
        <Modal
          open={this.props.modalVisibility}
          descricao="Confirma a exclusão do registro?"
          nao={() => hideModal(this.props)}
          sim={() => deleteAnexo(this.props, this.props.modalId)}
        />
        <PageTitle
          title={this.props.title}
          subtitle={this.props.subtitle}
          voltar
          linkTo={this.state.page}
          history={this.props.history}
          buttons={(
            <Buttons
              linkTo={`${this.props.location.pathname}/ficha/0`}
              description="Incluir"
              icon="faPlus"
              color="primary"
              title="Cadastrar novo registro."
            />
          )}

        />
        <Card>
          <CardBody className="pb-3">
            <CardHeaderName {...this.props} titulo={this.props.anexoNome} />
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
    );
  }
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  anexoNome: state.anexo.anexoNome,
  anexoTableData: state.anexo.anexoTableData,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilityPageCadastro: state.usuario.visibilityPageCadastro,
  visibilityPageFinanceiro: state.usuario.visibilityPageFinanceiro,

  auth: state.sistema.auth,

  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(AnexoPagina);
