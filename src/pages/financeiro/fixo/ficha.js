///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  AutoCompletarPessoa, AutoCompletarV2, Checkbox, PageTitle, SaveButton,
} from '../../../components';
import { getFixoFicha, saveFixo } from '../../../functions/financeiro/fixo';
import { formatDecimal, getDados, formatDataInput } from '../../../functions/sistema';

function FixoFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const hoje = moment().format('L');

  const [id, setId] = useState(0);
  const [transacao, setTransacao] = useState('');

  const [pessoa, setPessoa] = useState('');
  const [id_pfisica, setId_Pfisica] = useState(0);
  const [id_pjuridica, setId_Pjuridica] = useState(0);
  const [pfisica, setPfisica] = useState('');
  const [pjuridica, setPjuridica] = useState('');

  const [restrito, setRestrito] = useState(false);
  const [dia_vencimento, setDia_vencimento] = useState('');
  const [limitada, setLimitada] = useState(false);
  const [limitadaHide, setLimitadaHide] = useState('hide');
  const [mes_perini, setMes_perini] = useState('');
  const [mes_perfim, setMes_perfim] = useState('');
  const [ano_perini, setAno_perini] = useState('');
  const [ano_perfim, setAno_perfim] = useState('');
  const [subgrupo, setSubGrupo] = useState('');
  const [id_subgrupo, setId_SubGrupo] = useState(0);
  const [id_conta, setId_Conta] = useState(0);
  const [id_moeda, setId_Moeda] = useState(0);
  const [valor, setValor] = useState('');
  const [cambio, setCambio] = useState('');
  const [forma, setForma] = useState('');
  const [nforma, setNforma] = useState('');
  const [descricao, setDescricao] = useState('');
  const [id_cartaocorp, setId_CartaoCorp] = useState(0);
  const [cartaocorp, setCartaocorp] = useState('');
  const [observacao, setObservacao] = useState('');
  const [moedalista, setMoedaLista] = useState([]);
  const [transacaolista, setTransacaoLista] = useState([]);
  const [contalista, setContaLista] = useState([]);
  const [formalista, setFormaLista] = useState([]);
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  const handleLimitada = useCallback((value) => {
    setLimitada(value);

    if (value) {
      setLimitadaHide('');
    } else {
      setLimitadaHide('hide');
    }
  }, []);

  useEffect(() => {
    const { id } = props.match.params;
    if (firstLoad) {
      getDados(props, '/TsmMOEDA/PESQUISA/DESCRICAO', '@GET_MOEDA_LISTA');
      getDados(props, '/TsmSISTEMA/TRANSACAO_TABELA/', '@GET_TRANSACAO');
      getDados(props, '/TsmCONTA/PESQUISA/', '@GET_CONTA_LISTA');
      getDados(props, '/TsmSISTEMA/FORMA_TABELA/1', '@GET_TIPO_FORMA');
      if (id > 0) { getFixoFicha(props, id); }
    }
    setFirst(false);
  }, [props, firstLoad]);

  //EDITAR
  useEffect(() => {
    const {
      id, transacao, pessoa, id_pfisica, nome_pessoa, id_pjuridica, restrito, dia_vencimento,
      limitada, lim_perini, lim_perfim, subgrupo, id_subgrupo, id_conta, id_moeda,
      valor, cambio, forma, nforma, descricao, id_cartaocorp, cartaocorp, observacao, alt_dhsis,
    } = props.fichaData;

    if (id > 0) {
      setId(id);
      setTransacao(transacao);

      if (pessoa === 1) { setPfisica(nome_pessoa); }
      if (pessoa === 2) { setPjuridica(nome_pessoa); }

      setPessoa(pessoa);
      setId_Pfisica(id_pfisica);
      setId_Pjuridica(id_pjuridica);

      setRestrito(restrito);
      setDia_vencimento(dia_vencimento);

      setLimitada(limitada);
      setMes_perini(lim_perini.slice(4, 6));
      setMes_perfim(lim_perfim.slice(4, 6));
      setAno_perini(lim_perini.slice(0, 4));
      setAno_perfim(lim_perfim.slice(0, 4));

      setSubGrupo(subgrupo);
      setId_SubGrupo(id_subgrupo);
      setId_Conta(id_conta);
      setId_Moeda(id_moeda);
      setValor(valor);
      setCambio(cambio);
      setForma(forma);
      setNforma(nforma);
      setDescricao(descricao);
      setId_CartaoCorp(id_cartaocorp);
      setCartaocorp(cartaocorp);
      setObservacao(observacao);

      handleLimitada(limitada);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.fichaData, handleLimitada]);

  //moeda lista
  useEffect(() => {
    const arrayMoedaLista = [];
    props.moedaListaData.forEach((item) => {
      arrayMoedaLista.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });
    setMoedaLista(arrayMoedaLista);
  }, [props.moedaListaData]);

  //trasacao lista
  useEffect(() => {
    const arrayTransacaoLista = [];
    props.transacao.forEach((item) => {
      arrayTransacaoLista.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });
    setTransacaoLista(arrayTransacaoLista);
  }, [props.transacao]);

  //conta lista
  useEffect(() => {
    const arrayContaLista = [];
    props.contaListaData.forEach((item) => {
      arrayContaLista.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });
    setContaLista(arrayContaLista);
  }, [props.contaListaData]);

  //tipo forma lista
  useEffect(() => {
    const arrayFormaLista = [];
    props.tipo_forma.forEach((item) => {
      arrayFormaLista.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });
    setFormaLista(arrayFormaLista);
  }, [props.tipo_forma]);

  //autocompletar subgrupo
  useEffect(() => {
    setId_SubGrupo(props.autoCompletarId_SubGrupo);
  }, [props.autoCompletarId_SubGrupo]);

  //autocompletar contato
  useEffect(() => {
    setId_Pfisica(props.autoCompletarId_Pfisica);
  }, [props.autoCompletarId_Pfisica]);

  useEffect(() => {
    setId_Pjuridica(props.autoCompletarId_Pjuridica);
  }, [props.autoCompletarId_Pjuridica]);

  useEffect(() => {
    setId_CartaoCorp(props.autoCompletarId_CartaoCorp);
  }, [props.autoCompletarId_CartaoCorp]);

  /// salvar
  useEffect(() => {
    let tempId_Pfisica = 0;
    let tempId_juridica = 0;

    if (parseInt(pessoa, 10) === 1) { tempId_Pfisica = id_pfisica; }
    if (parseInt(pessoa, 10) === 2) { tempId_juridica = id_pjuridica; }

    setForm({
      id,
      transacao,
      pessoa,
      id_pfisica: tempId_Pfisica,
      id_pjuridica: tempId_juridica,
      restrito,
      dia_vencimento,

      limitada,
      lim_perini: ano_perini + mes_perini,
      lim_perfim: ano_perfim + mes_perfim,

      id_subgrupo,
      id_conta,
      id_moeda,
      valor,
      cambio,
      forma,
      nforma,
      descricao,
      id_cartaocorp,
      observacao,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, transacao, pessoa, id_pfisica, id_pjuridica, pfisica, pjuridica, restrito, dia_vencimento,
    limitada, id_subgrupo, id_conta, id_moeda, valor, cambio, ano_perini, ano_perfim, mes_perini, mes_perfim,
    forma, nforma, descricao, id_cartaocorp, observacao, alt_dhsis, props.user.id, props.autoCompletarMunicipio]);

  return (
    <Container fluid className="p-0">
      <PageTitle history={props.history} title="Fixo" subtitle="/ Cadastrar" voltar />
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
            {/*** TRANSACAO ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
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
                  {transacaolista}
                </Input>
              </FormGroup>
            </Col>
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
            <Col sm={8} md={3} lg={4} xl={4}>
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
            {/*** RESTRITO ***/}
            <Col sm={1} md={1} lg={1} xl={1}>
              <FormGroup className="text-right">
                <Label>Restrito</Label>
                <Checkbox
                  checked={restrito}
                  onClick={(e) => setRestrito(e.target.checked)}
                />
              </FormGroup>
            </Col>
          </Row>
          {/*** LINHA 02 ***/}
          <Row>
            {/*** DIA VENCIMENTO ***/}
            <Col sm={1} md={1} lg={1} xl={1}>
              <FormGroup>
                <Label>Dia Vencimento</Label>

                <Input
                  type="text"
                  className="required"
                  maxLength={2}
                  value={dia_vencimento}
                  onChange={(e) => setDia_vencimento(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** LIMITADA ***/}
            <Col sm={2} md={2} lg={2} xl={2}>
              <FormGroup className="text-right">
                <Label>Limitada</Label>
                <Checkbox
                  checked={limitada}
                  onClick={(e) => handleLimitada(e.target.checked)}
                />
              </FormGroup>
            </Col>

            <Col sm={2} md={2} lg={2} xl={2} className={limitadaHide}>
              <FormGroup>
                <Label>Mês Inicio</Label>
                <Input
                  type="select"
                  value={mes_perini}
                  onChange={(e) => setMes_perini(e.target.value)}
                  onChangeCapture={(e) => handleLimitada(e.target.value)}
                >
                  <option value="00">Selecione...</option>
                  <option value="01">JANEIRO</option>
                  <option value="02">FEVEREIRO</option>
                  <option value="03">MARÇO</option>
                  <option value="04">ABRIL</option>
                  <option value="05">MAIO</option>
                  <option value="06">JUNHO</option>
                  <option value="07">JULHO</option>
                  <option value="08">AGOSTO</option>
                  <option value="09">SETEMBRO</option>
                  <option value="10">OUTUBRO</option>
                  <option value="11">NOVEMBRO</option>
                  <option value="12">DEZEMBRO</option>
                </Input>
              </FormGroup>
            </Col>

            <Col sm={2} md={2} lg={1} xl={1} className={limitadaHide}>
              <FormGroup>
                <Label>Ano Inicio</Label>
                <Input
                  type="text"
                  maxLength={4}
                  value={ano_perini}
                  onChange={(e) => setAno_perini(e.target.value)}
                  onChangeCapture={(e) => handleLimitada(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col sm={2} md={2} lg={2} xl={2} className={limitadaHide}>
              <FormGroup>
                <Label>Mês Fim</Label>
                <Input
                  type="select"
                  value={mes_perfim}
                  onChange={(e) => setMes_perfim(e.target.value)}
                  onChangeCapture={(e) => handleLimitada(e.target.value)}
                >
                  <option value="00">Selecione...</option>
                  <option value="01">JANEIRO</option>
                  <option value="02">FEVEREIRO</option>
                  <option value="03">MARÇO</option>
                  <option value="04">ABRIL</option>
                  <option value="05">MAIO</option>
                  <option value="06">JUNHO</option>
                  <option value="07">JULHO</option>
                  <option value="08">AGOSTO</option>
                  <option value="09">SETEMBRO</option>
                  <option value="10">OUTUBRO</option>
                  <option value="11">NOVEMBRO</option>
                  <option value="12">DEZEMBRO</option>
                </Input>
              </FormGroup>
            </Col>

            <Col sm={2} md={2} lg={1} xl={1} className={limitadaHide}>
              <FormGroup>
                <Label> Ano Fim</Label>
                <Input
                  type="text"
                  maxLength={4}
                  value={ano_perfim}
                  onChange={(e) => setAno_perfim(e.target.value)}
                  onChangeCapture={(e) => handleLimitada(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          {/*** LINHA 03 ***/}
          <hr marginLeft={50} />
          <Row>
            {/*** SUBGRUPO ***/}
            <Col sm={6} md={6} lg={6} xl={6}>
              <FormGroup>
                <Label>Grupo</Label>
                <AutoCompletarV2
                  {...props}
                  value={subgrupo}
                  valueId={id_subgrupo}
                  tabela="SUBGRUPO"
                  campo=""
                  disabled={false}
                  visible
                  editar={{ id, value: subgrupo, valueId: id_subgrupo }}
                />
              </FormGroup>
            </Col>
          </Row>
          {/*** LINHA 04 ***/}
          <Row>
            {/*** CONTA ***/}
            <Col sm={3} md={3} lg={4} xl={3}>
              <FormGroup>
                <Label>Conta</Label>
                <Input
                  type="select"
                  className="required"
                  value={id_conta}
                  dados={props.contaListaData}
                  config={props}
                  action="@GET_CONTA_LISTA"
                  onChange={(e) => setId_Conta(e.target.value)}
                >
                  <option value="0">Selecione...</option>
                  { contalista }
                </Input>
              </FormGroup>
            </Col>
            {/*** MOEDA ***/}
            <Col sm={3} md={3} lg={3} xl={3}>
              <FormGroup>
                <Label>Moeda</Label>
                <Input
                  type="select"
                  className="required"
                  value={id_moeda}
                  dados={props.moedaListaData}
                  config={props}
                  action="@GET_MOEDA_LISTA"
                  onChange={(e) => setId_Moeda(e.target.value)}
                >
                  <option value="0">Selecione...</option>
                  {moedalista}
                </Input>
              </FormGroup>
            </Col>
            {/*** VALOR ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Valor</Label>
                <Input
                  type="number"
                  className="required"
                  value={valor}
                  onChange={(e) => setValor(formatDecimal(e.target.value, 2))}
                />
              </FormGroup>
            </Col>
            {/*** CAMBIO ***/}
            <Col sm={3} md={3} lg={2} xl={1}>
              <FormGroup>
                <Label>Câmbio</Label>
                <Input
                  type="text"
                  value={cambio}
                  onChange={(e) => setCambio(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          {/*** LINHA 05***/}
          <hr marginLeft={50} />
          <Row>
            {/*** FORMA PGTO ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Forma</Label>
                <Input
                  type="select"
                  className="required"
                  value={forma}
                  dados={props.tipo_forma}
                  config={props}
                  action="@GET_FORMA_LISTA"
                  onChange={(e) => setForma(e.target.value)}
                >
                  <option value="0">Selecione...</option>
                  {formalista}
                </Input>
              </FormGroup>
            </Col>
            {/*** NUMERO ***/}
            <Col sm={2} md={2} lg={1} xl={1}>
              <FormGroup>
                <Label>Número</Label>
                <Input
                  type="text"
                  maxLength={20}
                  value={nforma}
                  onChange={(e) => setNforma(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** DESCRICAO ***/}
            <Col sm={6} md={6} lg={5} xl={5}>
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
            {/*** CARTAO CORP ***/}
            <Col sm={6} md={6} lg={4} xl={4}>
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
          {/*** LINHA 06 ***/}
          <Row>
            {/*** OBSERVAÇÃO ***/}
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
            {/*** DATA ***/}
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
            <SaveButton save={() => saveFixo(props, form)} />
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
  transacao: state.sistema.transacao,
  mes: state.sistema.mes,

  contaListaData: state.conta.contaListaData,
  moedaListaData: state.moeda.moedaListaData,

  fichaData: state.fixo.fichaData,

  autoCompletarId_CartaoCorp: state.autoCompletar.autoCompletarId_CartaoCorp,

  autoCompletarId_SubGrupo: state.autoCompletar.autoCompletarId_SubGrupo,
  autoCompletarId_Pfisica: state.autoCompletar.autoCompletarId_Pfisica,
  autoCompletarId_Pjuridica: state.autoCompletar.autoCompletarId_Pjuridica,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(FixoFicha);
