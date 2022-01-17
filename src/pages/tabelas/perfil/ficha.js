///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { PageTitle, SaveButton, Checkbox } from '../../../components';
import { getDados, formatDataInput } from '../../../functions/sistema';
import { getPerfilFicha, savePerfil } from '../../../functions/tabelas/perfil';

///////// FICHA /////////////////
/////////////////////////////////
function PerfilFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const hoje = moment().format('L');

  const [id, setId] = useState(0);
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [situacao, setSituacao] = useState(true);
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  const [perfil, setPerfil] = useState([]);

  useEffect(() => {
    const { id } = props.match.params;
    if (firstLoad && id > 0) { getPerfilFicha(props, id); }
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
    const { id } = props.match.params;
    if (firstLoad) {
      getDados(props, 'TsmSISTEMA/TIPO_PERFIL_TABELA', '@GET_TIPO_PERFIL_LISTA');

      if (id > 0) { getPerfilFicha(props, id); }
    }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const arrayPerfil = [];

    props.perfilListaData.forEach((item) => {
      arrayPerfil.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });
    setPerfil(arrayPerfil);
  }, [props.perfilListaData]);

  return (
    <Container fluid className="p-0">
      <PageTitle history={props.history} title="Perfil" subtitle="/ Cadastrar" voltar />
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
            {/*** TIPO PERFIL ***/}
            <Col sm={3} md={2} lg={2} xl={2}>
              <FormGroup>
                <Label>Tipo Perfil</Label>
                <Input
                  type="select"
                  className="required"
                  value={tipo}
                  dados={props.perfilListaData}
                  config={props}
                  action="@GET_TIPO_PERFIL"
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="0">Selecione...</option>
                  {perfil}
                </Input>
              </FormGroup>
            </Col>
            {/*** DESCRICAO ***/}
            <Col sm={5} md={5} lg={5} xl={4}>
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
            <Col sm={2} md={2} lg={4} xl={5}>
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
            <SaveButton save={() => savePerfil(props, form)} />
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  perfilListaData: state.perfil.perfilListaData,
  fichaData: state.perfil.fichaData,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(PerfilFicha);
