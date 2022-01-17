///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {
  Container, Row, CardBody, Card, Col,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  CardHeaderName, TabsProjeto, PageTitle, Modal, Buttons, TableButton, PainelTotaisOrcamento,
} from '../../../../components';
import {
  handleSidebar, showModal, hideModal, formatCompleteZeros, deleteRegistro,
} from '../../../../functions/sistema';
import {
  getROrcamentoPagina, editROrcamento, getOrcamentoFicha, atualizaStore, calculaOrcamento,
} from '../../../../functions/projeto/orcamento';

function Orcamento(props) {
  //const { history } = props;
  const { id: id_projeto, idOrcamento } = props.match.params;

  const [firstLoad, setFirst] = useState(true);
  const [nome_projeto, set_nome_projeto] = useState('');

  ////// RSERVICO
  const [orcamentoLista, set_orcamentoLista] = useState([]);
  const [tableData, set_tableData] = useState([]);

  const [fichaPainel, set_fichaPainel] = useState({
    tx_adm: 0,
    tx_imposto: 0,
    vlr_desconto: 0,
    tx_cliente: 0,
    vlr_subtotal: 0,
    vlr_total: 0,
    vlr_saldo: 0,
  });

  const ActionButtons = [
    <Buttons
      linkTo={`/projeto/painel/${id_projeto}/orcamento/ficha/${idOrcamento}/servico/ficha/0`}
      description="Incluir serviço"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
  ];

  const tableColumns = [
    {
      text: 'Id', dataField: 'id', sort: true, classes: 'tb-col-orcamento-ficha-id', headerClasses: 'tb-col-orcamento-ficha-id bg-dark text-white',
    },
    {
      text: 'Data', dataField: 'data', sort: true, classes: 'tb-col-orcamento-ficha-data', headerClasses: 'tb-col-orcamento-ficha-data bg-dark text-white',
    },
    {
      text: 'Descricao', dataField: 'descricao', sort: true, classes: 'tb-col-orcamento-ficha-descricao', headerClasses: 'tb-col-orcamento-ficha-descricao bg-dark text-white',
    },
    {
      text: 'Servico', dataField: 'servico', sort: true, classes: 'tb-col-orcamento-ficha-servico', headerClasses: 'tb-col-orcamento-ficha-servico bg-dark text-white',
    },
    {
      text: 'Qtd', dataField: 'qtd', sort: true, classes: 'tb-col-orcamento-ficha-qtd', headerClasses: 'tb-col-orcamento-ficha-qtd bg-dark text-white',
    },
    {
      text: 'Dias', dataField: 'dias', sort: true, classes: 'tb-col-orcamento-ficha-dias', headerClasses: 'tb-col-orcamento-ficha-dias bg-dark text-white',
    },
    {
      text: 'Valor Unitário', dataField: 'valor_unitario', sort: true, classes: 'tb-col-orcamento-ficha-valor-unitario ', headerClasses: 'tb-col-orcamento-ficha-valor-unitario bg-dark text-white',
    },
    {
      text: 'Taxa', dataField: 'taxa', sort: true, classes: 'tb-col-orcamento-ficha-taxas', headerClasses: 'tb-col-orcamento-ficha-taxas bg-dark text-white',
    },
    {
      text: 'Valor Cliente', dataField: 'valor_cliente', sort: true, classes: 'tb-col-orcamento-ficha-valor-cliente', headerClasses: 'tb-col-orcamento-ficha-valor-cliente bg-dark text-white',
    },
    {
      text: 'Total', dataField: 'total', sort: true, classes: 'tb-col-orcamento-ficha-total', headerClasses: 'tb-col-orcamento-ficha-total bg-dark text-white',
    },
    {
      text: '', dataField: 'buttons', sort: false, classes: 'tb-col-orcamento-ficha-buttons', headerClasses: 'tb-col-orcamento-ficha-buttons bg-dark text-white',
    },
  ];

  const handlePagina = useCallback((id) => {
    async function getPagina(id) {
      ////// PAGINA
      const form = { id_orcamento: id };
      const pagina = await getROrcamentoPagina(props, form);

      const { projeto, rorcamento_regs } = pagina;
      set_nome_projeto(projeto);
      set_orcamentoLista(rorcamento_regs);

      ////// FICHA
      const ficha = await getOrcamentoFicha(props, id);
      atualizaStore(ficha);

      const {
        tad_percentual,
        imp_percentual,
        des_valor,
        tcl_percentual,
        ser_valor,
        valor_total,
        valor_cliente,
        saldo,
      } = ficha;

      set_fichaPainel({
        tx_adm: tad_percentual,
        tx_imposto: imp_percentual,
        vlr_desconto: des_valor,
        tx_cliente: tcl_percentual,
        vlr_subtotal: ser_valor,
        vlr_total_cliente: valor_cliente,
        vlr_total: valor_total,
        vlr_saldo: saldo,
      });
    }
    getPagina(id);
  }, [props]);

  const handleCalcula = useCallback((id) => {
    async function calcula(id) {
      const response = await calculaOrcamento(props, id);
      const { pagina, ficha } = response;
      set_orcamentoLista(pagina);
      set_fichaPainel(ficha);
    }
    calcula(id);
  }, [props]);

  const handleDelete = useCallback(() => {
    async function delOrcamento(idOrcamento) {
      await deleteRegistro(props, '/TsmRORCAMENTO/EXCLUI/', '');
      handlePagina(idOrcamento);
    }
    delOrcamento(idOrcamento);
  }, [props, handlePagina, idOrcamento]);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      handleSidebar(props.dispatch, props.sidebar);
      handlePagina(idOrcamento);
      setFirst(false);
    }
  }, [props, firstLoad, handlePagina, idOrcamento]);

  ////// TABLE DATA - RORCAMENTO PAGINA
  useEffect(() => {
    const servicos = [];
    orcamentoLista.forEach((rservico) => {
      const {
        id,
        data,
        servico,
        descricao,
        dias,
        num_participante,
        valor_unitario,
        tax_percentual,
        valor_cliente,
        valor_total,
      } = rservico;

      ////// buttons
      const buttonExcluir = <TableButton action="Excluir" permission={props} click={() => showModal(props, id)} />;
      const buttonEditar = <TableButton action="Editar" permission={props} click={() => editROrcamento(props, id)} />;

      const buttons = [buttonExcluir, buttonEditar];

      servicos.push({
        id,
        data,
        descricao,
        servico,
        qtd: num_participante,
        dias,
        valor_unitario: formatCompleteZeros(valor_unitario, 2),
        taxa: `${formatCompleteZeros(tax_percentual, 2)} %`,
        valor_cliente: formatCompleteZeros(valor_cliente, 2),
        total: formatCompleteZeros(valor_total, 2),
        buttons,
      });
    });

    set_tableData(servicos);
  }, [props, orcamentoLista]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle
          history={props.history}
          title="Projeto"
          subtitle="/ Orçamento"
          buttons={ActionButtons}
          voltar
          linkTo={`/projeto/painel/${id_projeto}/orcamento`}
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
              <CardBody>

                {/*** LINHA 01 - HEADER PROJETO ***/}
                <Row>
                  <Col sm={12}>
                    <CardHeaderName
                      {...props}
                      titulo={nome_projeto}
                      label="Projeto:"
                      excel={false}
                    />
                  </Col>
                </Row>

                {/*** LINHA 03 - TABELA ***/}
                <Row>
                  <Col sm={12} className="pb-2">
                    <BootstrapTable
                      keyField="id"
                      data={tableData}
                      classes="table-striped table-movimento"
                      columns={tableColumns}
                      bootstrap4
                      bordered={false}
                    />

                  </Col>
                </Row>

                {/*** LINHA 04 - OBS E TOTAIS ***/}
                <Row>
                  {/*** VAZIO ***/}
                  <Col sm={8} />

                  {/*** TOTAIS ***/}
                  <Col sm={4} className="pt-0">
                    <PainelTotaisOrcamento
                      {...props}
                      ficha={fichaPainel}
                      page="servico"
                    />
                  </Col>
                </Row>

                {/*** LINHA 05 - SAVE ***/}
                <Row>
                  <Col sm={12}>
                    <Buttons
                      description="Calcular"
                      color="info"
                      title="Processar o valor do total do cliente."
                      permission={props}
                      onClick={() => handleCalcula(idOrcamento)}
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

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(Orcamento);
