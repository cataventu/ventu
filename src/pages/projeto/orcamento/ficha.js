///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import {
  Container, Row, CardBody, Card, Col, FormGroup, Input, Label,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Checkbox, CardHeaderName, TabsProjeto, PageTitle, Buttons, PainelTotaisOrcamento, AutoCompletarV2,
} from '../../../components';
import {
  handleSidebar, formatData, formatDataInput, formatCompleteZeros, getCurrentDate,
} from '../../../functions/sistema';
import {
  getOrcamentoFicha, saveOrcamentoFicha, atualizaStore,
} from '../../../functions/projeto/orcamento';

function Orcamento(props) {
  //const { history } = props;
  const { id: id_projeto, idOrcamento } = props.match.params;

  const [firstLoad, setFirst] = useState(true);

  ////// FICHA
  const [fichaData, set_fichaData] = useState({});
  const [fichaPainel, set_fichaPainel] = useState({
    tx_adm: 0,
    tx_imposto: 0,
    vlr_desconto: 0,
    tx_cliente: 0,
    vlr_subtotal: 0,
    vlr_total: 0,
    vlr_saldo: 0,
  });

  const [id_orcamento, set_id_orcamento] = useState(0);
  const [nome_projeto, set_nome_projeto] = useState('');
  const [titulo, set_titulo] = useState('');
  const [data, set_data] = useState('');
  const [des_calculado, set_des_calculado] = useState(false);
  const [aprovado, set_aprovado] = useState(false);

  const [num_participante, set_num_participante] = useState('');
  const [num_pagante, set_num_pagante] = useState('');
  const [num_cliente, set_num_cliente] = useState('');
  const [num_coordenador, set_num_coordenador] = useState('');
  const [num_batedor, set_num_batedor] = useState('');
  const [num_motorista, set_num_motorista] = useState('');
  const [num_interprete, set_num_interprete] = useState('');

  const [moeda, set_moeda] = useState('');
  const [id_moeda, set_id_moeda] = useState(0);
  const [cambio, set_cambio] = useState(1);

  const [observacao, set_observacao] = useState('');

  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  ////// PAINEL VALORES
  const [tad_percentual, set_tad_percentual] = useState(''); /// TAXA ADM
  const [imp_percentual, set_imp_percentual] = useState(''); /// IMPOSTO
  const [des_valor, set_des_valor] = useState(''); /// IMPOSTO
  const [tcl_percentual, set_tcl_percentual] = useState(''); /// TAXA CLIENTE
  const [ser_valor, set_ser_valor] = useState(0); /// SUBTOTAL
  const [valor_total, set_valor_total] = useState(0); /// TOTAL
  const [saldo, set_saldo] = useState(''); /// SALDO

  const [form, set_form] = useState(''); /// FORMULÁRIO SAVE

  const handleFicha = useCallback((id) => {
    async function getFicha(id) {
      const ficha = await getOrcamentoFicha(props, id);
      set_fichaData(ficha);
    }
    getFicha(id);
  }, [props]);

  const handleDesconto = useCallback((checked) => {
    set_des_calculado(checked);
    if (checked) { set_des_valor(formatCompleteZeros(0, 2)); }
  }, []);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      set_data(formatDataInput(getCurrentDate()));
      handleSidebar(props.dispatch, props.sidebar);
      handleFicha(idOrcamento);
      setFirst(false);
    }
  }, [props, firstLoad, handleFicha, idOrcamento]);

  ////// FICHA DATA
  useEffect(() => {
    const {
      id,
      //id_projeto,
      projeto,
      data,
      titulo,
      des_calculado,
      aprovado,
      num_participante,
      num_pagante,
      num_cliente,
      num_coordenador,
      num_interprete,
      num_batedor,
      num_motorista,
      id_moeda,
      moeda,
      cambio,
      ser_valor,
      tad_percentual,
      //tad_valor,
      imp_percentual,
      //imp_valor,
      //des_percentual,
      des_valor,
      valor_total,
      tcl_percentual,
      valor_cliente,
      observacao,
      alt_dhsis,
    } = fichaData;

    if (id === undefined || parseInt(id, 10) === 0 || id_orcamento > 0) { return; }

    atualizaStore(fichaData);

    set_id_orcamento(id);
    set_nome_projeto(projeto);
    set_titulo(titulo);
    set_data(formatDataInput(data));
    set_des_calculado(des_calculado);
    set_aprovado(aprovado);

    set_num_participante(num_participante);
    set_num_pagante(num_pagante);
    set_num_cliente(num_cliente);
    set_num_coordenador(num_coordenador);
    set_num_batedor(num_batedor);
    set_num_motorista(num_motorista);
    set_num_interprete(num_interprete);

    set_moeda(moeda);
    set_id_moeda(id_moeda);
    set_cambio(cambio);

    set_observacao(observacao);

    setAlt_dhsis(alt_dhsis);

    set_ser_valor(formatCompleteZeros(ser_valor, 2));
    set_tad_percentual(tad_percentual);
    set_imp_percentual(imp_percentual);
    set_des_valor(formatCompleteZeros(des_valor, 2));
    set_valor_total(formatCompleteZeros(valor_total, 2));
    set_tcl_percentual(tcl_percentual);

    set_saldo(0);

    set_fichaPainel({
      tx_adm: tad_percentual,
      tx_imposto: imp_percentual,
      vlr_desconto: des_valor,
      tx_cliente: tcl_percentual,
      vlr_subtotal: ser_valor,
      vlr_total: valor_total,
      vlr_total_cliente: valor_cliente,
      vlr_saldo: saldo,
    });
  }, [fichaData, saldo, id_orcamento]);

  ////// ATUALIZA FORM
  useEffect(() => {
    const newForm = {
      id: idOrcamento,
      nome_projeto,
      id_projeto,
      titulo,
      data: formatData(data),
      id_moeda: 1,
      moeda: 'BRL',
      cambio: 1,
      des_calculado,
      aprovado,
      num_participante,
      num_pagante,
      num_cliente,
      num_coordenador,
      num_batedor,
      num_motorista,
      num_interprete,
      observacao,
      alt_dhsis,
      ser_valor,
      tad_percentual,
      imp_percentual,
      des_valor,
      valor_total,
      tcl_percentual,
      saldo,
    };
    set_form(newForm);
    atualizaStore(newForm);
  }, [idOrcamento, nome_projeto, id_projeto, titulo, data, des_calculado, aprovado, num_participante,
    num_pagante, num_cliente, num_coordenador, num_batedor, num_motorista, num_interprete, id_moeda,
    moeda, cambio, observacao, alt_dhsis, ser_valor, tad_percentual, imp_percentual, des_valor, valor_total,
    tcl_percentual, saldo]);

  ////// FICHA PAINEL ORCAMENTO
  useEffect(() => {
    const {
      des_valor,
      imp_percentual,
      saldo,
      ser_valor,
      tad_percentual,
      tcl_percentual,
      valor_total,
    } = props.fichaPainelOrcamento;

    set_tad_percentual(tad_percentual);
    set_imp_percentual(imp_percentual);
    set_des_valor(des_valor);
    set_tcl_percentual(tcl_percentual);

    set_ser_valor(ser_valor);
    set_valor_total(valor_total);
    set_saldo(saldo);
  }, [props.fichaPainelOrcamento]);

  ////// AUTO COMPLETAR MOEDA
  useEffect(() => {
    set_moeda(props.AC_Moeda);
    set_id_moeda(props.AC_Id_Moeda);
  }, [props.AC_Id_Moeda, props.AC_Moeda]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle
          history={props.history}
          title="Projeto"
          subtitle="/ Orçamento"
          voltar
          linkTo={`/projeto/painel/${id_projeto}/orcamento`}
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

                {/*** LINHA 02 - TITULO ***/}
                <Row>
                  {/*** ID ***/}
                  <Col sm={1}>
                    <FormGroup>
                      <Label>Id</Label>
                      <Input
                        type="text"
                        disabled
                        value={id_orcamento}
                        role="contentinfo"
                      />
                    </FormGroup>
                  </Col>

                  {/*** TITULO ***/}
                  <Col sm={3}>
                    <FormGroup>
                      <Label>Título</Label>
                      <Input
                        type="text"
                        value={titulo}
                        onChange={(e) => set_titulo(e.target.value)}
                      />
                    </FormGroup>
                  </Col>

                  {/*** DATA ***/}
                  <Col sm={2}>
                    <FormGroup>
                      <Label>Data</Label>
                      <Input
                        type="date"
                        value={data}
                        onChange={(e) => set_data(e.target.value)}
                      />
                    </FormGroup>
                  </Col>

                  {/*** MOEDA ***/}
                  <Col sm={2}>
                    <FormGroup>
                      <Label>Moeda</Label>
                      <AutoCompletarV2
                        {...props}
                        value={moeda}
                        valueId={id_moeda}
                        tabela="MOEDA"
                        campo="DESCRICAO"
                        disabled={false}
                        visible
                        editar={{ id: id_moeda, value: moeda, valueId: id_moeda }}
                      />
                    </FormGroup>
                  </Col>
                  {/*** CAMBIO ***/}
                  <Col sm={1}>
                    <FormGroup>
                      <Label>Câmbio</Label>
                      <Input
                        type="number"
                        value={cambio}
                        onChange={(e) => set_cambio(e.target.value)}
                      />
                    </FormGroup>
                  </Col>

                  {/*** DESCONTO ***/}
                  <Col sm={2}>
                    <FormGroup className="text-right">
                      <Label>Desconto automático</Label>
                      <Checkbox
                        info="Sim"
                        checked={des_calculado}
                        onClick={(e) => handleDesconto(e.target.checked)}
                      />
                    </FormGroup>
                  </Col>

                  {/*** APROVADO ***/}
                  <Col sm={1}>
                    <FormGroup className="text-right">
                      <Label>Aprovado</Label>
                      <Checkbox
                        info="Sim"
                        checked={aprovado}
                        onClick={(e) => set_aprovado(e.target.checked)}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                {/*** LINHA 03 - COLUNAS ***/}
                <Row>
                  {/*** COLUNA 01 ***/}
                  <Col sm={8}>
                    <Row>
                      {/*** PARTICIPANTES ***/}
                      <Col sm={6} className="pt-0">
                        {/*** TITLE PARTICIPANTES ***/}
                        <Row className="">
                          <Col sm={12} className="">
                            <Label className=""><b>Participantes</b></Label>
                            <hr className="mb-2 mt-1" />
                          </Col>
                        </Row>
                        {/*** INPUTS PARTICIPANTES ***/}
                        <Row>
                          {/*** CONVIDADOS ***/}
                          <Col sm={6}>
                            <Row className="pb-2">
                              <Col sm={7} className="text-right pt-2">
                                <Label>Convidados</Label>
                              </Col>
                              <Col sm={5}>
                                <Input
                                  type="number"
                                  value={num_participante}
                                  onChange={(e) => set_num_participante(e.target.value)}
                                />
                              </Col>
                            </Row>
                          </Col>

                          {/*** PAGANTES ***/}
                          <Col sm={6}>
                            <Row className="pb-2">
                              <Col sm={7} className="text-right pt-2">
                                <Label>Pagantes</Label>
                              </Col>
                              <Col sm={5}>
                                <Input
                                  type="number"
                                  value={num_pagante}
                                  onChange={(e) => set_num_pagante(e.target.value)}
                                />
                              </Col>
                            </Row>
                          </Col>

                          {/*** QUEBRA DE LINHA ***/}
                          <Col sm={12} className="m-0"><hr /></Col>

                          {/*** CLIENTES ***/}
                          <Col sm={6}>
                            <Row className="pb-2">
                              <Col sm={7} className="text-right pt-2">
                                <Label>Clientes</Label>
                              </Col>
                              <Col sm={5}>
                                <Input
                                  type="number"
                                  value={num_cliente}
                                  onChange={(e) => set_num_cliente(e.target.value)}
                                />
                              </Col>
                            </Row>
                          </Col>

                          {/*** COORDENADOR ***/}
                          <Col sm={6}>
                            <Row className="pb-2">
                              <Col sm={7} className="text-right pt-2">
                                <Label>Coordenadores</Label>
                              </Col>
                              <Col sm={5}>
                                <Input
                                  type="number"
                                  value={num_coordenador}
                                  onChange={(e) => set_num_coordenador(e.target.value)}
                                />
                              </Col>
                            </Row>
                          </Col>

                          {/*** BATEDORES ***/}
                          <Col sm={6}>
                            <Row className="pb-2">
                              <Col sm={7} className="text-right pt-2">
                                <Label>Batedores</Label>
                              </Col>
                              <Col sm={5}>
                                <Input
                                  type="number"
                                  value={num_batedor}
                                  onChange={(e) => set_num_batedor(e.target.value)}
                                />
                              </Col>
                            </Row>
                          </Col>

                          {/*** MOTORISTA ***/}
                          <Col sm={6}>
                            <Row className="pb-2">
                              <Col sm={7} className="text-right pt-2">
                                <Label>Motoristas</Label>
                              </Col>
                              <Col sm={5}>
                                <Input
                                  type="number"
                                  value={num_motorista}
                                  onChange={(e) => set_num_motorista(e.target.value)}
                                />
                              </Col>
                            </Row>
                          </Col>

                          {/*** INTERPRETES ***/}
                          <Col sm={6}>
                            <Row className="pb-2">
                              <Col sm={7} className="text-right pt-2">
                                <Label>Interpretes</Label>
                              </Col>
                              <Col sm={5}>
                                <Input
                                  type="number"
                                  value={num_interprete}
                                  onChange={(e) => set_num_interprete(e.target.value)}
                                />
                              </Col>
                            </Row>
                          </Col>

                          {/*** QUEBRA DE LINHA ***/}
                          <Col sm={12} className="m-0"><hr /></Col>
                        </Row>
                      </Col>
                      {/*** OBSERVACAO ***/}
                      <Col sm={6}>
                        <FormGroup>
                          <Label>Observação</Label>
                          <Input
                            type="textarea"
                            value={observacao}
                            onChange={(e) => set_observacao(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>

                  {/*** COLUNA 02 - TOTAIS ***/}
                  <Col sm={4}>
                    <PainelTotaisOrcamento
                      {...props}
                      ficha={fichaPainel}
                      disableDesconto={des_calculado}
                      page="orcamento"
                    />
                  </Col>
                </Row>

                {/*** LINHA 04 - SAVE ***/}
                <Row>
                  <Col sm={12}>
                    <Buttons
                      description="Salvar"
                      color="green"
                      title="Salvar ficha do orçamento."
                      permission={props}
                      onClick={() => saveOrcamentoFicha(props, form)}
                    />
                  </Col>
                  {/*** DHSIS ***/}
                  <Col sm={12} className="hide">
                    <small>
                      <span className="pr-3 text-black">Atualização:</span>
                      <span className="text-muted">
                        {/*{ alt_dusuario } */}
                        {' '}
-
                        {' '}
                        { alt_dhsis }
                      </span>
                    </small>
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

  fichaPainelOrcamento: state.painelTotaisOrcamento.ficha,

  AC_Id_Moeda: state.autoCompletar.autoCompletarId_Moeda,
  AC_Moeda: state.autoCompletar.autoCompletarMoeda,

  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(Orcamento);
