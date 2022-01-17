///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { PageTitle, SaveButton, Checkbox } from '../../../components';
import { getMoedaFicha, saveMoeda } from '../../../functions/financeiro/moeda';
import { formatDataInput } from '../../../functions/sistema';

function MoedaFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const hoje = moment().format('L');

  const [id, setId] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [codigo, setCodigo] = useState('');
  const [numero, setNumero] = useState('');
  const [bacen, setBacen] = useState('');
  const [simbolo, setSimbolo] = useState('');
  const [padrao, setPadrao] = useState(false);
  const [situacao, setSituacao] = useState(true);
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  useEffect(() => {
    const { id } = props.match.params;
    if (firstLoad && id > 0) { getMoedaFicha(props, id); }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, descricao, codigo, numero, bacen, simbolo, padrao, situacao, alt_dhsis,
    } = props.fichaData;
    if (id > 0) {
      setId(id);
      setDescricao(descricao);
      setCodigo(codigo);
      setNumero(numero);
      setBacen(bacen);
      setSimbolo(simbolo);
      setPadrao(padrao);
      setSituacao(situacao);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.fichaData]);

  useEffect(() => {
    setForm({
      id,
      descricao,
      codigo,
      numero,
      bacen,
      simbolo,
      padrao,
      situacao,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, descricao, codigo, numero, bacen, simbolo, padrao, situacao, alt_dhsis, props.user.id]);

  ///////// RENDER FILTRO /////////
  /////////////////////////////////
  return (
    <Container fluid className="p-0">
      <PageTitle history={props.history} title="Moeda" subtitle="/ Cadastrar" voltar />
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
            <Col sm={6} md={4} lg={4} xl={3}>
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
            {/*** CODIGO ***/}
            <Col sm={4} md={3} lg={1} xl={1}>
              <FormGroup>
                <Label>Código</Label>
                <Input
                  type="text"
                  className="required"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  maxLength={10}
                />
              </FormGroup>
            </Col>

            {/*** NUMERO ***/}
            <Col sm={2} md={3} lg={1} xl={1}>
              <FormGroup>
                <Label>Número</Label>
                <Input
                  type="number"
                  className="required"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  maxLength={10}
                />
              </FormGroup>
            </Col>
            {/*** BACEN ***/}
            <Col sm={2} md={3} lg={1} xl={1}>
              <FormGroup>
                <Label>Bacen</Label>
                <Input
                  type="number"
                  value={bacen}
                  onChange={(e) => setBacen(e.target.value)}
                  maxLength={10}
                />
              </FormGroup>
            </Col>
            {/*** SIMBOLO ***/}
            <Col sm={2} md={3} lg={1} xl={1}>
              <FormGroup>
                <Label>Símbolo</Label>
                <Input
                  type="text"
                  value={simbolo}
                  onChange={(e) => setSimbolo(e.target.value)}
                  maxLength={6}
                />
              </FormGroup>
            </Col>
            {/*** PADRAO ***/}
            <Col sm={4} md={4} lg={1} xl={2} className="hide">
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
            <Col sm={2} md={2} lg={2} xl={2}>
              <FormGroup className="text-right">
                <Label>Situação</Label>
                <Checkbox
                  info="Ativo"
                  checked={situacao}
                  onClick={(e) => setSituacao(e.target.checked)}
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
            <SaveButton save={() => saveMoeda(props, form)} />
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  fichaData: state.moeda.fichaData,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(MoedaFicha);
