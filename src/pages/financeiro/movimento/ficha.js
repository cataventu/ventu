///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Checkbox, AutoCompletarV2, AutoCompletarPessoa, PageTitle, SaveButton,
} from '../../../components';
import { getMovimentoFicha, saveMovimento, getCambio } from '../../../functions/financeiro/movimento';
//import { getMovimentoFicha, saveMovimento } from '../../../functions/financeiro/movimento';
import {
  formatDecimal, getDados, formatData, formatDataInput, getCurrentDate, formatExibeValor, formatCompleteZeros,
} from '../../../functions/sistema';
//import { fichaData } from '../../../redux/initials/financeiro/movimento';

///////// FICHA /////////////////
/////////////////////////////////
function MovimentoFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const hoje = moment().format('L');

  const [id, setId] = useState(0);
  const [status, setStatus] = useState('');
  const [transacao, setTransacao] = useState(0);
  const [restrito, setRestrito] = useState(false);

  const [pessoa, setPessoa] = useState('');
  const [id_pfisica, setId_Pfisica] = useState(0);
  const [pfisica, setPfisica] = useState('');
  const [id_pjuridica, setId_Pjuridica] = useState(0);
  const [pjuridica, setPjuridica] = useState('');

  const [documento, setDocumento] = useState(0);
  const [ndocumento, setNdocumento] = useState('');
  const [dt_ocorrencia, setDt_ocorrencia] = useState('');
  const [dt_vencimento, setDt_vencimento] = useState('');
  const [dt_pagamento, setDt_pagamento] = useState('');

  const [id_projeto, setId_Projeto] = useState(0);
  const [projeto, setProjeto] = useState('');
  const [id_proservico, setId_proservico] = useState(0);
  const [proservico, setProservico] = useState('');
  const [colProservico, setColProservico] = useState('hide');

  const [id_conta, setId_conta] = useState(0);
  const [id_moeda, setId_moeda] = useState(0);
  const [moeda, setMoeda] = useState('');
  const [cambio, setCambio] = useState('1.0000');
  const [id_subgrupo, setId_SubGrupo] = useState(0);
  const [subgrupo, setSubGrupo] = useState('');
  const [valor_original, setValor_original] = useState('');
  const [tipo_negociacao, setTipo_negociacao] = useState('');
  const [valor_negociacaoHide, setValor_negociacaoHide] = useState('hide');
  const [valor_negociacao, setValor_negociacao] = useState('');
  const [valor_pago, setValor_pago] = useState('');
  const [forma, setForma] = useState('');
  const [nforma, setNforma] = useState('');
  const [cartaocorp, setCartaoCorp] = useState('');
  const [id_cartaocorp, setId_CartaoCorp] = useState('');
  const [descricao, setDescricao] = useState('');
  const [observacao, setObservacao] = useState('');
  const [status_movimento, setStatus_movimento] = useState([]);
  const [transacaoLista, setTransacaoLista] = useState([]);
  const [tipo_documento, setTipo_documento] = useState([]);
  const [contalista, setContaLista] = useState([]);
  const [tipo_negociacaolista, setTipo_negociacaoLista] = useState([]);
  const [tipo_forma, setTipo_forma] = useState([]);
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  const handleProservico = useCallback((value) => {
    setId_Projeto(value);
    if (value !== 0) {
      setColProservico('show');
    } else {
      setColProservico('hide');
    }
  }, []);

  const handleNegociacao = useCallback((value) => {
    setTipo_negociacao(value);
    if (value) {
      setValor_negociacaoHide('');
    } else {
      setValor_negociacaoHide('hide');
    }
  }, []);

  useEffect(() => {
    handleNegociacao(tipo_negociacao);
  }, [tipo_negociacao, handleNegociacao]);

  const atualizarDtPagamento = useCallback((status) => {
    if (status === '1' || status === '2' || status === 1 || status === 2) {
      setDt_pagamento(dt_vencimento);
      if (dt_vencimento === '') {
        setDt_pagamento(dt_ocorrencia);
        setDt_vencimento(dt_ocorrencia);
      }
    }
  }, [dt_vencimento, dt_ocorrencia]);

  const calculaValorPago = useCallback((tipo_negociacao, valor_original, valor_negociacao, operador) => {
    let valor = valor_original;
    let valor_N = valor_negociacao;
    let newValor_P;

    const tipo = parseInt(tipo_negociacao, 10);

    if (valor.length > 2 && valor.length <= 3) {
      valor = `${valor.slice(0, 1)}.${valor.slice(1, 3)}`;
    } else if (valor.length > 3) {
      valor = valor.replace('.', '');
      valor = `${valor.slice(0, valor.length - 2)}.${valor.slice(valor.length - 2, valor.length)}`;
    }

    if (valor_N.length > 2 && valor_N.length <= 3) {
      valor_N = `${valor_N.slice(0, 1)}.${valor_N.slice(1, 3)}`;
    } else if (valor_N.length > 3) {
      valor_N = valor_N.replace('.', '');
      valor_N = `${valor_N.slice(0, valor_N.length - 2)}.${valor_N.slice(valor_N.length - 2, valor_N.length)}`;
    }

    valor = parseFloat(valor);
    valor_N = parseFloat(valor_N);

    if (tipo > 0 && valor_N) {
      operador.forEach((item) => {
        if (item.id === tipo) {
          const formula = item.descricao;
          switch (formula) {
            case '1':
              newValor_P = parseFloat(valor + valor_N).toFixed(2);
              break;
            case '-1':
              newValor_P = parseFloat(valor - valor_N).toFixed(2);
              break;
            default:
          }
          if (!Number.isNaN(newValor_P)) { setValor_pago(newValor_P); }
        }
      });
    }
  }, []);

  /// FIRST LOAD
  useEffect(() => {
    const { id } = props.match.params;

    async function getTabelas() {
      await getDados(props, '/TsmSISTEMA/STATUS_MOVIMENTO_TABELA', '@GET_STATUS_MOVIMENTO');
      await getDados(props, '/TsmSISTEMA/TRANSACAO_TABELA', '@GET_TRANSACAO');
      await getDados(props, '/TsmSISTEMA/FORMA_TABELA/1', '@GET_TIPO_FORMA');
      await getDados(props, '/TsmCONTA/PESQUISA/', '@GET_CONTA_LISTA');
      await getDados(props, '/TsmSISTEMA/DOCUMENTO_TABELA/1', '@GET_TIPO_DOCUMENTO');
      //await getDados(props, '/TsmPROSERVICO/PESQUISA/', '@GET_PROSERVICO');
    }

    if (firstLoad) {
      setDt_ocorrencia(formatDataInput(getCurrentDate()));

      getTabelas();
      if (id > 0) {
        getMovimentoFicha(props, id);
      }
    }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    handleProservico(id_projeto);
  }, [id_projeto, handleProservico]);

  /// status
  useEffect(() => {
    const arrayStatus = [];
    props.status_movimento.forEach((item) => {
      arrayStatus.push(
        <option value={item.id}>
          {' '}
          {item.descricao}
        </option>,
      );
    });
    setStatus_movimento(arrayStatus);
  }, [props.status_movimento]);

  /// documento
  useEffect(() => {
    const arrayTipo_documento = [];
    props.tipo_documento.forEach((item) => {
      arrayTipo_documento.push(
        <option value={item.id}>
          {' '}
          {item.descricao}
        </option>,
      );
    });
    setTipo_documento(arrayTipo_documento);
  }, [props.tipo_documento]);

  /// tipo negociacao
  useEffect(() => {
    const arrayTipo_negociacaoLista = [];
    props.tipo_negociacao.forEach((item) => {
      arrayTipo_negociacaoLista.push(
        <option value={item.id}>
          {' '}
          {item.descricao}
        </option>,
      );
    });
    setTipo_negociacaoLista(arrayTipo_negociacaoLista);
  }, [props.tipo_negociacao]);

  /// transacao lista
  useEffect(() => {
    const arrayTransacaoLista = [];
    props.transacao.forEach((item) => {
      arrayTransacaoLista.push(
        <option value={item.id}>
          {' '}
          {item.descricao}
        </option>,
      );
    });
    setTransacaoLista(arrayTransacaoLista);
  }, [props.transacao]);

  /// conta lista
  useEffect(() => {
    const arrayContaLista = [];
    props.contaListaData.forEach((item) => {
      arrayContaLista.push(
        <option value={item.id}>
          {' '}
          {item.descricao}
        </option>,
      );
    });
    setContaLista(arrayContaLista);
  }, [props.contaListaData]);

  /// tipo forma lista
  useEffect(() => {
    const arrayTipo_forma = [];
    props.tipo_forma.forEach((item) => {
      arrayTipo_forma.push(
        <option value={item.id}>
          {' '}
          {item.descricao}
        </option>,
      );
    });
    setTipo_forma(arrayTipo_forma);
  }, [props.tipo_forma]);

  /// editar
  useEffect(() => {
    const {
      id, status, transacao, restrito, pessoa, id_pfisica, nome_pessoa, id_pjuridica, documento, ndocumento, id_proservico, proservico,
      dt_ocorrencia, id_cartaocorp, cartaocorp, dt_vencimento, dt_pagamento, id_projeto, projeto, id_conta, id_moeda, moeda, cambio, id_subgrupo, subgrupo, valor_original,
      tipo_negociacao, valor_negociacao, valor_pago, forma, nforma, descricao, observacao, alt_dhsis,
    } = props.fichaData;

    if (id > 0) {
      setId(id);
      setStatus(status);
      setTransacao(transacao);

      if (pessoa === 1) { setPfisica(nome_pessoa); }
      if (pessoa === 2) { setPjuridica(nome_pessoa); }

      setPessoa(pessoa);
      setId_Pfisica(id_pfisica);
      setId_Pjuridica(id_pjuridica);

      setId_CartaoCorp(id_cartaocorp);
      setCartaoCorp(cartaocorp);

      setRestrito(restrito);

      setDocumento(documento);
      setNdocumento(ndocumento);
      setDt_ocorrencia(formatDataInput(dt_ocorrencia));
      setDt_vencimento(formatDataInput(dt_vencimento));
      setDt_pagamento(formatDataInput(dt_pagamento));

      setId_Projeto(id_projeto);
      setProjeto(projeto);
      setId_proservico(id_proservico);
      setProservico(proservico);

      setId_conta(id_conta);
      setId_moeda(id_moeda);
      setMoeda(moeda);

      setCambio(formatCompleteZeros(cambio, 4));
      setId_SubGrupo(id_subgrupo);
      setSubGrupo(subgrupo);
      setValor_original(formatCompleteZeros(valor_original, 2));
      setTipo_negociacao(tipo_negociacao);
      setValor_negociacao(formatExibeValor(valor_negociacao));
      setValor_pago(formatExibeValor(valor_pago));
      setForma(forma);
      setNforma(nforma);
      setDescricao(descricao);
      setObservacao(observacao);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.fichaData]);

  /// autocompletar
  useEffect(() => {
    setId_proservico(props.autoCompletarId_Proservico);
  }, [props.autoCompletarId_Proservico]);

  useEffect(() => {
    setId_SubGrupo(props.autoCompletarId_SubGrupo);
  }, [props.autoCompletarId_SubGrupo]);

  useEffect(() => {
    setId_Pfisica(props.autoCompletarId_Pfisica);
  }, [props.autoCompletarId_Pfisica]);

  useEffect(() => {
    setId_Pjuridica(props.autoCompletarId_Pjuridica);
  }, [props.autoCompletarId_Pjuridica]);

  useEffect(() => {
    setId_Projeto(props.autoCompletarId_Projeto);
  }, [props.autoCompletarId_Projeto]);

  useEffect(() => {
    setId_CartaoCorp(props.autoCompletarId_CartaoCorp);
  }, [props.autoCompletarId_CartaoCorp]);

  /// ATUALIZA CAMBIO E MOEDA
  useEffect(() => {
    async function recebeCambio(id_conta) {
      if (id_conta) {
        const ficha = await getCambio(props, id_conta);
        const { id_moeda, moeda } = ficha;
        setId_moeda(id_moeda);
        setMoeda(moeda);
        /// atualiza cambio
        if (parseInt(id_moeda, 10) === 1) {
          setCambio('1.0000');
        }
      }
    }
    recebeCambio(id_conta);
  }, [props, id_conta]);

  /// REGRA ANTIGA: RECEBE CAMBIO DO DIA ATRAVES DA MOEDA
  /*
  useEffect(() => {
    async function recebeCambio() {
      if (id_conta && dt_ocorrencia) {
        const ficha = await getCambio(props, id_conta, dt_ocorrencia);
        const { id_moeda, moeda, cambio } = ficha;
        setId_moeda(id_moeda);
        setMoeda(moeda);
        setCambio(cambio);
      }
    }
    recebeCambio();
  }, [props, id_conta]);
  */

  /// salvar
  useEffect(() => {
    let tempId_Pfisica = 0;
    let tempId_juridica = 0;
    let tempCambio = 0;

    if (parseInt(pessoa, 10) === 1) { tempId_Pfisica = id_pfisica; }
    if (parseInt(pessoa, 10) === 2) { tempId_juridica = id_pjuridica; }

    if (parseInt(id_moeda, 10) === 1) {
      tempCambio = '1.0000';
    } else {
      tempCambio = cambio;
    }

    setForm({
      id,
      status,
      transacao,
      restrito,
      pessoa,
      id_pfisica: tempId_Pfisica,
      id_pjuridica: tempId_juridica,
      documento,
      ndocumento,
      dt_ocorrencia: formatData(dt_ocorrencia),
      dt_vencimento: formatData(dt_vencimento),
      dt_pagamento: formatData(dt_pagamento),
      id_projeto,
      id_proservico,
      id_conta,
      id_moeda,
      id_cartaocorp,

      cambio: tempCambio,
      id_subgrupo,
      valor_original,
      tipo_negociacao,
      valor_negociacao,
      valor_pago,
      forma,
      nforma,
      descricao,
      observacao,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, status, transacao, restrito, pessoa, id_pfisica, id_pjuridica, documento, ndocumento,
    dt_ocorrencia, dt_vencimento, dt_pagamento,
    id_projeto, id_proservico, id_conta, id_moeda, cambio, id_subgrupo,
    valor_original, tipo_negociacao, valor_negociacao, valor_pago, id_cartaocorp,
    forma, nforma, descricao, observacao, alt_dhsis, props.user.id, props.autoCompletarId_Proservico]);

  /// calculaValorPagi
  useEffect(() => {
    calculaValorPago(tipo_negociacao, valor_original, valor_negociacao, props.tipo_negociacao_ope);
  }, [calculaValorPago, tipo_negociacao, valor_original, valor_negociacao, props.tipo_negociacao_ope]);

  return (
    <Container fluid className="p-0">
      <PageTitle
        history={props.history}
        title="Movimento"
        subtitle="/ Cadastrar"
        voltar
        linkTo="/financeiro/movimento"
      />
      <Card>
        <CardBody className="pb-0">
          {/*** LINHA 01 ***/}
          <Row>
            {/*** ID ***/}
            <Col sm={2} md={2} lg={1} xl={1}>
              <FormGroup>
                <Label>Id</Label>
                <Input
                  type="text"
                  disabled
                  value={id}
                />
              </FormGroup>
            </Col>
            {/*** STATUS ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Status</Label>
                <Input
                  type="select"
                  className="required"
                  value={status}
                  dados={props.status}
                  config={props}
                  action="@GET_STATUS_MOVIMENTO"
                  onChange={(e) => setStatus(e.target.value)}
                  onChangeCapture={(e) => atualizarDtPagamento(e.target.value)}
                >
                  <option value="0">Selecione...</option>
                  {status_movimento}
                </Input>
              </FormGroup>
            </Col>
            {/*** TRANSACAO ***/}
            <Col sm={3} md={2} lg={2} xl={2}>
              <FormGroup>
                <Label>Transação</Label>
                <Input
                  type="select"
                  className="required"
                  value={transacao}
                  dados={props.transacao}
                  config={props}
                  action="@GET_TRANSACAO"
                  onChange={(e) => setTransacao(e.target.value)}
                >
                  <option value="0">Selecione...</option>
                  {transacaoLista}
                </Input>
              </FormGroup>
            </Col>
            {/*** DESCRICAO ***/}
            <Col sm={3} md={4} lg={5} xl={5}>
              <FormGroup>
                <Label>Descrição</Label>
                <Input
                  type="text"
                  maxLength={60}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** RESTRITO ***/}
            <Col sm={1} md={1} lg={2} xl={2}>
              <FormGroup className="text-right">
                <Label>&nbsp;</Label>
                <Checkbox
                  info="Restrito"
                  checked={restrito}
                  onClick={(e) => setRestrito(e.target.checked)}
                />
              </FormGroup>
            </Col>
          </Row>
          {/*** LINHA 02 ***/}
          <Row>
            {/*** PESSOA ***/}
            <Col sm={4} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Pessoa</Label>
                <Input
                  type="select"
                  className="required"
                  value={pessoa}
                  config={props}
                  onChange={(e) => setPessoa(e.target.value)}
                >
                  <option value="0">Selecione...</option>
                  <option value="1">FÍSICA</option>
                  <option value="2">JURÍDICA</option>
                </Input>
              </FormGroup>
            </Col>
            {/*** CONTATO ***/}
            <Col sm={8} md={5} lg={4} xl={4}>
              <FormGroup>
                <Label>Contato</Label>
                <AutoCompletarPessoa
                  {...props}
                  pessoa={pessoa}
                  editar={{
                    id,
                    pfisica: { id: id_pfisica, descricao: pfisica },
                    pjuridica: { id: id_pjuridica, descricao: pjuridica },
                  }}
                />
              </FormGroup>
            </Col>
            {/*** ESPAÇO VAZIO ***/}
            <Col sm={4} md={4} lg={2} xl={2} />
            {/*** DOCUMENTO ***/}
            <Col sm={4} md={4} lg={2} xl={2}>
              <FormGroup>
                <Label>Documento</Label>
                <Input
                  type="select"
                  className="required"
                  value={documento}
                  dados={props.tipo_documento}
                  config={props}
                  action="@GET_TIPO_DOCUMENTO"
                  onChange={(e) => setDocumento(e.target.value)}
                >
                  <option value="0">Selecione...</option>
                  {tipo_documento}
                </Input>
              </FormGroup>
            </Col>
            {/*** NUM DOCUMENTO ***/}
            <Col sm={4} md={4} lg={2} xl={2}>
              <FormGroup>
                <Label>Número Documento</Label>
                <Input
                  type="text"
                  value={ndocumento}
                  maxLength={10}
                  onChange={(e) => setNdocumento(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <hr />
          {/*** LINHA 03 ***/}
          <Row>
            {/*** DATA OCORRENCIA ***/}
            <Col sm={4} md={4} lg={3} xl={2}>
              <FormGroup>
                <Label>Data Ocorrência</Label>
                <Input
                  type="date"
                  className="required"
                  value={dt_ocorrencia}
                  onChange={(e) => setDt_ocorrencia(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** DATA VENCIMENTO ***/}
            <Col sm={4} md={4} lg={3} xl={2}>
              <FormGroup>
                <Label>Data Vencimento</Label>
                <Input
                  type="date"
                  className="required"
                  value={dt_vencimento}
                  onChange={(e) => setDt_vencimento(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** DATA PAGAMENTO ***/}
            <Col sm={4} md={4} lg={3} xl={2}>
              <FormGroup>
                <Label>Data Pagamento</Label>
                <Input
                  type="date"
                  value={dt_pagamento}
                  onChange={(e) => setDt_pagamento(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** ESPACO VAZIO ***/}
            <Col sm={0} md={0} lg={3} xl={6} />
            {/*** PROJETO ***/}
            <Col sm={6} md={6} lg={3} xl={3}>
              <FormGroup>
                <Label>Projeto</Label>
                <AutoCompletarV2
                  {...props}
                  value={projeto}
                  valueId={id_projeto}
                  tabela="PROJETO"
                  campo=""
                  disabled={false}
                  visible
                  editar={{ id, value: projeto, valueId: id_projeto }}
                />
              </FormGroup>
            </Col>
            {/*** PROSERVICO ***/}
            <Col sm={6} md={6} lg={3} xl={3} className={colProservico}>
              <FormGroup>
                <Label>Serviço</Label>
                <AutoCompletarV2
                  {...props}
                  value={proservico}
                  valueId={id_proservico}
                  tabela="PROSERVICO"
                  campo={id_projeto}
                  disabled={false}
                  visible
                  editar={{ id, value: proservico, valueId: id_proservico }}
                />
              </FormGroup>
            </Col>
          </Row>
          <hr />
          {/*** LINHA 04 ***/}
          <Row>
            {/*** CONTA ***/}
            <Col sm={7} md={4} lg={4} xl={4}>
              <FormGroup>
                <Label>Conta</Label>
                <Input
                  type="select"
                  className="required"
                  value={id_conta}
                  dados={props.contaListaData}
                  config={props}
                  action="@GET_CONTA_LISTA"
                  onChange={(e) => setId_conta(e.target.value)}
                >
                  <option value="0">Selecione...</option>
                  {contalista}
                </Input>
              </FormGroup>
            </Col>
            {/*** MOEDA ***/}
            <Col sm={2} md={2} lg={1} xl={1}>
              <FormGroup>
                <Label>Moeda</Label>
                <Input
                  type="hidden"
                  disabled
                  id="movimento-ficha-moeda-id"
                  value={id_moeda}

                />
                <Input
                  type="text"
                  id="movimento-ficha-moeda"
                  disabled
                  value={moeda}
                />
              </FormGroup>
            </Col>
            {/*** CAMBIO ***/}
            <Col sm={3} md={2} lg={2} xl={2}>
              <FormGroup>
                <Label>Câmbio</Label>
                <Input
                  type="text"
                  value={cambio}
                  placeholder="0.0000"
                  id="movimento-ficha-cambio"
                  onChange={(e) => setCambio(e.target.value)}
                  onBlur={(e) => setCambio(formatCompleteZeros(e.target.value, 4))}
                />
              </FormGroup>
            </Col>
            {/*** SUBGRUPO ***/}
            <Col sm={12} md={8} lg={5} xl={5}>
              <FormGroup>
                <Label>Grupo</Label>
                <AutoCompletarV2
                  {...props}
                  value={subgrupo}
                  valueId={id_subgrupo}
                  tabela="SUBGRUPO"
                  required
                  campo=""
                  disabled={false}
                  visible
                  editar={{ id, value: subgrupo, valueId: id_subgrupo }}
                />
              </FormGroup>
            </Col>
          </Row>
          <hr />
          {/*** LINHA 05 ***/}
          <Row>
            {/*** VALOR ***/}
            <Col sm={4} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Valor</Label>
                <Input
                  type="number"
                  className="required"
                  value={valor_original}
                  onChange={(e) => setValor_original(formatDecimal(e.target.value, 2))}
                />
              </FormGroup>
            </Col>
            {/*** ESPAÇO VAZIO ***/}
            <Col sm={8} md={9} lg={4} xl={4} />
            {/*** TIPO NEGOCIACAO ***/}
            <Col sm={4} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Tipo Negociação</Label>
                <Input
                  type="select"
                  value={tipo_negociacao}
                  dados={props.tipo_negociacao}
                  config={props}
                  action="@GET_TIPO_NEGOCIACAO"
                  onChange={(e) => setTipo_negociacao(e.target.value)}
                  onChangeCapture={(e) => handleNegociacao(e.target.value)}
                >
                  <option value="0">Selecione...</option>
                  {tipo_negociacaolista}
                </Input>
              </FormGroup>
            </Col>
            {/*** VALOR NEGOCIACAO ***/}
            <Col sm={4} md={3} lg={2} xl={2}>
              <FormGroup className={valor_negociacaoHide}>
                <Label>Valor Negociação</Label>
                <Input
                  type="number"
                  value={valor_negociacao}
                  onChange={(e) => setValor_negociacao(formatDecimal(e.target.value, 2))}
                />
              </FormGroup>
            </Col>
            {/*** VALOR PAGO ***/}
            <Col sm={4} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Valor Pago</Label>
                <Input
                  type="text"
                  disabled
                  value={valor_pago}
                />
              </FormGroup>
            </Col>
          </Row>
          <hr />
          {/*** LINHA 06 ***/}
          <Row>
            {/*** FORMA ***/}
            <Col sm={4} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Forma</Label>
                <Input
                  type="select"
                  className="required"
                  value={forma}
                  dados={props.tipo_forma}
                  config={props}
                  onChange={(e) => setForma(e.target.value)}
                >
                  <option value="0">Selecione...</option>
                  {tipo_forma}
                </Input>
              </FormGroup>
            </Col>
            {/*** NUMERO ***/}
            <Col sm={4} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Número</Label>
                <Input
                  type="text"
                  value={nforma}
                  onChange={(e) => setNforma(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** VAZIO ***/}
            <Col sm={4} md={6} lg={4} xl={4} />
            {/*** CARTAO CORP ***/}
            <Col sm={8} md={6} lg={4} xl={4}>
              <FormGroup>
                <Label>Cartão Corporativo</Label>
                <AutoCompletarV2
                  {...props}
                  value={cartaocorp}
                  valueId={id_cartaocorp}
                  tabela="CARTAOCORP"
                  campo=""
                  disabled={false}
                  visible
                  editar={{ id, value: cartaocorp, valueId: id_cartaocorp }}
                />
              </FormGroup>
            </Col>
          </Row>
          <hr />
          {/*** LINHA 07 ***/}
          <Row>
            {/*** OBSERVACAO ***/}
            <Col sm={12}>
              <FormGroup>
                <Label>Observação</Label>
                <Input
                  type="textarea"
                  className="obs"
                  maxLength={480}
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** ALT DHSIS ***/}
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
            {/*** SAVE ***/}
            <SaveButton save={() => saveMovimento(props, form)} />
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  tipo_forma: state.sistema.tipo_forma,
  tipo_negociacao: state.sistema.tipo_negociacao,
  tipo_negociacao_ope: state.sistema.tipo_negociacao_operador,
  transacao: state.sistema.transacao,
  status_movimento: state.sistema.status_movimento,
  tipo_documento: state.sistema.tipo_documento,

  grupoListaData: state.grupo.grupoListaData,
  subgrupoListaData: state.subgrupo.subgrupoListaData,
  contaListaData: state.conta.contaListaData,

  fichaData: state.movimento.fichaData,

  visibilityPageFinanceiro: state.usuario.visibilityPageFinanceiro,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  autoCompletarId_CartaoCorp: state.autoCompletar.autoCompletarId_CartaoCorp,

  autoCompletarId_Pfisica: state.autoCompletar.autoCompletarId_Pfisica,
  autoCompletarId_Pjuridica: state.autoCompletar.autoCompletarId_Pjuridica,

  autoCompletarId_Proservico: state.autoCompletar.autoCompletarId_Proservico,
  autoCompletarId_Projeto: state.autoCompletar.autoCompletarId_Projeto,
  autoCompletarId_SubGrupo: state.autoCompletar.autoCompletarId_SubGrupo,
});
export default connect(() => (mapState))(MovimentoFicha);
