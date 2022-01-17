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
import { getMunicipioFicha, saveMunicipio } from '../../../functions/tabelas/municipio';
import { formatDataInput } from '../../../functions/sistema';

///////// FICHA /////////////////
/////////////////////////////////
function MunicipioFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const hoje = moment().format('L');

  const [id, setId] = useState(0);
  const [id_pais, setId_Pais] = useState(0);
  const [pais, setPais] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [uf, setUf] = useState('');
  const [ddd, setDdd] = useState('');
  const [ibge, setIbge] = useState('');
  const [situacao, setSituacao] = useState(true);
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  useEffect(() => {
    const { id } = props.match.params;
    if (firstLoad && id > 0) {
      getMunicipioFicha(props, id);
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, id_pais, pais, municipio, uf, ddd, ibge, situacao, alt_dhsis,
    } = props.fichaData;
    if (id > 0) {
      setId(id);
      setId_Pais(id_pais);
      setPais(pais);
      setMunicipio(municipio);
      setUf(uf);
      setDdd(ddd);
      setIbge(ibge);
      setAlt_dhsis(alt_dhsis);

      setSituacao(situacao);
    }
  }, [props.fichaData]);

  useEffect(() => {
    setId_Pais(props.autoCompletarId_Pais);
  }, [props.autoCompletarId_Pais]);

  useEffect(() => {
    setForm({
      id,
      id_pais,
      pais,
      municipio,
      uf,
      ddd,
      ibge,
      situacao,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, id_pais, pais, municipio, uf, ddd, ibge, situacao, alt_dhsis, props.user.id, props.autoCompletarPais]);

  return (
    <Container fluid className="p-0">
      <PageTitle history={props.history} title="Municipio" subtitle="/ Cadastrar" voltar />
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
            <Col sm={5} md={4} lg={3} xl={2}>
              <FormGroup>
                <Label>País</Label>
                <AutoCompletarV2
                  {...props}
                  value={pais}
                  valueId={id_pais}
                  tabela="PAIS"
                  campo="PAIS"
                  disabled={false}
                  visible
                  editar={{ id, value: pais, valueId: id_pais }}
                />
              </FormGroup>
            </Col>
            {/*** MUNICIPIO ***/}
            <Col sm={5} md={4} lg={3} xl={2}>
              <FormGroup>
                <Label>Município</Label>
                <Input
                  type="text"
                  className="required"
                  maxLength={30}
                  value={municipio}
                  onChange={(e) => setMunicipio(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** UF   ***/}
            <Col sm={3} md={2} lg={1} xl={1}>
              <FormGroup>
                <Label>UF</Label>
                <Input
                  type="text"
                  maxLength={2}
                  value={uf}
                  onChange={(e) => setUf(e.target.value)}
                />

              </FormGroup>
            </Col>
            {/*** DDD ***/}
            <Col sm={3} md={2} lg={1} xl={1}>
              <FormGroup>
                <Label>DDD</Label>
                <Input
                  type="number"
                  step="1"
                  maxLength={3}
                  value={ddd}
                  onChange={(e) => setDdd(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** IBGE ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>IBGE</Label>
                <Input
                  type="text"
                  maxLength={10}
                  value={ibge}
                  onChange={(e) => setIbge(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** SITUACAO ***/}
            <Col sm={3} md={7} lg={1} xl={3}>
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
            <SaveButton save={() => saveMunicipio(props, form)} />
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  fichaData: state.municipio.fichaData,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  autoCompletarId_Pais: state.autoCompletar.autoCompletarId_Pais,
});
export default connect(() => (mapState))(MunicipioFicha);
