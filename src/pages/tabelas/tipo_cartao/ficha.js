///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { PageTitle, SaveButton, Checkbox } from '../../../components';
import { getCartaoFicha, saveCartao } from '../../../functions/tabelas/tipo_cartao';
import { formatDataInput } from '../../../functions/sistema';

///////// FICHA /////////////////
/////////////////////////////////
function CartaoFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const hoje = moment().format('L');

  const [id, setId] = useState(0);
  const [tipo, setTipo] = useState(0);
  const [codigo, setCodigo] = useState('');
  const [cod, setCod] = useState('hide');
  const [descricao, setDescricao] = useState('');
  const [situacao, setSituacao] = useState(true);
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  const handleTipo = useCallback((value) => {
    setTipo(value);
    if (value === '1' || value === 1) {
      setCod('show');
    } else {
      setCod('hide');
    }
  }, []);

  useEffect(() => {
    handleTipo(tipo);
  }, [tipo, handleTipo]);

  useEffect(() => {
    const { id } = props.match.params;
    if (firstLoad && id > 0) { getCartaoFicha(props, id); }

    setFirst(false);
  }, [props, firstLoad]);

  //EDITAR
  useEffect(() => {
    const {
      id, tipo, codigo, descricao, situacao, cod,
    } = props.fichaData;
    if (id > 0) {
      setId(id);
      setTipo(tipo);

      if (tipo === '1' || tipo === 1) {
        setCod('show');
      } else {
        setCod('hide');
      }

      //setDtipo(dtipo);
      setCodigo(codigo);
      setDescricao(descricao);
      setSituacao(situacao);
      setCod(cod);
      handleTipo(tipo);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.fichaData, handleTipo]);

  //GRAVAR
  useEffect(() => {
    setForm({
      id,
      tipo,
      codigo,
      descricao,
      situacao,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, tipo, codigo, descricao, situacao, alt_dhsis, props.user.id]);

  ///////// TIPO CARTAO ///////////
  /////////////////////////////////
  const tipocartao = [];
  props.tipocartaoListaData.forEach((item) => {
    tipocartao.push(
      <option value={item.id}>
        {' '}
        { item.descricao }
      </option>,
    );
  });

  return (
    <Container fluid className="p-0">
      <PageTitle history={props.history} title="Tipo Cartão" subtitle="/ Cadastrar" voltar />
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
            {/*** TIPO CARTAO ***/}
            <Col sm={3} md={2} lg={2} xl={2}>
              <FormGroup>
                <Label>Tipo Cartão</Label>
                <Input
                  type="select"
                  className="required"
                  value={tipo}
                  dados={props.tipocartaoListaData}
                  config={props}
                  action="@GET_TIPO_CARTAO"
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="0">Selecione...</option>
                  {tipocartao}
                </Input>
              </FormGroup>
            </Col>
            {/*** CODIGO ***/}
            <Col sm={2} md={2} lg={2} xl={2} className={cod}>
              <FormGroup>
                <Label>Código</Label>
                <Input
                  type="text"
                  //className="required"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  maxLength={2}

                />
              </FormGroup>
            </Col>
            {/*** DESCRICAO ***/}
            <Col sm={3} md={3} lg={5} xl={4}>
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
            <SaveButton save={() => saveCartao(props, form)} />
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  tipocartaoListaData: state.cartao.tipocartaoListaData,
  fichaData: state.cartao.fichaData,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(CartaoFicha);
