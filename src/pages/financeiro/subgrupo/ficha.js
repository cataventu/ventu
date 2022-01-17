///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { PageTitle, SaveButton, Checkbox } from '../../../components';
import { getSubGrupoFicha, saveSubGrupo } from '../../../functions/financeiro/subgrupo';
import { getDados, formatDataInput } from '../../../functions/sistema';

function SubGrupoFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const hoje = moment().format('L');

  const [id, setId] = useState(0);
  const [id_grupo, setId_grupo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [situacao, setSituacao] = useState(true);
  const [grupo, setGrupo] = useState([]);
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  useEffect(() => {
    const { id } = props.match.params;
    if (firstLoad) {
      getDados(props, 'TsmGRUPO/PESQUISA', '@GET_GRUPO_LISTA');
      if (id > 0) { getSubGrupoFicha(props, id); }
    }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const arrayGrupo = [];
    props.grupoListaData.forEach((item) => {
      arrayGrupo.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });
    setGrupo(arrayGrupo);
  }, [props.grupoListaData]);

  useEffect(() => {
    const {
      id, id_grupo, descricao, situacao, alt_dhsis,
    } = props.fichaData;
    if (id > 0) {
      setId(id);
      setId_grupo(id_grupo);
      setDescricao(descricao);
      setSituacao(situacao);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.fichaData]);

  useEffect(() => {
    setForm({
      id,
      id_grupo,
      descricao,
      situacao,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, id_grupo, descricao, situacao, alt_dhsis, props.user.id]);

  return (
    <Container fluid className="p-0">
      <PageTitle history={props.history} title="SubGrupo" subtitle="/ Cadastrar" voltar />
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
            {/*** GRUPO ***/}
            <Col sm={4} md={3} lg={3} xl={2}>
              <FormGroup>
                <Label>Grupo</Label>
                <Input
                  type="select"
                  className="required"
                  value={id_grupo}
                  dados={props.grupoListaData}
                  config={props}
                  action="@GET_GRUPO_LISTA"
                  onChange={(e) => setId_grupo(e.target.value)}
                >
                  <option value="0">Selecione...</option>
                  {grupo}
                </Input>
              </FormGroup>
            </Col>
            {/*** DESCRICAO ***/}
            <Col sm={4} md={4} lg={4} xl={4}>
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
            <Col sm={2} md={3} lg={4} xl={5}>
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
            <SaveButton save={() => saveSubGrupo(props, form)} />
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  grupoListaData: state.grupo.grupoListaData,
  fichaData: state.subgrupo.fichaData,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(SubGrupoFicha);
