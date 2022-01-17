///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {
  Container, Row, CardBody, Card, Col,
} from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  TableButton, TabsProjeto, CardHeaderName, PageTitle, Modal, Buttons,
} from '../../../components';
import {
  getOrcamentoPagina, editOrcamento, duplicarOrcamento, servicosOrcamento, getOrcamentoExcel,
} from '../../../functions/projeto/orcamento';
import {
  handleSidebar, showModal, hideModal, deleteRegistro, formatCompleteZeros,
} from '../../../functions/sistema';

function Orcamento(props) {
  const { dispatch } = props;
  const { id } = props.match.params;

  const [firstLoad, setFirst] = useState(true);
  const [nome_projeto, set_nome_projeto] = useState('');

  const [orcamentoLista, setOrcamentoLista] = useState([]);
  const [tableData, setTableData] = useState([]);

  const ActionButtons = [
    <Buttons
      linkTo={`/projeto/painel/${id}/orcamento/ficha/0`}
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
  ];

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, classes: 'tb-col-orcamento-id', headerClasses: 'tb-col-orcamento-id bg-dark text-white',
    },
    {
      dataField: 'aprovado', text: 'Aprovado', sort: true, classes: 'tb-col-orcamento-aprovado', headerClasses: 'tb-col-orcamento-aprovado bg-dark text-white',
    },
    {
      dataField: 'data', text: 'Data', sort: true, classes: 'tb-col-orcamento-data', headerClasses: 'tb-col-orcamento-data bg-dark text-white',
    },
    {
      dataField: 'titulo', text: 'Título', sort: true, classes: 'tb-col-orcamento-titulo', headerClasses: 'tb-col-orcamento-titulo bg-dark text-white',
    },
    {
      dataField: 'participantes', text: 'Participantes', sort: true, classes: 'tb-col-orcamento-participantes pr-4', headerClasses: 'tb-col-orcamento-participantes bg-dark text-white',
    },
    {
      dataField: 'valor_total', text: 'Valor', sort: true, classes: 'tb-col-orcamento-valor', headerClasses: 'tb-col-orcamento-valor bg-dark text-white',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: 'tb-col-orcamento-buttons', headerClasses: 'tb-col-orcamento-buttons bg-dark text-white',
    },
  ];

  const handlePagina = useCallback((id) => {
    async function getPagina(id) {
      const form = { id_projeto: parseInt(id, 10) };
      const pagina = await getOrcamentoPagina(props, form);
      const { projeto, orcamento_regs } = pagina;
      set_nome_projeto(projeto);
      setOrcamentoLista(orcamento_regs);
    }
    getPagina(id);
  }, [props]);

  const handleDelete = useCallback(() => {
    async function delOrcamento(id) {
      await deleteRegistro(props, '/TsmORCAMENTO/EXCLUI/', '');
      handlePagina(id);
    }
    delOrcamento(id);
  }, [id, props, handlePagina]);

  const handleDuplica = useCallback((id) => {
    async function duplicar(id) {
      const duplicar = await duplicarOrcamento(props, id);
      setOrcamentoLista(duplicar);
    }
    duplicar(id);
  }, [props]);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      handleSidebar(props.dispatch, props.sidebar);
      dispatch({ type: '@RESET_PAINEL_ORCAMENTO_FICHA' });
      handlePagina(id);
      setFirst(false);
    }
  }, [props, firstLoad, handlePagina, dispatch, id]);

  ///// TABLE DATA
  useEffect(() => {
    const _temp = [];

    /// VARIAVEIS PERMISSAO GESTOR
    let flagGerente = false;
    let flagAprovado = false;
    const click_disable = () => { };

    let click_editar = (id) => editOrcamento(props, id);
    let click_duplicar = (id) => handleDuplica(id);
    let click_servicos = (id) => servicosOrcamento(props, id);

    if (props.visibilityPageProjeto.length === 0) { return; }

    props.visibilityPageProjeto[1].funcoes.forEach((permissao) => {
      const { descricao, acesso } = permissao;
      if (descricao === 'GERENTE') { flagGerente = acesso; }
    });

    if (!flagGerente) {
      /// PASSO 1 - VERIFICAR APROVADO
      orcamentoLista.forEach((item) => {
        const { aprovado } = item;
        if (aprovado) {
          flagAprovado = true;
          click_editar = () => click_disable;
          click_duplicar = () => click_disable;
          click_servicos = () => click_disable;
        }
      });
    }

    /// PASSO 2 - ATUALIZAR TABLEDATA
    orcamentoLista.forEach((item) => {
      const {
        id,
        data,
        titulo,
        valor_total,
        num_participante,
        aprovado,
      } = item;

      const buttonExcel = <TableButton action="Excel" permission={props} click={() => getOrcamentoExcel(props, id)} />;
      const buttonExcluir = <TableButton action="Excluir" permission={props} click={() => showModal(props, id)} />;

      const buttonEditar = <TableButton action="Editar" disable={flagAprovado} permission={props} click={() => click_editar(id)} />;
      const buttonDuplicar = <TableButton action="Duplicar" disable={flagAprovado} permission={props} click={() => click_duplicar(id)} />;
      const buttonServicos = <TableButton action="Serviços" disable={flagAprovado} permission={props} click={() => click_servicos(id)} />;

      const buttons = [buttonExcluir, buttonEditar, buttonExcel, buttonDuplicar, buttonServicos];

      let _aprovado = aprovado;
      aprovado === true
        ? _aprovado = <FontAwesomeIcon size={12} icon={faCheck} className="text-success" />
        : _aprovado = '';

      if (id > 0) {
        _temp.push({
          id,
          data,
          titulo,
          valor_total: formatCompleteZeros(valor_total, 2),
          participantes: num_participante,
          aprovado: _aprovado,
          buttons,
        });
      }
    });
    setTableData(_temp);
  }, [props, orcamentoLista, handleDuplica]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle
          history={props.history}
          title="Projeto"
          subtitle="/ Orçamento"
          buttons={ActionButtons}
          voltar
          linkTo="/projeto/painel"
        />

        <Modal
          open={props.modalVisibility}
          descricao="Confirma a exclusão do registro?"
          nao={() => hideModal(props)}
          sim={() => handleDelete()}
        />

        <TabsProjeto ativo={10} props={props} />

        <Row>
          <Col sm={12}>
            <Card>
              <CardBody className="pb-0">
                <Row>
                  <Col className="pl-3 pr-3 pt-0 pb-3 m-0" sm={12}>

                    <CardHeaderName
                      {...props}
                      titulo={nome_projeto}
                      label="Projeto:"
                      excel={false}
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

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(Orcamento);
