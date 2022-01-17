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
  TableButton, CardHeaderName, TabsProjeto, PageTitle, Modal, Buttons,
} from '../../../components';
import { resetNomeProjeto } from '../../../functions/projeto';
import {
  handleSidebar, hideModal, showModal, deleteRegistro, getExcel,
} from '../../../functions/sistema';
import {
  getParticipantesPagina, editParticipante, resetParticipantes, consultaPF,
} from '../../../functions/projeto/participantes';

function Participantes(props) {
  const [id_projeto, setId_projeto] = useState(0);
  const [firstLoad, setFirst] = useState(true);
  const [tableData, setTableData] = useState([]);

  const ActionButtons = [
    <Buttons
      linkTo={`/projeto/painel/${props.match.params.id}/participantes/ficha/0`}
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
  ];

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, classes: 'tb-participantes-id', headerClasses: 'tb-participantes-id bg-dark text-white',
    },
    {
      dataField: 'tag', text: 'Tag', sort: true, classes: 'tb-participantes-tag', headerClasses: 'tb-participantes-tag bg-dark text-white',
    },
    {
      dataField: 'nome', text: 'Nome', sort: true, classes: 'tb-participantes-nome', headerClasses: 'tb-participantes-nome bg-dark text-white',
    },
    {
      dataField: 'check_in', text: 'Check In', sort: true, classes: 'tb-participantes-check_in', headerClasses: 'tb-participantes-check_in bg-dark text-white',
    },
    {
      dataField: 'check_out', text: 'Check Out', sort: true, classes: 'tb-participantes-check_out', headerClasses: 'tb-participantes-check_out bg-dark text-white',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: 'tb-participantes-buttons', headerClasses: 'tb-participantes-buttons bg-dark text-white',
    },
  ];

  async function getPagina(props) {
    const { id } = props.match.params;
    await getParticipantesPagina(props, id);
    const { dispatch } = props;
    dispatch({ type: '@SET_PARTICIPANTES_FLAG_TRUE' });
    dispatch({ type: '@SET_PARTICIPANTES_DELETE_FALSE' });
  }

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;

      setId_projeto(id);

      handleSidebar(props.dispatch, props.sidebar);

      resetNomeProjeto(props);
      resetParticipantes(props);

      getParticipantesPagina(props, id);
    }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    if (props.flagDelete) {
      getPagina(props);
    }
  }, [props, props.flagDelete]);

  useEffect(() => {
    const arrayParticipantes = [];
    const { participante_regs } = props.tableData;
    const { id } = props.match.params;

    if (participante_regs.length > 0 || props.flagTableUpdate === true) {
      participante_regs.forEach((item) => {
        const Buttons = [
          <TableButton action="Excluir" permission={props} click={() => showModal(props, item.id)} />,
          <TableButton action="Editar" permission={props} click={() => editParticipante(props, id, item.id)} />,
          <TableButton action="Consultar" permission={props} click={() => consultaPF(props, item.id_participante)} />,
        ];

        arrayParticipantes.push({
          id: item.id,
          tag: item.tag,
          nome: item.par_nome_completo,
          check_in: item.check_in,
          check_out: item.check_out,
          buttons: Buttons,
        });
      });

      setTableData(arrayParticipantes);

      const { dispatch } = props;
      dispatch({ type: '@SET_PARTICIPANTES_FLAG_FALSE' });
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
          sim={() => deleteRegistro(props, '/TsmPARTICIPANTE/EXCLUI/', '@SET_PARTICIPANTES_DELETE_TRUE')}
        />

        <TabsProjeto ativo={4} props={props} />

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

                    <BootstrapTable
                      keyField="id"
                      data={tableData}
                      classes="table-striped table-movimento"
                      columns={tableColumns}
                      bootstrap4
                      bordered={false}
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

  tableData: state.participantes.tableData,
  flagTableUpdate: state.participantes.flagTableUpdate,
  flagDelete: state.participantes.flagDelete,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,

  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(Participantes);
