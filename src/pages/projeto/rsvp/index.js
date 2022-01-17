///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {
  Container, Row, CardBody, Card, Col,
} from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  Modal, TableButton, CardHeaderName, TabsProjeto, PageTitle, Buttons,
} from '../../../components';
import { resetNomeProjeto } from '../../../functions/projeto';
import {
  getRsvpPagina, editRSVP, compararRSVP, importaExcel,
} from '../../../functions/projeto/rsvp';
import {
  handleSidebar, hideModal, showModal, deleteRegistro, getExcel,
} from '../../../functions/sistema';

function RSVP(props) {
  const [id_projeto, setId_projeto] = useState(0);
  const [firstLoad, setFirst] = useState(true);
  const [tableData, setTableData] = useState([]);

  const ActionButtons = [
    <Buttons
      linkTo={`/projeto/painel/${props.match.params.id}/rsvp/ficha/0`}
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
    <Buttons
      description="Importar lista"
      color="green"
      title="Cadastrar novo registro."
      permission={props}
      onClick={() => document.getElementById('doc-file').click()}
    />,
  ];

  const tableColumns = [
    {
      dataField: 'id_pfisica', text: '', sort: true, classes: 'tb-col-rsvp-associado', headerClasses: 'tb-col-rsvp-associado bg-dark text-white',
    },
    {
      dataField: 'id', text: 'Id', sort: true, classes: 'tb-col-rsvp-id', headerClasses: 'tb-col-rsvp-id bg-dark text-white',
    },
    {
      dataField: 'nome', text: 'Nome', sort: true, classes: 'tb-col-rsvp-nome', headerClasses: 'tb-col-rsvp-nome bg-dark text-white',
    },
    {
      dataField: 'email', text: 'Email', sort: true, classes: 'tb-col-rsvp-email', headerClasses: 'tb-col-rsvp-email bg-dark text-white',
    },
    {
      dataField: 'telefone', text: 'Telefone', sort: true, classes: 'tb-col-rsvp-telefone', headerClasses: 'tb-col-rsvp-telefone bg-dark text-white',
    },
    {
      dataField: 'status', text: 'Status', sort: true, classes: 'tb-col-rsvp-status', headerClasses: 'tb-col-rsvp-status bg-dark text-white',
    },
    {
      dataField: 'hotsite', text: '', sort: false, classes: 'hide', headerClasses: 'text-white hide',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: 'tb-col-rsvp-button', headerClasses: 'tb-col-rsvp-buttons bg-dark text-white',
    },
  ];

  const rowClasses = (row) => {
    let rowClass;
    row.hotsite ? rowClass = 'text-blue' : rowClass = 'text-green';
    if (row.status === 'PENDENTE') { rowClass = 'text-blue'; }
    if (row.status === 'CONFIRMADO') { rowClass = 'text-dark'; }
    if (row.status === 'CANCELADO') { rowClass = 'text-danger'; }
    if (row.status === 'INDECISO') { rowClass = 'text-green'; }
    if (row.status === 'SEM CONTATO') { rowClass = 'text-warning'; }
    if (row.status === 'SEM RESPOSTA') { rowClass = 'text-info'; }
    return rowClass;
  };

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      setId_projeto(id);
      handleSidebar(props.dispatch, props.sidebar);
      resetNomeProjeto(props);
      getRsvpPagina(props, id);
      setFirst(false);
    }
  }, [props, firstLoad]);

  async function getPagina(props) {
    const { id } = props.match.params;
    await getRsvpPagina(props, id);
    const { dispatch } = props;
    dispatch({ type: '@SET_RSVP_FLAG_TRUE' });
    dispatch({ type: '@SET_RSVP_DELETE_FALSE' });
  }

  ////// FLAG DELETE
  useEffect(() => {
    if (props.flagDelete) {
      getPagina(props);
    }
  }, [props, props.flagDelete]);

  ////// CARREGA PAGINA
  useEffect(() => {
    const arrayRSVP = [];
    const { rsvp_regs } = props.tableData;
    const { id } = props.match.params;

    if (rsvp_regs.length > 0 || props.flagTableUpdate === true) {
      rsvp_regs.forEach((item) => {
        const buttonExcluir = <TableButton action="Excluir" permission={props} click={() => showModal(props, item.id)} />;
        const buttonEditar = <TableButton action="Editar" permission={props} click={() => editRSVP(props, id, item.id)} />;
        const buttonCompararEnable = <TableButton action="Comparar" permission={props} click={() => compararRSVP(props, id, item.id)} />;
        const buttonCompararDisable = <TableButton action="Comparar" disable permission={props} />;

        let Check = '';
        let buttonComparar;

        if (parseInt(item.id_pfisica, 10) > 0) {
          Check = <FontAwesomeIcon icon={faCheck} />;
          buttonComparar = buttonCompararDisable;
        } else {
          buttonComparar = buttonCompararEnable;
        }

        const Buttons = [
          buttonExcluir,
          buttonEditar,
          buttonComparar,
        ];

        arrayRSVP.push({
          id: item.id,
          nome: item.nome_completo.toUpperCase(),
          id_pfisica: Check,
          email: item.email.toLowerCase(),
          telefone: item.telefone,
          status: item.dstatus,
          hotsite: item.hotsite,
          buttons: Buttons,
          className: 'text-primary',
        });
      });

      setTableData(arrayRSVP);

      const { dispatch } = props;
      dispatch({ type: '@SET_RSVP_FLAG_FALSE' });
    }
  }, [props, props.tableData]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle
          history={props.history}
          title="Projeto"
          subtitle="/ RSVP"
          buttons={ActionButtons}
          voltar
          linkTo="/projeto/painel"
        />

        <Modal
          open={props.modalVisibility}
          descricao="Confirma a exclusão do registro?"
          nao={() => hideModal(props)}
          sim={() => deleteRegistro(props, '/TsmRSVP/EXCLUI/', '@SET_RSVP_DELETE_TRUE')}
        />

        <TabsProjeto ativo={3} props={props} />

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
                      excel
                      onClickExcel={() => getExcel(props, '/TsmRSVP/EXCEL', { id_projeto })}
                    />

                    <form encType="multipart/form-data" action="/upload/image" method="post">
                      <input id="doc-file" type="file" className="hide" onChange={() => importaExcel(props)} />
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
                        sizePerPage: 25,
                        sizePerPageList: [5, 10, 25, 50, 100],
                      })}
                    />

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

  tableData: state.rsvp.tableData,
  flagTableUpdate: state.rsvp.flagTableUpdate,
  flagDelete: state.rsvp.flagDelete,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(RSVP);
