///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import {
  Container, Row, CardBody, Card, Col, FormGroup, Label, Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  PageTitle, Checkbox, ButtonSwitch, SaveButton, TabsProjeto, TotaisOrcamento,
  AutoCompletarPessoa, AutoCompletarV2, CardHeaderName,
} from '../../../../components';
import {
  handleSidebar, formatData, formatDataInput, formatCompleteZeros, getDados, getCurrentDate,
} from '../../../../functions/sistema';
import { getROrcamentoFicha, saveROrcamentoFicha } from '../../../../functions/projeto/orcamento';

function Orcamento(props) {
  const {
    history,
    dispatch,
    AC_Moeda,
    AC_Servico,
    AC_Pfisica,
    AC_Pjuridica,
    AC_Id_Moeda,
    AC_Id_Servico,
    AC_Id_Pfisica,
    AC_Id_Pjuridica,
  } = props;

  const { id: id_projeto, idOrcamento, idServico } = props.match.params;

  const [firstLoad, setFirst] = useState(true);

  ////// FICHA DATA
  const [nome_projeto, set_nome_projeto] = useState('');
  const [fichaData, set_fichaData] = useState({});

  ////// LINHA 1
  const [id_rorcamento, set_id_rorcamento] = useState(0);
  const [descricao, set_descricao] = useState('');

  ////// FORNECEDOR
  const [pessoa, set_pessoa] = useState('');
  const [id_pfisica, set_id_pfisica] = useState(0);
  const [pfisica, set_pfisica] = useState('');
  const [id_pjuridica, set_id_pjuridica] = useState(0);
  const [pjuridica, set_pjuridica] = useState('');
  const [id_fornecedor, set_id_fornecedor] = useState(0);

  ////// LINHA 2
  const [moeda, set_moeda] = useState('');
  const [id_moeda, set_id_moeda] = useState(0);
  const [cambio, set_cambio] = useState(1);

  ////// TIPO SERVICO
  const [listaTipoServico, set_listaTipoServico] = useState('');
  const [tipo_servico, set_tipo_servico] = useState(0);
  const [id_servico, set_id_servico] = useState(0);
  const [servico, set_servico] = useState('');

  ////// LINHA 3
  const [lockQuantidade, set_lockQuantidade] = useState(false);
  const [visibilityParticipantes, set_visibilityParticipantes] = useState('');
  const [visibilityDesconto, set_visibilityDesconto] = useState('hide');

  const [participantes, set_participantes] = useState(1);
  const [pagantes, set_pagantes] = useState(0);

  const [convidados, set_convidados] = useState(false);
  const [coordenadores, set_coordenadores] = useState(false);
  const [motoristas, set_motoristas] = useState(false);
  const [clientes, set_clientes] = useState(false);
  const [batedores, set_batedores] = useState(false);
  const [interpretes, set_interpretes] = useState(false);

  const [dias, set_dias] = useState(1);
  const [data, set_data] = useState('');

  ////// COLUNA 2 - VALORES
  const [desconto, set_desconto] = useState(false);

  const [valor_unitario, set_valor_unitario] = useState(0);
  const [valor_calculado, set_valor_calculado] = useState(0);
  const [tax_percentual, set_tax_percentual] = useState(0);
  const [valor_praticado, set_valor_praticado] = useState(0);
  const [valor_cliente, set_valor_cliente] = useState(0);
  const [valor_total, set_valor_total] = useState(0);

  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, set_form] = useState({});

  ////// FICHA DATA
  const handleFicha = useCallback((id) => {
    async function getFicha(id) {
      const tipo = await getDados(props, '/TsmSISTEMA/TIPO_SERVICO_TABELA', '');
      set_listaTipoServico(tipo);

      if (parseInt(id, 10) === 0) { return; }

      const ficha = await getROrcamentoFicha(props, id);
      const { projeto } = ficha;

      set_nome_projeto(projeto);
      set_fichaData(ficha);
    }
    getFicha(id);
  }, [props]);

  ////// HERDA PARTICIPANTES CASO QTD TRAVADA
  const atualizaParticipantes = useCallback((checked, campo, participantes, pagantes) => {
    const fichaParticipantes = JSON.parse(localStorage.getItem('PROJETO_ORCAMENTO_FICHA'));
    const {
      num_batedor,
      num_cliente,
      num_coordenador,
      num_interprete,
      num_motorista,
      num_pagante,
      num_participante,
    } = fichaParticipantes;

    switch (campo) {
      case 'Convidados':
        if (checked) {
          set_participantes(participantes + num_participante);
          set_pagantes(pagantes + num_pagante);
        } else {
          set_participantes(participantes - num_participante);
          set_pagantes(pagantes - num_pagante);
        }
        set_convidados(checked);
        break;
      case 'Clientes':
        checked
          ? set_participantes(participantes + num_cliente)
          : set_participantes(participantes - num_cliente);
        set_clientes(checked);
        break;
      case 'Coordenadores':
        checked
          ? set_participantes(participantes + num_coordenador)
          : set_participantes(participantes - num_coordenador);
        set_coordenadores(checked);
        break;
      case 'Batedores':
        checked
          ? set_participantes(participantes + num_batedor)
          : set_participantes(participantes - num_batedor);
        set_batedores(checked);
        break;
      case 'Motoristas':
        checked
          ? set_participantes(participantes + num_motorista)
          : set_participantes(participantes - num_motorista);
        set_motoristas(checked);
        break;
      case 'Interpretes':
        checked
          ? set_participantes(participantes + num_interprete)
          : set_participantes(participantes - num_interprete);
        set_interpretes(checked);
        break;
      default:
    }
  }, []);

  ////// ATUALIZA VALOR TOTAL
  const atualizaValorTotal = useCallback((qtd, dias, valorCliente) => {
    const valorTotal = (parseFloat(valorCliente) * parseInt(qtd, 10)) * parseInt(dias, 10);
    set_valor_total(formatCompleteZeros(valorTotal, 2));
  }, []);

  ////// ATUALIZA VALOR CLIENTE
  const atualizaValorCliente = useCallback((valor) => {
    /// CASO INCLUSÃO
    if (parseInt(idServico, 10) === 0) {
      set_valor_cliente(formatCompleteZeros(valor, 2));
    }
  }, [idServico]);

  ////// ATUALIZA VALOR VENTU (VALOR PRATICADO WS)
  const atualizaValorVentu = useCallback((valor, taxa) => {
    let valorFinal;

    if (parseFloat(taxa) === 0) {
      valorFinal = parseFloat(valor);
    } else {
      const valorVentu = ((parseFloat(valor) * parseFloat(taxa)) / 100) + parseFloat(valor);
      valorFinal = formatCompleteZeros(valorVentu, 2);
    }

    set_valor_praticado(valorFinal);
    atualizaValorCliente(valorFinal);
  }, [atualizaValorCliente]);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      handleSidebar(props.dispatch, props.sidebar);
      set_data(formatDataInput(getCurrentDate()));

      const fichaLocal = JSON.parse(localStorage.getItem('PROJETO_ORCAMENTO_FICHA'));
      const { des_calculado } = fichaLocal;

      des_calculado
        ? set_visibilityDesconto('')
        : set_visibilityDesconto('hide');

      handleFicha(idServico);

      setFirst(false);
    }
  }, [props, firstLoad, handleFicha, idServico]);

  ////// FICHA DATA
  useEffect(() => {
    const {
      id,
      //id_orcamento,
      id_servico,
      tipo_servico,
      servico,
      for_pessoa,
      //for_dpessoa,
      for_id_pfisica,
      for_id_pjuridica,
      for_nome_pessoa,
      //for_nome_pessoa2,
      descricao,
      desconto,
      id_moeda,
      moeda,
      cambio,
      data,
      dias,
      her_qtde,
      num_participante,
      num_pagante,
      her_convidado,
      her_cliente,
      her_coordenador,
      her_interprete,
      her_batedor,
      her_motorista,
      valor_unitario,
      tax_percentual,
      //tax_valor,
      valor_praticado,
      valor_calculado,
      valor_cliente,
      valor_total,
      //observacao,
      alt_dhsis,
    } = fichaData;

    if (id === undefined || parseInt(id, 10) === 0) { return; }

    set_id_rorcamento(id);
    set_descricao(descricao);

    set_pessoa(for_pessoa);

    switch (for_pessoa) {
      case 1:
        set_pfisica(for_nome_pessoa);
        set_id_pfisica(for_id_pfisica);
        set_id_fornecedor(for_id_pfisica);
        break;
      case 2:
        set_id_pjuridica(for_id_pjuridica);
        set_pjuridica(for_nome_pessoa);
        set_id_fornecedor(for_id_pjuridica);
        break;
      default:
    }

    set_moeda(moeda);
    set_id_moeda(id_moeda);
    set_cambio(cambio);

    set_tipo_servico(tipo_servico);
    set_servico(servico);
    set_id_servico(id_servico);

    set_lockQuantidade(her_qtde);

    her_qtde
      ? set_visibilityParticipantes('')
      : set_visibilityParticipantes('hide');

    her_qtde
      ? dispatch({ type: '@SET_SWITCH_CHECKED_TRUE' })
      : dispatch({ type: '@SET_SWITCH_CHECKED_FALSE' });

    set_participantes(num_participante);
    set_pagantes(num_pagante);

    set_convidados(her_convidado);
    set_coordenadores(her_coordenador);
    set_motoristas(her_motorista);
    set_clientes(her_cliente);
    set_batedores(her_batedor);
    set_interpretes(her_interprete);

    set_dias(dias);
    set_data(formatDataInput(data));

    set_desconto(desconto);

    set_valor_unitario(formatCompleteZeros(valor_unitario, 2));
    set_tax_percentual(tax_percentual);
    set_valor_calculado(valor_calculado);
    set_valor_praticado(formatCompleteZeros(valor_praticado, 2));
    set_valor_cliente(formatCompleteZeros(valor_cliente, 2));
    set_valor_total(formatCompleteZeros(valor_total, 2));
    setAlt_dhsis(alt_dhsis);
  }, [fichaData, dispatch]);

  ////// VISIBILITY PARTICIPANTES
  useEffect(() => {
    set_pagantes(0);
    set_participantes(0);

    switch (props.switchChecked) {
      case true:
        set_lockQuantidade(true);
        set_visibilityParticipantes('');
        break;
      case false:
        set_convidados(false);
        set_coordenadores(false);
        set_motoristas(false);
        set_clientes(false);
        set_batedores(false);
        set_interpretes(false);

        set_lockQuantidade(false);
        set_visibilityParticipantes('hide');
        break;
      default:
    }
  }, [props.switchChecked]);

  ////// ATUALIZA FORM
  useEffect(() => {
    const newForm = {
      id: idServico,
      id_orcamento: idOrcamento,
      id_servico,
      tipo_servico,
      for_pessoa: pessoa,
      for_id_pfisica: id_pfisica,
      for_id_pjuridica: id_pjuridica,
      descricao,
      desconto,
      id_moeda,
      moeda,
      cambio,
      data: formatData(data),
      dias,
      her_qtde: lockQuantidade,
      num_participante: participantes,
      num_pagante: pagantes,
      her_convidado: convidados,
      her_cliente: clientes,
      her_coordenador: coordenadores,
      her_interprete: interpretes,
      her_batedor: batedores,
      her_motorista: motoristas,
      valor_unitario,
      tax_percentual,
      //tax_valor,
      valor_praticado,
      //valor_calculado,
      valor_cliente,
      valor_total,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    };
    set_form(newForm);
  }, [props, id_rorcamento, descricao, pessoa, id_pfisica, pfisica, id_pjuridica, pjuridica,
    id_fornecedor, listaTipoServico, tipo_servico, id_servico, lockQuantidade,
    visibilityParticipantes, participantes, pagantes, convidados, coordenadores,
    motoristas, clientes, batedores, interpretes, dias, data, desconto, valor_unitario,
    tax_percentual, valor_praticado, valor_cliente, cambio, moeda, id_moeda, alt_dhsis,
    valor_total, idOrcamento, idServico]);

  ////// ATUALIZA VALOR VENTU E CLIENTE
  useEffect(() => {
    atualizaValorVentu(valor_unitario, tax_percentual);
  }, [valor_unitario, tax_percentual, atualizaValorVentu]);

  ////// ATUALIZA VALOR TOTAL
  useEffect(() => {
    atualizaValorTotal(participantes, dias, valor_cliente);
  }, [participantes, dias, valor_cliente, atualizaValorTotal]);

  ////// AUTO COMPLETAR
  useEffect(() => {
    if (AC_Id_Pfisica > 0) {
      set_pfisica(AC_Pfisica);
      set_id_pfisica(AC_Id_Pfisica);
    }
  }, [AC_Pfisica, AC_Id_Pfisica]);

  useEffect(() => {
    if (AC_Id_Pjuridica > 0) {
      set_pjuridica(AC_Pjuridica);
      set_id_pjuridica(AC_Id_Pjuridica);
    }
  }, [AC_Pjuridica, AC_Id_Pjuridica]);

  useEffect(() => {
    if (AC_Id_Moeda > 0) {
      set_moeda(AC_Moeda);
      set_id_moeda(AC_Id_Moeda);
    }
  }, [AC_Moeda, AC_Id_Moeda]);

  useEffect(() => {
    if (AC_Id_Servico > 0) {
      set_servico(AC_Servico);
      set_id_servico(AC_Id_Servico);
    }
  }, [AC_Servico, AC_Id_Servico]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle
          history={history}
          title="Projeto"
          subtitle="/ Orçamento"
          voltar
          linkTo={`/projeto/painel/${id_projeto}/orcamento/ficha/${idOrcamento}/servico`}
        />

        <TabsProjeto ativo={10} props={props} />

        <Row>
          <Col sm={12}>
            <Card>
              <CardBody className="pb-0">

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

                {/*** LINHA 02 - FORM ***/}
                <Row>
                  {/*** COLUNA 01 ***/}
                  <Col sm={10} md={9} className="pr-3">
                    <Row>
                      {/*** ID ***/}
                      <Col sm={1}>
                        <FormGroup>
                          <Label>Id</Label>
                          <Input
                            type="text"
                            role="contentinfo"
                            disabled
                            value={id_rorcamento}
                          />
                        </FormGroup>
                      </Col>

                      {/*** DESCRICAO ***/}
                      <Col sm={5}>
                        <FormGroup>
                          <Label>Descrição</Label>
                          <Input
                            type="text"
                            value={descricao}
                            onChange={(e) => set_descricao(e.target.value)}
                          />
                        </FormGroup>
                      </Col>

                      {/*** PESSOA ***/}
                      <Col sm={2}>
                        <FormGroup>
                          <Label>Pessoa</Label>
                          <Input
                            type="select"
                            className="required"
                            value={pessoa}
                            config={props}
                            onChange={(e) => set_pessoa(e.target.value)}
                          >
                            <option value="0">Selecione...</option>
                            <option value="1">FÍSICA</option>
                            <option value="2">JURÍDICA</option>
                          </Input>
                        </FormGroup>
                      </Col>

                      {/*** FORNECEDOR ***/}
                      <Col sm={4}>
                        <FormGroup>
                          <Label>Fornecedor</Label>
                          <AutoCompletarPessoa
                            {...props}
                            pessoa={pessoa}
                            editar={{
                              id: id_fornecedor,
                              pfisica: { id: id_pfisica, descricao: pfisica },
                              pjuridica: { id: id_pjuridica, descricao: pjuridica },
                            }}
                          />

                        </FormGroup>
                      </Col>

                      <Col sm={3} />

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

                      {/*** TIPO SERVICO ***/}
                      <Col sm={2}>
                        <FormGroup>
                          <Label>Tipo de Serviço</Label>
                          <Input
                            type="select"
                            className="required"
                            value={tipo_servico}
                            onChange={(e) => set_tipo_servico(e.target.value)}
                          >
                            <option value="0">Selecione...</option>

                            { !!listaTipoServico && listaTipoServico.map((item) => (
                              <option key={item.id} value={item.id}>{item.descricao}</option>
                            ))}

                          </Input>
                        </FormGroup>
                      </Col>

                      {/*** SERVICO ***/}
                      <Col sm={4}>
                        <FormGroup>
                          <Label>Serviço</Label>
                          <AutoCompletarV2
                            {...props}
                            value={servico}
                            valueId={id_servico}
                            tabela="RSERVICO"
                            campo={tipo_servico}
                            visible
                            required
                            editar={{ id: id_servico, value: servico, valueId: id_servico }}
                          />
                        </FormGroup>
                      </Col>

                      {/*** QUANTIDADE ***/}
                      <Col sm={5} className="orcamento-quantidade-container-externo">
                        {/*** PARTICIPANTES ***/}
                        <FormGroup>
                          <Label>Quantidade</Label>
                          <div className="orcamento-quantidade-container">
                            <ButtonSwitch {...props} opcao1="Edição livre" opcao2="Participantes" />
                            <Input
                              type="number"
                              value={participantes}
                              onChange={(e) => set_participantes(e.target.value)}
                              disabled={lockQuantidade}
                            />
                          </div>
                        </FormGroup>
                        {/*** PAGANTES ***/}
                        <FormGroup className="orcamento-pagantes">
                          <Label>Pagantes</Label>
                          <Input
                            type="number"
                            value={pagantes}
                            onChange={(e) => set_pagantes(e.target.value)}
                            disabled={lockQuantidade}
                          />
                        </FormGroup>
                      </Col>

                      {/*** PARTICIPANTES CONTAINER ***/}
                      <Col sm={4}>
                        <Row className="orcamento-participantes-container">
                          <div sm={4} className={visibilityParticipantes}>
                            <Checkbox
                              id="Convidados"
                              info="Convidados"
                              checked={convidados}
                              onClick={(e) => atualizaParticipantes(e.target.checked, 'Convidados', participantes, pagantes)}
                            />
                            <Checkbox
                              id="Clientes"
                              info="Clientes"
                              checked={clientes}
                              onClick={(e) => atualizaParticipantes(e.target.checked, 'Clientes', participantes, pagantes)}
                            />
                          </div>

                          <div sm={4} className={visibilityParticipantes}>
                            <Checkbox
                              id="Coordenadores"
                              info="Coordenadores"
                              checked={coordenadores}
                              onClick={(e) => atualizaParticipantes(e.target.checked, 'Coordenadores', participantes, pagantes)}
                            />
                            <Checkbox
                              id="Batedores"
                              info="Batedores"
                              checked={batedores}
                              onClick={(e) => atualizaParticipantes(e.target.checked, 'Batedores', participantes, pagantes)}
                            />
                          </div>

                          <div sm={4} className={visibilityParticipantes}>
                            <Checkbox
                              id="Motoristas"
                              info="Motoristas"
                              checked={motoristas}
                              onClick={(e) => atualizaParticipantes(e.target.checked, 'Motoristas', participantes, pagantes)}
                            />
                            <Checkbox
                              id="Interpretes"
                              info="Interpretes"
                              checked={interpretes}
                              onClick={(e) => atualizaParticipantes(e.target.checked, 'Interpretes', participantes, pagantes)}
                            />
                          </div>
                        </Row>
                      </Col>

                      {/*** DIAS E DATA ***/}
                      <Col sm={3} className="orcamento-servico-data-container ">
                        <FormGroup className="pr-4">
                          <Label>Total de Dias</Label>
                          <Input
                            type="number"
                            value={dias}
                            onChange={(e) => set_dias(e.target.value)}
                            style={{ width: 80 }}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>Data</Label>
                          <Input
                            type="date"
                            value={data}
                            onChange={(e) => set_data(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>

                  {/*** COLUNA 02 ***/}
                  <Col sm={2} md={3} className="border-left">
                    <Row>

                      {/*** DESCONTO ***/}
                      <Col sm={12} style={{ height: 40, paddingRight: 25 }}>
                        <FormGroup className={`${visibilityDesconto} text-right`}>
                          <Checkbox
                            info="Desconto"
                            checked={desconto}
                            onClick={(e) => set_desconto(e.target.checked)}
                          />
                        </FormGroup>
                      </Col>

                      {/*** VALOR UNITARIO ***/}
                      <TotaisOrcamento
                        key="Valor unitário"
                        title="Valor unitário"
                        type="number"
                        value={valor_unitario}
                        onChange={(e) => set_valor_unitario(e.target.value)}
                        //onChangeCapture={(e) => atualizaValorVentu(e.target.value, tax_percentual, participantes, dias)}
                        onBlur={(e) => set_valor_unitario(formatCompleteZeros(e.target.value, 2))}
                      />

                      {/*** TAXA ***/}
                      <TotaisOrcamento
                        key="Taxa"
                        title="Taxa (%)"
                        type="number"
                        min={0}
                        max={100}
                        value={tax_percentual}
                        onChange={(e) => set_tax_percentual(e.target.value)}
                        //onChangeCapture={(e) => atualizaValorVentu(valor_unitario, e.target.value, participantes, dias)}
                      />

                      {/*** VALOR VENTU - PRATICADO ***/}
                      <TotaisOrcamento
                        key="Valor Ventu"
                        title="Valor Ventu"
                        type="number"
                        disabled
                        value={valor_praticado}
                      />

                      {/*** VALOR CALCULADO ***/}
                      <TotaisOrcamento
                        key="Valor Calculado"
                        title="Valor Calculado"
                        type="number"
                        disabled
                        value={valor_calculado}
                      />

                      {/*** VALOR CLIENTE ***/}
                      <TotaisOrcamento
                        key="Valor Cliente"
                        title="Valor Cliente"
                        type="number"
                        value={valor_cliente}
                        onChange={(e) => set_valor_cliente(e.target.value)}
                        //onChangeCapture={(e) => atualizaValorTotal(participantes, dias, e.target.value)}
                        onBlur={(e) => set_valor_cliente(formatCompleteZeros(e.target.value, 2))}
                      />

                      {/*** VALOR TOTAL ***/}
                      <TotaisOrcamento
                        key="Total"
                        title="Total"
                        type="number"
                        value={valor_total}
                        disabled
                      />

                    </Row>
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

                {/*** LINHA 03 - SAVE ***/}
                <Row className="pt-4">
                  <SaveButton save={() => saveROrcamentoFicha(props, form)} />
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

  switchChecked: state.buttonSwitch.switchChecked,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  AC_Id_Pfisica: state.autoCompletar.autoCompletarId_Pfisica,
  AC_Id_Pjuridica: state.autoCompletar.autoCompletarId_Pjuridica,
  AC_Id_Moeda: state.autoCompletar.autoCompletarId_Moeda,
  AC_Id_Servico: state.autoCompletar.autoCompletarId_RServico,

  AC_Pfisica: state.autoCompletar.autoCompletarPfisica,
  AC_Pjuridica: state.autoCompletar.autoCompletarPjuridica,
  AC_Moeda: state.autoCompletar.autoCompletarMoeda,
  AC_Servico: state.autoCompletar.autoCompletarRServico,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(Orcamento);
