///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { Checkbox, PageTitle, SaveButton } from '../../../components';
import { getPaisFicha, savePais } from '../../../functions/tabelas/pais';
import { formatDataInput } from '../../../functions/sistema';

///////// FICHA /////////////////
/////////////////////////////////
function PaisFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const hoje = moment().format('L');

  const [id, setId] = useState(0);
  const [pais, setPais] = useState('');
  const [sigla, setSigla] = useState(0);
  const [nacionalidade, setNacionalidade] = useState('');
  const [bacen, setBacen] = useState('');
  const [ddi, setDdi] = useState('');
  const [situacao, setSituacao] = useState(true);
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  useEffect(() => {
    const { id } = props.match.params;
    if (firstLoad && id > 0) { getPaisFicha(props, id); }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, pais, sigla, nacionalidade, bacen, ddi, situacao, alt_dhsis,
    } = props.fichaData;
    if (id > 0) {
      setId(id);
      setPais(pais);
      setSigla(sigla);
      setNacionalidade(nacionalidade);
      setBacen(bacen);
      setDdi(ddi);
      setSituacao(situacao);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.fichaData]);

  useEffect(() => {
    setForm({
      id,
      pais,
      sigla,
      nacionalidade,
      bacen,
      ddi,
      situacao,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, pais, sigla, nacionalidade, bacen, ddi, situacao, alt_dhsis, props.user.id]);

  return (
    <Container fluid className="p-0">
      <PageTitle history={props.history} title="País" subtitle="/ Cadastrar" voltar />
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
            {/*** PAIS ***/}
            <Col sm={4} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>País</Label>
                <Input
                  type="text"
                  className="required"
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  maxLength={30}
                />
              </FormGroup>
            </Col>
            {/*** SIGLA ***/}
            <Col sm={2} md={2} lg={1} xl={1}>
              <FormGroup>
                <Label>Sigla</Label>
                <Input
                  type="text"
                  className="required"
                  value={sigla}
                  onChange={(e) => setSigla(e.target.value)}
                  maxLength={3}
                />
              </FormGroup>
            </Col>
            {/*** NACIONALIDADE ***/}
            <Col sm={4} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Nacionalidade</Label>
                <Input
                  type="text"
                  className="required"
                  value={nacionalidade}
                  onChange={(e) => setNacionalidade(e.target.value)}
                  maxLength={60}
                />
              </FormGroup>
            </Col>
            {/*** BACEN ***/}
            <Col sm={2} md={2} lg={1} xl={1}>
              <FormGroup>
                <Label>Bacen</Label>
                <Input
                  type="text"
                  value={bacen}
                  onChange={(e) => setBacen(e.target.value)}
                  maxLength={5}
                />
              </FormGroup>
            </Col>
            {/*** DDI ***/}
            <Col sm={2} md={2} lg={1} xl={1}>
              <FormGroup>
                <Label>DDI</Label>
                <Input
                  type="number"
                  maxLength={3}
                  value={ddi}
                  onChange={(e) => setDdi(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** SITUACAO ***/}
            <Col sm={8} md={10} lg={4} xl={4}>
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
            <SaveButton save={() => savePais(props, form)} />
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  fichaData: state.pais.fichaData,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(PaisFicha);
