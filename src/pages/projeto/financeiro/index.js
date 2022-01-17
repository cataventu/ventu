///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {
  Container, Row, CardBody, Card, Col,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  CardHeaderName, TabsProjeto, PageTitle, Modal, TableButton, TableTotal,
} from '../../../components';
import { resetNomeProjeto, getProjetoFicha } from '../../../functions/projeto';
import { getFinanceiroPagina, consultaFinanceiro } from '../../../functions/projeto/financeiro';
import {
  handleSidebar, hideModal, deleteRegistro, getExcel, formatExibeValor,
} from '../../../functions/sistema';

function Financeiro(props) {
  const [id_projeto, setId_projeto] = useState(0);
  const [firstLoad, setFirst] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [valor_pagar, setValor_pagar] = useState(0);
  const [valor_receber, setValor_receber] = useState(0);

  const ActionButtons = [
    //<Buttons  linkTo={'/projeto/painel/'+props.match.params.id+'/financeiro/ficha/0'} />,
    //<Buttons linkTo={'/financeiro/movimento/ficha/0'}
    //description="Incluir"
    //color="primary"
    //title="Cadastrar novo registro."
    //permission={props} />,
  ];

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, classes: 'td-movimento-id', headerClasses: 'td-movimento-id bg-dark text-white',
    },
    {
      dataField: 'nome_pessoa', text: 'Contato', sort: true, classes: 'td-movimento-contato', headerClasses: 'td-movimento-contato bg-dark text-white',
    },
    {
      dataField: 'descricao', text: 'Descrição', sort: true, classes: 'td-movimento-contato', headerClasses: 'bg-dark text-white td-movimento-contato',
    },
    {
      dataField: 'documento', text: 'Documento', sort: true, classes: 'td-movimento-documento', headerClasses: 'td-movimento-documento bg-dark text-white',
    },
    {
      dataField: 'dt_vencimento', text: 'Vencimento', sort: true, classes: 'td-movimento-vencimento', headerClasses: 'td-movimento-vencimento bg-dark text-white',
    },
    {
      dataField: 'valor', text: 'Valor', sort: true, classes: 'td-movimento-valor', headerClasses: 'td-movimento-valor bg-dark text-white',
    },
    {
      dataField: 'status', text: 'Status', sort: true, classes: 'td-movimento-status', headerClasses: 'td-movimento-status bg-dark text-white',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: 'td-movimento-botoesProjeto', headerClasses: 'td-movimento-botoesProjeto bg-dark text-white',
    },
  ];

  const rowClasses = (row) => {
    let rowClass;
    row.transacao === 1 ? rowClass = 'text-danger' : rowClass = 'text-blue';
    return rowClass;
  };

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      setId_projeto(id);
      handleSidebar(props.dispatch, props.sidebar);
      resetNomeProjeto(props);
      getProjetoFicha(props, id);
      getFinanceiroPagina(props, id);
    }
    setFirst(false);
  }, [props, firstLoad]);

  async function getPagina(props) {
    const { id } = props.match.params;
    await getFinanceiroPagina(props, id);
    const { dispatch } = props;
    dispatch({ type: '@SET_MOVIMENTO_FLAG_TRUE' });
    dispatch({ type: '@SET_MOVIMENTO_DELETE_FALSE' });
  }

  useEffect(() => {
    if (props.flagDelete) {
      getPagina(props);
    }
  }, [props, props.flagDelete]);

  useEffect(() => {
    const array = [];
    const valor_pagar = [];
    const valor_receber = [];
    if (props.tableData.length > 0 || props.flagTableUpdate === true) {
      props.tableData.forEach((item) => {
        //const buttonExcluir  = <TableButton action="Excluir"     permission={ props } click={ () => showModal(props, item.id) } />;
        //const buttonEditar   = <TableButton action="Editar"      permission={ props } click={ () => editFinanceiro(props, item.id) } />
        const buttonConsulta = <TableButton action="Consultar" permission={props} click={() => consultaFinanceiro(props, item.id)} />;

        const Buttons = [
          //buttonExcluir,
          //buttonEditar,
          buttonConsulta,
        ];

        if (parseInt(item.id, 10) > 0) {
          array.push({
            id: item.id,
            transacao: item.transacao,
            nome_pessoa: item.nome_pessoa,
            descricao: item.descricao,
            documento: item.documento,
            dt_vencimento: item.dt_vencimento,
            valor: formatExibeValor(item.valor_pago),
            status: item.dstatus,
            buttons: Buttons,
          });
        }
        /// VALORES TOTAIS
        if (item.nome_pessoa === 'PAGAR') {
          valor_pagar.push(item.valor_pago);
        }

        /// VALORES TOTAIS
        if (item.nome_pessoa === 'RECEBER') {
          valor_receber.push(item.valor_pago);
        }
      });

      setTableData(array);
      setValor_pagar(valor_pagar);
      setValor_receber(valor_receber);

      const { dispatch } = props;
      dispatch({ type: '@SET_MOVIMENTO_FLAG_FALSE' });
    }
  }, [props, props.tableData]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle
          history={props.history}
          title="Projeto"
          subtitle="/ Participantes"
          buttons={ActionButtons}
          voltar
          linkTo="/projeto/painel"
        />

        <Modal
          open={props.modalVisibility}
          descricao="Confirma a exclusão do registro?"
          nao={() => hideModal(props)}
          sim={() => deleteRegistro(props, '/TsmMOVIMENTO/EXCLUI/', '@SET_MOVIMENTO_DELETE_TRUE')}
        />

        <TabsProjeto ativo={9} props={props} />

        <Row>
          <Col sm={12}>
            <Card>
              <CardBody className="pb-0">
                <Row>
                  <Col className="pl-3 pr-3 pt-0 pb-3 m-0" sm={12}>

                    <CardHeaderName
                      {...props}
                      titulo={props.nomeProjeto}
                      label="Projeto:"
                      //excel={true}
                      onClickExcel={() => getExcel(props, '/TsmRSVP/EXCEL', { id_projeto })}
                    />

                    <BootstrapTable
                      keyField="id"
                      data={tableData}
                      classes="table-striped table-movimento"
                      columns={tableColumns}
                      bootstrap4
                      bordered={false}
                      rowClasses={rowClasses}
                      pagination={paginationFactory({
                        sizePerPage: 25,
                        sizePerPageList: [5, 10, 25, 50, 100],
                      })}
                    />
                    <TableTotal pagar={formatExibeValor(valor_pagar)} receber={formatExibeValor(valor_receber)} />

                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  sidebar: state.sidebar,

  nomeProjeto: state.projeto.nomeProjeto,

  tableData: state.movimento.tableData,
  flagTableUpdate: state.movimento.flagTableUpdate,
  flagDelete: state.movimento.flagDelete,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,

  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(Financeiro);
