///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { PageTitle, SaveButton, Checkbox } from '../../../components';
import { getProfissaoFicha, saveProfissao } from '../../../functions/tabelas/profissao';
import { formatDataInput } from '../../../functions/sistema';

///////// FICHA /////////////////
/////////////////////////////////
function ProfissaoFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const hoje = moment().format('L');

  const [id, setId] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [situacao, setSituacao] = useState(true);
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  useEffect(() => {
    const { id } = props.match.params;
    if (firstLoad && id > 0) { getProfissaoFicha(props, id); }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, descricao, situacao, alt_dhsis,
    } = props.fichaData;
    if (id > 0) {
      setId(id);
      setDescricao(descricao);
      setSituacao(situacao);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.fichaData]);

  useEffect(() => {
    setForm({
      id,
      descricao,
      situacao,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, descricao, situacao, alt_dhsis, props.user.id]);

  ///////// RENDER FILTRO /////////
  /////////////////////////////////
  return (
    <Container fluid className="p-0">
      <PageTitle history={props.history} title="Profissão" subtitle="/ Cadastrar" voltar />
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
                  id="profissao-ficha-id"
                  name="profissao-ficha-id"
                />
              </FormGroup>
            </Col>
            {/*** DESCRICAO ***/}
            <Col sm={6} md={5} lg={4} xl={4}>
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
            <Col sm={4} md={5} lg={7} xl={7}>
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
            <SaveButton save={() => saveProfissao(props, form)} />
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  fichaData: state.profissao.fichaData,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(ProfissaoFicha);
