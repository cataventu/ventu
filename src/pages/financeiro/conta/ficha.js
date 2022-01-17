///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  PageTitle, SaveButton, Checkbox, AutoCompletarV2,
} from '../../../components';
import { getContaFicha, saveConta } from '../../../functions/financeiro/conta';
import { getDados, formatDataInput } from '../../../functions/sistema';

function ContaFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const hoje = moment().format('L');

  const [id, setId] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [id_moeda, setId_Moeda] = useState(0);
  const [moeda, setMoeda] = useState('');
  const [tipo, setTipo] = useState('');
  const [banco_numero, setBanco_numero] = useState('');
  const [banco_nome, setBanco_nome] = useState('');
  const [agencia, setAgencia] = useState('');
  const [agencia_dv, setAgencia_dv] = useState('');
  const [conta, setConta] = useState('');
  const [conta_dv, setConta_dv] = useState('');
  const [situacao, setSituacao] = useState(true);
  const [padrao, setPadrao] = useState(false);
  const [tipoconta, setTipoconta] = useState([]);
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  useEffect(() => {
    const { id } = props.match.params;
    setId_Moeda(props.autoCompletarId_Moeda);

    if (firstLoad) {
      getDados(props, '/TsmCONTA/PESQUISA/', '@GET_CONTA_LISTA');

      if (id > 0) { getContaFicha(props, id); }
    }
    setFirst(false);
  }, [props, props.autoCompletarId_Moeda, firstLoad]);

  useEffect(() => {
    const {
      id, descricao, id_moeda, moeda, tipo, banco_numero, banco_nome, agencia, agencia_dv, conta, conta_dv, padrao, situacao, alt_dhsis,
    } = props.fichaData;
    if (id > 0) {
      setId(id);
      setDescricao(descricao);
      setId_Moeda(id_moeda);
      setMoeda(moeda);
      setTipo(tipo);
      setBanco_numero(banco_numero);
      setBanco_nome(banco_nome);
      setAgencia(agencia);
      setAgencia_dv(agencia_dv);
      setConta(conta);
      setConta_dv(conta_dv);
      setPadrao(padrao);
      setSituacao(situacao);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.fichaData]);

  useEffect(() => {
    setForm({
      id,
      descricao,
      id_moeda,
      moeda,
      tipo,
      banco_numero,
      banco_nome,
      agencia,
      agencia_dv,
      conta,
      conta_dv,
      padrao,
      situacao,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, descricao, id_moeda, moeda, tipo, banco_nome, banco_numero, agencia, agencia_dv, conta, conta_dv, padrao, situacao, alt_dhsis, props.user.id]);

  useEffect(() => {
    const arrayTipoconta = [];
    props.tipocontaListaData.forEach((item) => {
      arrayTipoconta.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });
    setTipoconta(arrayTipoconta);
  }, [props.tipocontaListaData]);

  return (
    <Container fluid className="p-0">
      <PageTitle history={props.history} title="Conta" subtitle="/ Cadastrar" voltar />
      <Card>
        <CardBody className="pb-0">
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
            {/*** DESCRICAO ***/}
            <Col sm={6} md={6} lg={2} xl={2}>
              <FormGroup>
                <Label>Descrição</Label>
                <Input
                  type="text"
                  className="required"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  maxLength={30}
                />
              </FormGroup>
            </Col>
            {/*** PADRAO ***/}
            <Col sm={2} md={2} lg={8} xl={8}>
              <FormGroup className="text-right">
                <Label>Padrão</Label>
                <Checkbox
                  info="Sim"
                  checked={padrao}
                  onClick={(e) => setPadrao(e.target.checked)}
                />
              </FormGroup>
            </Col>
            {/*** SITUACAO ***/}
            <Col sm={2} md={2} lg={1} xl={1}>
              <FormGroup>
                <Label>Situação</Label>
                <Checkbox
                  info="Ativo"
                  checked={situacao}
                  onClick={(e) => setSituacao(e.target.checked)}
                />
              </FormGroup>
            </Col>

            {/*** MOEDA ***/}
            <Col sm={5} md={5} lg={2} xl={2}>
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
                  editar={{ id, value: moeda, valueId: id_moeda }}
                />
              </FormGroup>
            </Col>
            {/*** TIPO CONTA ***/}
            <Col sm={7} md={7} lg={2} xl={2}>
              <FormGroup>
                <Label>Tipo Conta</Label>
                <Input
                  type="select"
                  className="required"
                  value={tipo}
                  dados={props.tipocontaListaData}
                  config={props}
                  action="@GET_TIPO_CONTA"
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="0">Selecione...</option>
                  {tipoconta}
                </Input>
              </FormGroup>
            </Col>
            {/*** VAZIO ***/}
            <Col sm={0} md={0} lg={0} xl={8} />
            {/*** NUM BANCO ***/}
            <Col sm={4} md={4} lg={2} xl={2}>
              <FormGroup>
                <Label>Nº banco</Label>
                <Input
                  type="text"
                  maxLength={3}
                  value={banco_numero}
                  onChange={(e) => setBanco_numero(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** BANCO ***/}
            <Col sm={8} md={8} lg={2} xl={2}>
              <FormGroup>
                <Label>Banco</Label>
                <Input
                  type="text"
                  maxLength={15}
                  value={banco_nome}
                  onChange={(e) => setBanco_nome(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** VAZIO ***/}
            <Col sm={0} md={0} lg={8} xl={8} />
            {/*** AGENCIA ***/}
            <Col sm={4} md={4} lg={2} xl={2}>
              <FormGroup>
                <Label>Agência</Label>
                <Input
                  type="text"
                  maxLength={4}
                  value={agencia}
                  onChange={(e) => setAgencia(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** DV ***/}
            <Col sm={2} md={2} lg={1} xl={1}>
              <FormGroup>
                <Label>DV</Label>
                <Input
                  type="text"
                  maxLength={1}
                  value={agencia_dv}
                  onChange={(e) => setAgencia_dv(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** CONTA ***/}
            <Col sm={4} md={4} lg={2} xl={2}>
              <FormGroup>
                <Label>Conta</Label>
                <Input
                  type="text"
                  maxLength={10}
                  value={conta}
                  onChange={(e) => setConta(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** DV ***/}
            <Col sm={2} md={2} lg={1} xl={1}>
              <FormGroup>
                <Label>DV</Label>
                <Input
                  type="text"
                  pattern="-d*"
                  maxLength="2"
                  value={conta_dv}
                  onChange={(e) => setConta_dv(e.target.value)}
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
            <SaveButton save={() => saveConta(props, form)} />
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  tipocontaListaData: state.conta.tipocontaListaData,
  fichaData: state.conta.fichaData,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  autoCompletarId_Moeda: state.autoCompletar.autoCompletarId_Moeda,
});
export default connect(() => (mapState))(ContaFicha);
