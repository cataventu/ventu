///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { PageTitle, SaveButton } from '../../../components';
import { getCambioFicha, saveCambio, getCambioBacen } from '../../../functions/financeiro/cambio';
import {
  getDados, formatInputCambio, formatData, formatDataInput,
} from '../../../functions/sistema';

function CambioFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const hoje = moment().format('L');

  const [id, setId] = useState(0);
  const [data, setData] = useState('');
  const [id_moeda, setId_Moeda] = useState(0);
  const [cambio, setCambio] = useState('');
  const [bacen, setBacen] = useState('');
  const [btn, setBtn] = useState('');
  const [situacao, setSituacao] = useState(true);
  const [moeda, setMoeda] = useState([]);
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  const handleBacen = useCallback((id_moeda) => {
    getDados(props, `/TsmMOEDA/FICHA/${id_moeda}`, '@GET_MOEDA_FICHA');
  }, [props]);

  const handleCambio = useCallback(() => {
    async function getCambio() {
      const response = await getCambioBacen(props, formatData(data), bacen);
      setCambio(response.data.cambio);
    }
    getCambio();
  }, [props, data, bacen]);

  useEffect(() => {
    const { id } = props.match.params;
    if (firstLoad) {
      getDados(props, '/TsmMOEDA/PESQUISA/DESCRICAO', '@GET_MOEDA_LISTA');
      if (id > 0) { getCambioFicha(props, id); }
    }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const arrayMoeda = [];
    props.moedaListaData.forEach((item) => {
      arrayMoeda.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });
    setMoeda(arrayMoeda);
  }, [props.moedaListaData]);

  useEffect(() => {
    const {
      id, data, id_moeda, cambio, bacen, btn, situacao, alt_dhsis,
    } = props.fichaData;
    if (id > 0) {
      setId(id);
      setData(formatDataInput(data));
      setId_Moeda(id_moeda);
      setCambio(cambio);
      setBacen(bacen);
      setBtn(btn);
      setSituacao(situacao);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.fichaData]);

  useEffect(() => {
    setForm({
      id,
      data: formatData(data),
      id_moeda,
      cambio,
      bacen,
      btn,
      situacao,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, data, id_moeda, cambio, bacen, btn, situacao, alt_dhsis, props.user.id]);

  useEffect(() => {
    setBacen(props.moedaData.bacen);
  }, [props.moedaData]);

  ///////// RENDER FILTRO /////////
  /////////////////////////////////
  return (
    <Container fluid className="p-0">
      <PageTitle history={props.history} title="Câmbio" subtitle="/ Cadastrar" voltar />
      <Card>
        <CardBody className="pb-0">
          <Row>
            {/*** ID ***/}
            <Col sm={3} md={3} lg={1} xl={1}>
              <FormGroup>
                <Label>Id</Label>
                <Input
                  type="text"
                  disabled
                  value={id}
                />
              </FormGroup>
            </Col>
            {/*** DATA ***/}
            <Col sm={4} md={4} lg={2} xl={2}>
              <FormGroup>
                <Label>Data</Label>
                <Input
                  type="date"
                  className="required"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** MOEDA ***/}
            <Col sm={5} md={5} lg={2} xl={2}>
              <FormGroup>
                <Label>Moeda</Label>
                <Input
                  type="select"
                  className="required"
                  value={id_moeda}
                  dados={props.moedaListaData}
                  config={props}
                  action="@GET_MOEDA_LISTA"
                  onChange={(e) => setId_Moeda(e.target.value)}
                  onChangeCapture={(e) => handleBacen(e.target.value)}
                >
                  <option value="0">Selecione...</option>
                  {moeda}
                </Input>
              </FormGroup>
            </Col>
            {/*** BACEN ***/}
            <Col sm={3} md={3} lg={1} xl={1}>
              <FormGroup>
                <Label>BACEN</Label>
                <Input
                  type="text"
                  disabled
                  maxLength={6}
                  className="required"
                  value={bacen}
                  onChange={(e) => setBacen(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** CÂMBIO ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Câmbio</Label>
                <Input
                  type="text"
                  maxLength={10}
                  className="required"
                  id="cambio-ficha-cambio"
                  name="cambio-ficha-cambio"
                  value={cambio}
                  onChange={(e) => setCambio(formatInputCambio(e.target.value))}
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
            {/*** BTN ***/}
            <Col sm={3} md={3} lg={1} xl={1}>
              <FormGroup>
                <button
                  type="button"
                  className="mt-4 btn btn-primary"
                  title="Busca automático do câmbio"
                  onClick={() => handleCambio(props)}
                >
                      BACEN
                </button>
              </FormGroup>
            </Col>
            <SaveButton save={() => saveCambio(props, form)} />
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  fichaData: state.cambio.fichaData,
  moedaData: state.moeda.fichaData,
  moedaListaData: state.moeda.moedaListaData,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(CambioFicha);
