///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { Checkbox, SaveButton, PageTitle } from '../../../components';
import { getServicoFicha, saveServico } from '../../../functions/tabelas/servico';
import { formatDataInput } from '../../../functions/sistema';

function ServicoFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const hoje = moment().format('L');

  const [id, setId] = useState(0);
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [servico, setServico] = useState([]);
  const [situacao, setSituacao] = useState(true);
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  useEffect(() => {
    const { id } = props.match.params;
    if (firstLoad && id > 0) { getServicoFicha(props, id); }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, tipo, descricao, situacao, alt_dhsis,
    } = props.fichaData;
    if (id > 0) {
      setId(id);
      setTipo(tipo);
      setDescricao(descricao);
      setSituacao(situacao);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.fichaData]);

  useEffect(() => {
    setForm({
      id,
      tipo,
      descricao,
      situacao,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, tipo, descricao, situacao, alt_dhsis, props.user.id]);

  useEffect(() => {
    const arrayServicos = [];
    props.servicoListaData.forEach((item) => {
      arrayServicos.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });
    setServico(arrayServicos);
  }, [props.servicoListaData]);

  return (
    <Container fluid className="p-0">
      <PageTitle history={props.history} title="Serviço" subtitle="/ Cadastrar" voltar />
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
            {/*** TIPO SERVIÇO ***/}
            <Col sm={4} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Tipo Serviço</Label>
                <Input
                  type="select"
                  className="required"
                  value={tipo}
                  dados={props.servicoListaData}
                  config={props}
                  action="@GET_TIPO_SERVICO"
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="0">Selecione...</option>
                  {servico}
                </Input>
              </FormGroup>
            </Col>
            {/*** DESCRICAO ***/}
            <Col sm={4} md={4} lg={3} xl={3}>
              <FormGroup>
                <Label>Descrição</Label>
                <Input
                  type="text"
                  className="required"
                  maxLength={30}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** SITUACAO ***/}
            <Col sm={2} md={3} lg={6} xl={6}>
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
            <SaveButton save={() => saveServico(props, form)} />
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  servicoListaData: state.servico.servicoListaData,
  fichaData: state.servico.fichaData,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(ServicoFicha);
