///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { formatDataInput } from '../../../functions/sistema';
import {
  AutoCompletarV2, PageTitle, SaveButton, Checkbox,
} from '../../../components';
import { getAeroportoFicha, saveAeroporto } from '../../../functions/tabelas/aeroporto';

///////// FICHA /////////////////
/////////////////////////////////
function AeroportoFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const hoje = moment().format('L');

  const [id, setId] = useState(0);
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [id_municipio, setId_Municipio] = useState(0);
  const [municipio, setMunicipio] = useState('');
  const [situacao, setSituacao] = useState(true);
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  /// GET FICHA
  const handleFicha = useCallback((id_url) => {
    async function getFicha() {
      const response = await getAeroportoFicha(props, id_url);

      const {
        id, codigo, nome, id_municipio, municipio, situacao, alt_dhsis,
      } = response;

      setCodigo(codigo);
      setNome(nome);
      setId_Municipio(id_municipio);
      setMunicipio(municipio);
      setSituacao(situacao);
      setAlt_dhsis(alt_dhsis);

      setId(id);
    }
    getFicha();
  }, [props]);

  /// FIRST LOAD
  useEffect(() => {
    const { id } = props.match.params;
    if (firstLoad && id > 0) { handleFicha(id); }
    setFirst(false);
  }, [props, firstLoad, handleFicha]);

  /// AUTO COMPLETAR
  useEffect(() => {
    setId_Municipio(props.autoCompletarId_Municipio);
  }, [props.autoCompletarId_Municipio]);

  /// FORM
  useEffect(() => {
    setForm({
      id,
      codigo,
      nome,
      id_municipio,
      situacao,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, codigo, nome, id_municipio, situacao, alt_dhsis, props.user.id, props.autoCompletarMunicipio]);

  return (
    <Container fluid className="p-0">
      <PageTitle history={props.history} title="Aeroporto" subtitle="/ Cadastrar" voltar />
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
            {/*** CODIGO ***/}
            <Col sm={2} md={2} lg={1} xl={1}>
              <FormGroup>
                <Label>Código</Label>
                <Input
                  type="text"
                  className="required"
                  maxLength={3}
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** NOME ***/}
            <Col sm={3} md={3} lg={3} xl={2}>
              <FormGroup>
                <Label>Nome</Label>
                <Input
                  type="text"
                  className="required"
                  maxLength={30}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** MUNICIPIO ***/}
            <Col sm={3} md={3} lg={3} xl={2}>
              <FormGroup>
                <Label>Município</Label>
                <AutoCompletarV2
                  {...props}
                  value={municipio}
                  valueId={id_municipio}
                  tabela="MUNICIPIO"
                  campo=""
                  disabled={false}
                  visible
                  editar={{ id, value: municipio, valueId: id_municipio }}
                />
              </FormGroup>
            </Col>
            {/*** SITUACAO ***/}
            <Col sm={2} md={2} lg={4} xl={6}>
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
            <SaveButton save={() => saveAeroporto(props, form)} />
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  autoCompletarId_Municipio: state.autoCompletar.autoCompletarId_Municipio,
});
export default connect(() => (mapState))(AeroportoFicha);
