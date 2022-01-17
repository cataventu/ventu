///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import {
  Container, Row, Col, Card, CardBody, CardHeader,
} from 'reactstrap';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {
  ButtonSwitch, Modal, TableButton, Buttons, PageTitle, CardProjeto,
} from '../../../components';
import {
  handleSidebar, hideModal, toggleFiltro, getPagina, deleteRegistro, showModal,
} from '../../../functions/sistema';
import { resetNomeProjeto } from '../../../functions/projeto';
import { goToAnexoFicha } from '../../../functions/anexo';
import ProjetoFiltro from './filtro';

///////// Projeto ///////////////
/////////////////////////////////
function Projetos(props) {
  const [firstLoad, setFirst] = useState(true);
  const [projetos, setProjetos] = useState(true);
  const [tableData, setTableData] = useState([]);

  const [visibilityCardsContainer, setVisibilityCardsContainer] = useState('exibe');
  const [visibilityCards, setVisibilityCards] = useState('');

  const [visibilityTableContainer, setVisibilityTableContainer] = useState('');
  const [visibilityTable, setVisibilityTable] = useState('hide');

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, classes: 'tb-painel-id', headerClasses: 'bg-dark text-white tb-painel-id',
    },
    {
      dataField: 'codigo', text: 'Código', sort: true, headerClasses: 'bg-dark text-white tb-painel-codigo',
    },
    {
      dataField: 'descricao', text: 'Descrição', sort: true, classes: 'tb-painel-descricao', headerClasses: 'bg-dark text-white tb-painel-descricao',
    },
    {
      dataField: 'dt_inicio', text: 'Início', sort: true, headerClasses: 'bg-dark text-white tb-painel-dt-inicio',
    },
    {
      dataField: 'dt_termino', text: 'Término', sort: true, headerClasses: 'bg-dark text-white tb-painel-dt-termino',
    },
    {
      dataField: 'dtipo', text: 'Tipo', sort: true, classes: 'tb-painel-tipo', headerClasses: 'bg-dark text-white tb-painel-tipo',
    },
    {
      dataField: 'vagas', text: 'Vagas', sort: true, headerClasses: 'bg-dark text-white tb-painel-vagas',
    },
    {
      dataField: 'dstatus', text: 'Status', sort: true, headerClasses: 'bg-dark text-white tb-painel-status',
    },
    {
      dataField: 'buttons', text: '', sort: false, headerClasses: 'bg-dark text-white tb-painel-buttons',
    },
  ];

  const ActionButtons = [
    <Buttons
      linkTo="/projeto/painel/0/ficha"
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
    <Buttons
      onClick={() => toggleFiltro(props, 'tabela-projeto-filtro')}
      description="Filtrar"
      color={props.filtroColor[props.filtroAtivo]}
      title="Filtro de informações."
      permission={props}
    />,
    <div className="painel-container-switch">
      <ButtonSwitch {...props} opcao1="Cards" opcao2="Tabela" top={2} />
    </div>,
  ];

  const handleEditar = useCallback((id) => {
    const { history } = props;
    const page = `/projeto/painel/${id}/ficha`;
    history.push(page);
  }, [props]);

  const handleConsultar = useCallback((id) => {
    const { history } = props;
    const page = `/projeto/painel/consulta/${id}`;
    history.push(page);
  }, [props]);

  const setTableVisible = useCallback(() => {
    setVisibilityCardsContainer('');
    setTimeout(() => setVisibilityCards('hide'), 500);

    setTimeout(() => setVisibilityTable(''), 400);
    setTimeout(() => setVisibilityTableContainer('exibe'), 400);
  }, []);

  const setCardVisible = useCallback(() => {
    setTimeout(() => setVisibilityCards('show'), 300);
    setTimeout(() => setVisibilityCardsContainer('exibe'), 350);

    setVisibilityTableContainer('');
    setTimeout(() => setVisibilityTable('hide'), 500);
  }, []);

  /////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      resetNomeProjeto(props);
      handleSidebar(props.dispatch, props.sidebar);
      //getTable();
      const url = '/TsmPROJETO/PAGINA/';
      const filtro = JSON.parse(localStorage.getItem('TABELAS_PROJETO_FILTRO'));
      const actionTable = '@GET_PROJETO_PAGINA';
      const actionFiltro = '@SET_PROJETO_FILTRO_FLAG_FALSE';
      getPagina(props, url, actionTable, filtro, actionFiltro);
      setFirst(false);
    }
  }, [props, firstLoad]);

  ////// TABLE DATA
  useEffect(() => {
    const _arrayProjetos = [];
    const _tableData = [];
    props.tableData.forEach((lista) => {
      const {
        id, descricao, dstatus, dtipo, vagas, codigo, dt_inicio, dt_termino,
      } = lista;

      if (id > 0) {
        _arrayProjetos.push(
          <CardProjeto
            id={id}
            name={descricao}
            state={dstatus}
            tipo={dtipo}
            vagas={vagas}
            codigo={codigo}
            inicio={dt_inicio}
            fim={dt_termino}
            visibility={visibilityCards}
            props={props}
          />,
        );

        const buttons = [];

        buttons.push(
          <TableButton action="Excluir" permission={props} click={() => showModal(props, id)} />,
          <TableButton action="Anexar" permission={props} click={() => goToAnexoFicha(props, id)} />,
          <TableButton action="Editar" permission={props} click={() => handleEditar(id)} />,
          <TableButton action="Consultar" permission={props} click={() => handleConsultar(id)} />,
        );

        _tableData.push({
          id, descricao, dstatus, dtipo, vagas, codigo, dt_inicio, dt_termino, buttons,
        });
      }
    });

    setProjetos(_arrayProjetos);
    setTableData(_tableData);
  }, [handleConsultar, handleEditar, props, props.tableData, visibilityCards]);

  ////// FILTRO FLAG
  useEffect(() => {
    if (props.filtroFlag) {
      const url = '/TsmPROJETO/PAGINA/';
      const filtro = JSON.parse(localStorage.getItem('TABELAS_PROJETO_FILTRO'));
      const actionTable = '@GET_PROJETO_PAGINA';
      const actionFiltro = '@SET_PROJETO_FILTRO_FLAG_FALSE';
      getPagina(props, url, actionTable, filtro, actionFiltro);
    }
  }, [props]);

  ////// ALTERNA CARDS E TABLE
  useEffect(() => {
    props.switchChecked
      ? setTableVisible()
      : setCardVisible();
  }, [props.switchChecked, setCardVisible, setTableVisible]);

  return (
    <>
      <Modal
        open={props.modalVisibility}
        descricao="Confirma a exclusão do registro?"
        nao={() => hideModal(props)}
        sim={() => deleteRegistro(props, '/TsmPROJETO/EXCLUI/', '@SET_PROJETO_FILTRO_FLAG_TRUE')}
      />

      <Container fluid className="p-0">
        <PageTitle title="Projeto" buttons={ActionButtons} voltar={false} />
        <ProjetoFiltro />
        <Row className={`painel-container-cards ${visibilityCardsContainer}`}>
          { projetos }
        </Row>
        <Row className={`pb-0 painel-container-table ${visibilityTableContainer}`}>
          <Col sm={12}>
            <Card className={visibilityTable}>
              <CardHeader />
              <CardBody className="pt-0">
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

  filtroColor: state.projeto.filtroColor,
  filtroAtivo: state.projeto.filtroAtivo,
  filtroFlag: state.projeto.filtroFlag,

  switchChecked: state.buttonSwitch.switchChecked,

  isLoading: state.loading.isLoading,

  tableData: state.projeto.tableData,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,

  auth: state.sistema.auth,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(Projetos);
