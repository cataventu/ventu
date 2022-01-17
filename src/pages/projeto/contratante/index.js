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
  PageTitle, TabsProjeto, CardHeaderName, Buttons, Modal, TableButton,
} from '../../../components';
import { resetNomeProjeto } from '../../../functions/projeto';
import {
  handleSidebar, hideModal, showModal, deleteRegistro,
} from '../../../functions/sistema';
import { getContratantePagina, editContratante, resetContratante } from '../../../functions/projeto/contratante';

function Contratante(props) {
  //const [id_projeto, setId_projeto] = useState(0);
  const [firstLoad, setFirst] = useState(true);
  const [tableData, setTableData] = useState([]);

  const ActionButtons = [
    <Buttons
      linkTo={`/projeto/painel/${props.match.params.id}/contratante/ficha/0`}
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
  ];

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-1 bg-dark text-white',
    },
    {
      dataField: 'nome_pessoa', text: 'Contratante', sort: true, headerClasses: 'tb-col-9 bg-dark text-white',
    },
    {
      dataField: 'buttons', text: '', sort: false, headerClasses: 'tb-col-2 bg-dark text-white',
    },
  ];

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      //setId_projeto(id);
      handleSidebar(props.dispatch, props.sidebar);
      resetNomeProjeto(props);
      resetContratante(props);
      getContratantePagina(props, id);
    }
    setFirst(false);
  }, [props, firstLoad]);

  async function getPagina(props) {
    const { id } = props.match.params;
    await getContratantePagina(props, id);
    const { dispatch } = props;
    dispatch({ type: '@SET_CONTRATANTE_FLAG_TRUE' });
    dispatch({ type: '@SET_CONTRATANTE_DELETE_FALSE' });
  }

  useEffect(() => {
    if (props.flagDelete) {
      getPagina(props);
    }
  }, [props, props.flagDelete]);

  useEffect(() => {
    const arrayContratante = [];
    const { contratante_regs } = props.tableData;
    const { id } = props.match.params;

    if (contratante_regs.length > 0 || props.flagTableUpdate === true) {
      contratante_regs.forEach((item) => {
        const Buttons = [
          <TableButton action="Excluir" permission={props} click={() => showModal(props, item.id)} />,
          <TableButton action="Editar" permission={props} click={() => editContratante(props, id, item.id)} />,
        ];

        arrayContratante.push({
          id: item.id,
          nome_pessoa: item.nome_pessoa,
          buttons: Buttons,
        });
      });

      setTableData(arrayContratante);

      const { dispatch } = props;
      dispatch({ type: '@SET_CONTRATANTE_FLAG_FALSE' });
    }
  }, [props, props.tableData]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle
          history={props.history}
          title="Projeto"
          subtitle="/ Contratante"
          buttons={ActionButtons}
          voltar
          linkTo="/projeto/painel"
        />

        <Modal
          open={props.modalVisibility}
          descricao="Confirma a exclusão do registro?"
          nao={() => hideModal(props)}
          sim={() => deleteRegistro(props, '/TsmCONTRATANTE/EXCLUI/', '@SET_CONTRATANTE_DELETE_TRUE')}
        />

        <TabsProjeto ativo={2} props={props} />

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
                      //onClickExcel={ () => getExcel( props, '/TsmRSVP/EXCEL', { id_projeto: id_projeto } ) }
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

  tableData: state.contratante.tableData,

  flagTableUpdate: state.contratante.flagTableUpdate,
  flagDelete: state.contratante.flagDelete,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,

  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(Contratante);
