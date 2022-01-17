///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { PageTitle, SaveButton, Checkbox } from '../../../components';
import { formatValidade, formatDataInput } from '../../../functions/sistema';
import { saveCartaoCorp, getCartaoCorpFicha } from '../../../functions/financeiro/cartaocorp';

function CartaoCorpFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const hoje = moment().format('L');

  const [id, setId] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [titular, setTitular] = useState('');
  const [situacao, setSituacao] = useState(true);

  const [numero, setNumero] = useState('');
  const [validade, setValidade] = useState('');
  const [seguranca, setSeguranca] = useState('');
  const [senha, setSenha] = useState('');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  useEffect(() => {
    const { id } = props.match.params;

    if (firstLoad) {
      if (id > 0) { getCartaoCorpFicha(props, id); }
    }

    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, descricao, titular, situacao, numero, validade, seguranca, senha, alt_dhsis,
    } = props.fichaData;
    if (id > 0) {
      setId(id);
      setDescricao(descricao);
      setTitular(titular);
      setSituacao(situacao);

      setNumero(numero);
      setValidade(validade);
      setSeguranca(seguranca);
      setSenha(senha);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.fichaData]);

  useEffect(() => {
    setForm({
      id,
      descricao,
      titular,
      situacao,
      numero,
      validade,
      seguranca,
      senha,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, props.user.id, descricao, titular, situacao, numero, validade, seguranca, senha, alt_dhsis]);

  return (
    <Container fluid className="p-0">
      <PageTitle history={props.history} title="Cartão Corporativo" subtitle="/ Cadastrar" voltar />
      <Card>
        <CardBody className="pb-0">
          <Row>
            {/*** ID ***/}
            <Col sm={2} md={1} lg={1} xl={1}>
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
            <Col sm={4} md={4} lg={3} xl={3}>
              <FormGroup>
                <Label>Descrição</Label>
                <Input
                  type="text"
                  className="required"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  maxLength={60}
                />
              </FormGroup>
            </Col>
            {/*** TITULAR ***/}
            <Col sm={4} md={5} lg={4} xl={4}>
              <FormGroup>
                <Label>Titular</Label>
                <Input
                  type="text"
                  className="required"
                  value={titular}
                  onChange={(e) => setTitular(e.target.value)}
                  maxLength={60}
                />
              </FormGroup>
            </Col>
            {/*** SITUACAO ***/}
            <Col sm={2} md={2} lg={4} xl={4}>
              <FormGroup className="text-right">
                <Label>Situação</Label>
                <Checkbox
                  info="Ativo"
                  checked={situacao}
                  onClick={(e) => setSituacao(e.target.checked)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {/*** NUMERO ***/}
            <Col sm={3} md={2} lg={2} xl={2}>
              <FormGroup>
                <Label>Número</Label>
                <Input
                  type="text"
                  className="required"
                  value={numero}
                  maxLength={25}
                  onChange={(e) => setNumero(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** VALIDADE ***/}
            <Col sm={2} md={2} lg={1} xl={1}>
              <FormGroup>
                <Label>Validade</Label>
                <Input
                  type="text"
                  maxLength={5}
                  value={validade}
                  onChange={(e) => setValidade(formatValidade(e.target.value))}
                />
              </FormGroup>
            </Col>
            {/*** SEGURANCA ***/}
            <Col sm={4} md={3} lg={3} xl={3}>
              <FormGroup>
                <Label>Segurança</Label>
                <Input
                  type="text"
                  maxLength={10}
                  value={seguranca}
                  onChange={(e) => setSeguranca(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** SENHA ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Senha</Label>
                <Input
                  type="password"
                  maxLength={30}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
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
          </Row>
          <Row>
            {/*** SAVE ***/}
            <SaveButton save={() => saveCartaoCorp(props, form)} />
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  fichaData: state.cartaocorp.fichaData,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(CartaoCorpFicha);
