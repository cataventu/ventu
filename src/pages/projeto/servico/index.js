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
  Modal, CardHeaderName, TabsProjeto, TableButton, PageTitle, Buttons, //TableTotal,
} from '../../../components';
import {
  showModal, hideModal, deleteRegistro, getExcel, handleSidebar, formatCompleteZeros, formatExibeValor, autoClickPagination,
} from '../../../functions/sistema';
import { resetNomeProjeto } from '../../../functions/projeto';
import {
  editServicos, consultaServicos, getServicoPagina,
  resetServicos, goToAnexoFicha, duplicarServico,
} from '../../../functions/projeto/servico';

function ProjetoServicoPagina(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id_projeto, setId_projeto] = useState(0);
  const [tableData, setTableData] = useState([]);
  //const [valor_total, setValor_Total] = useState([]);

  //PAGINATION INDEX
  const { indexPagination } = props;
  const [startPagination] = useState(indexPagination);
  const [retryPagination, setRetryPagination] = useState(true);
  const paginationList = document.getElementsByClassName('page-link');
  /////////
  const ActionButtons = [
    <Buttons
      linkTo={`/projeto/painel/${props.match.params.id}/servicos/ficha/0`}
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
  ];

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, classes: 'tb-projeto-servicos-id', headerClasses: 'bg-dark text-white tb-projeto-servicos-id',
    },
    {
      dataField: 'fornecedor', text: 'Fornecedor', sort: true, classes: 'tb-projeto-servicos-servico', headerClasses: 'bg-dark text-white tb-projeto-servicos-servico',
    },
    //{
    //dataField: 'descricao', text: 'Descrição', sort: true, classes: 'tb-projeto-servicos-servico', headerClasses: 'bg-dark text-white tb-projeto-servicos-servico',
    //},
    {
      dataField: 'dstatus', text: 'Status', sort: true, classes: 'tb-projeto-servicos-status', headerClasses: 'bg-dark text-white tb-projeto-servicos-status',
    },
    {
      dataField: 'doperacao', text: 'Operação', sort: true, classes: 'tb-projeto-servicos-operacao', headerClasses: 'bg-dark text-white tb-projeto-servicos-operacao',
    },
    {
      dataField: 'moeda', text: 'Moeda', sort: true, classes: 'tb-projeto-servicos-moeda text-center', headerClasses: 'bg-dark text-white tb-projeto-servicos-moeda',
    },
    {
      dataField: 'valor_total', text: 'Valor', sort: true, classes: 'tb-projeto-servicos-total text-right', headerClasses: 'bg-dark text-white tb-projeto-servicos-total',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: 'tb-projeto-servicos-buttons', headerClasses: 'bg-dark text-white tb-projeto-servicos-buttons',
    },
  ];

  const rowClasses = (row) => {
    let rowClass;
    row.hotsite ? rowClass = 'text-blue' : rowClass = 'text-green';
    if (row.dstatus === 'COTAÇÃO') { rowClass = 'text-blue'; }
    if (row.dstatus === 'CONFIRMADO') { rowClass = 'text-dark'; }
    if (row.dstatus === 'CANCELADO') { rowClass = 'text-danger'; }

    return rowClass;
  };

  async function getPagina(props) {
    const { id } = props.match.params;
    await getServicoPagina(props, id);
    const { dispatch } = props;

    dispatch({ type: '@SET_PROSERVICO_FLAG_TRUE' });
    dispatch({ type: '@SET_PROSERVICO_DELETE_FALSE' });
  }

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      setId_projeto(id);
      handleSidebar(props.dispatch, props.sidebar);
      resetNomeProjeto(props);
      resetServicos(props);
      getServicoPagina(props, id);

      ////// RESET FICHAS LOCAL STORAGE
      localStorage.removeItem('PROSERVICO_FORM_STEP_01');
      localStorage.removeItem('PROSERVICO_FORM_STEP_02');
      localStorage.removeItem('PROSERVICO_FORM_STEP_03');
      localStorage.removeItem('PROSERVICO_FORM_STEP_04');
      localStorage.removeItem('PROSERVICO_FORM_STEP_05');
      localStorage.removeItem('PROSERVICO_FORM_STEP_06');
      localStorage.removeItem('PROSERVICO_FORM_STEP_07');
      localStorage.removeItem('PROSERVICO_FORM_STEP_08');
      localStorage.removeItem('PROSERVICO_FORM_STEP_09');
      localStorage.removeItem('PROSERVICO_FORM_STEP_10');

      const { dispatch } = props;
      dispatch({ type: '@RESET_STEP' });
      dispatch({ type: '@RESET_PROSERVICO_FICHA' });
      dispatch({ type: '@RESET_PROSERVICO_PAGINA' });
      dispatch({ type: '@RESET_PROSERVICO_FLAG_CONSOLIDADOR' });
    }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    if (props.flagDelete) {
      getPagina(props);
    }
  }, [props, props.flagDelete]);

  useEffect(() => {
    const arrayServico = [];
    const { proservico_regs } = props.tableData;

    const { id } = props.match.params;

    if (proservico_regs.length > 0 || props.flagTableUpdate === true) {
      proservico_regs.forEach((item) => {
        const Buttons = [
          <TableButton action="Excluir" permission={props} click={() => showModal(props, item.id)} />,
          <TableButton action="Editar" permission={props} click={() => editServicos(props, id, item.id)} />,
          <TableButton action="Anexar" permission={props} click={() => goToAnexoFicha(props, id, item.id)} />,
          <TableButton action="Consultar" permission={props} click={() => consultaServicos(props, id, item.id)} />,
          <TableButton action="Duplicar" permission={props} click={() => duplicarServico(props, item.id)} />,
        ];
        if (item.servico !== 'TOTAL' && parseInt(item.id, 10) > 0) {
          arrayServico.push({
            id: item.id,
            fornecedor: `${item.fornecedor}  -  ${item.descricao}`,
            //descricao: item.descricao,
            dstatus: item.dstatus,
            doperacao: item.doperacao,
            moeda: item.moeda,
            tipo_servico: item.tipo_servico,
            valor_total: formatExibeValor(formatCompleteZeros(item.valor_total, 2)),
            buttons: Buttons,
          });
        } //else {
        //setValor_Total(item.valor_total);
        //}
      });
      setTableData(arrayServico);

      const { dispatch } = props;
      dispatch({ type: '@SET_PROSERVICO_FLAG_FALSE' });
    }
  }, [props, props.tableData]);

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
      <Container fluid className="p-0">
        <PageTitle
          history={props.history}
          title="Projeto"
          subtitle="/ Serviço"
          buttons={ActionButtons}
          voltar
          linkTo="/projeto/painel"
        />

        <Modal
          open={props.modalVisibility}
          descricao="Confirma a exclusão do registro?"
          nao={() => hideModal(props)}
          sim={() => deleteRegistro(props, '/TsmPROSERVICO/EXCLUI/', '@SET_PROSERVICO_DELETE_TRUE')}
        />

        <TabsProjeto ativo={5} props={props} />

        <Row>
          <Col sm={12}>
            <Card>
              <CardBody className="pb-0">
                <Row>
                  <Col className="pl-3 pr-3 pt-0 pb-3 m-0" sm={12}>

                    <CardHeaderName
                      {... props}
                      titulo={props.nomeProjeto}
                      label="Projeto:"
                      excel
                      onClickExcel={() => getExcel(props, '/TsmPROSERVICO/EXCEL', { id_projeto })}
                    />

                    <form encType="multipart/form-data" action="/upload/image" method="post">
                      <input id="doc-file" type="file" className="hide" onChange={() => console.log('excel')} />
                    </form>

                    <BootstrapTable
                      keyField="id"
                      data={tableData}
                      classes="table-striped table-movimento"
                      columns={tableColumns}
                      bootstrap4
                      bordered={false}
                      rowClasses={rowClasses}
                      pagination={paginationFactory({
                        alwaysShowAllBtns: true,
                        sizePerPage: 10,
                        sizePerPageList: [5, 10, 25, 50, 100],
                        onPageChange: (page) => {
                          props.dispatch({ type: '@SET_INDEX_PAGINATION_PROSERVICO', payload: page });
                        },
                      })}
                    />

                    {/*<TableTotal total={formatExibeValor(valor_total)} /> */}

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
  indexPagination: state.servicos.indexPagination,
  nomeProjeto: state.projeto.nomeProjeto,

  tableData: state.servicos.tableData,
  flagTableUpdate: state.servicos.flagTableUpdate,
  flagDelete: state.servicos.flagDelete,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(ProjetoServicoPagina);
