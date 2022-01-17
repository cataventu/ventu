///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardBody, Col, FormGroup, Input, Label, Row, Container,
} from 'reactstrap';
import moment from 'moment';
import {
  SaveButton, PageTitle, MenuPFisica, AutoCompletarV2, CardHeaderName,
} from '../../../../components';
import { getPFisicaRVistoFicha, savePFisicaRVisto, getPFisicaPessoalFicha } from '../../../../functions/cadastro/pessoa-fisica';
import { getDados, formatDataInput, formatData } from '../../../../functions/sistema';

function FichaRVisto(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id, setId] = useState(0);

  const [id_pfisica, setId_pfisica] = useState(0);
  const [id_pais, setId_pais] = useState(0);
  const [pais, setPais] = useState('');
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [tipo, setTipo] = useState('');
  const [id_mun_emissao, setId_mun_emissao] = useState(0);
  const [mun_emissao, setMun_emissao] = useState('');
  const [dt_emissao, setDt_emissao] = useState('');
  const [dt_validade, setDt_validade] = useState('');
  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      const id_Visto = props.match.params.idRVisto;
      setId_pfisica(id);
      getDados(props, `/TsmPFISICA/PESSOAL_FICHA/${id}`, '@GET_PFISICA_PESSOAL_FICHA');
      getPFisicaPessoalFicha(props, id);
      if (id_Visto > 0) { getPFisicaRVistoFicha(props, id_Visto); }
      setFirst(false);
    }
  }, [props, firstLoad]);

  //EDITAR
  useEffect(() => {
    const {
      id, id_pfisica, id_pais, pais, nome, numero, tipo, id_mun_emissao,
      mun_emissao, dt_emissao, dt_validade, alt_dhsis,
    } = props.rvistoFichaData;

    if (id > 0) {
      setId(id);
      setId_pfisica(id_pfisica);
      setId_pais(id_pais);
      setPais(pais);
      setId_mun_emissao(id_mun_emissao);
      setMun_emissao(mun_emissao);
      setNome(nome);
      setDt_emissao(formatDataInput(dt_emissao));
      setDt_validade(formatDataInput(dt_validade));
      setNumero(numero);
      setTipo(tipo);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.rvistoFichaData]);

  //AC
  useEffect(() => {
    setId_pais(props.autoCompletarId_Pais);
  }, [props.autoCompletarId_Pais]);

  useEffect(() => {
    setId_mun_emissao(props.autoCompletarId_Municipio);
  }, [props.autoCompletarId_Municipio]);

  useEffect(() => {
    setForm({
      id,
      id_pfisica,
      id_pais,
      pais,
      nome,
      numero,
      tipo,
      id_mun_emissao,
      mun_emissao,
      dt_emissao: formatData(dt_emissao),
      dt_validade: formatData(dt_validade),
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, id_pfisica, id_pais, pais, nome, numero, tipo, id_mun_emissao,
    mun_emissao, dt_emissao, dt_validade, alt_dhsis, props.user.id]);

  return (
    <Container fluid className="p-0">
      <PageTitle
        title="Pessoa Física"
        subtitle="/ Cadastrar Visto"
        voltar
        history={props.history}
      />
      <Row>
        {/*** MENU ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuPFisica {...props} item_8="active" />
        </Col>
        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
          <Card>
            <CardBody className="pb-1">
              {/*** CARD HEADER ***/}
              <CardHeaderName {...props} titulo={props.pessoalFichaData.nome_completo} />
              <Row>
                {/*** ID ***/}
                <Col sm={3} md={3} lg={2} xl={2} className="hide">
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
                <Col sm={5} md={5} lg={3} xl={3}>
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
                {/*** TIPO ***/}
                <Col sm={5} md={5} lg={7} xl={7}>
                  <FormGroup>
                    <Label>Tipo</Label>
                    <Input
                      type="text"
                      className="required"
                      value={tipo}
                      maxLength={60}
                      onChange={(e) => setTipo(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** NUMERO ***/}
                <Col sm={6} md={6} lg={3} xl={3}>
                  <FormGroup>
                    <Label>Número</Label>
                    <Input
                      type="text"
                      value={numero}
                      className="required"
                      maxLength={20}
                      onChange={(e) => setNumero(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** MUNICIPIO EMISSAO ***/}
                <Col sm={6} md={6} lg={3} xl={3}>
                  <FormGroup>
                    <Label>Município Emissão</Label>
                    <AutoCompletarV2
                      {...props}
                      value={mun_emissao}
                      valueId={id_mun_emissao}
                      tabela="MUNICIPIO"
                      campo=""
                      disabled={false}
                      visible
                      editar={{ id, value: mun_emissao, valueId: id_mun_emissao }}
                    />
                  </FormGroup>
                </Col>
                {/*** DATA EMISSAO ***/}
                <Col sm={6} md={6} lg={3} xl={3}>
                  <FormGroup>
                    <Label>Data Emissão</Label>
                    <Input
                      type="date"
                      value={dt_emissao}
                      onChange={(e) => setDt_emissao(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** DATA VALIDADE ***/}
                <Col sm={6} md={6} lg={3} xl={3}>
                  <FormGroup>
                    <Label>Data Validade</Label>
                    <Input
                      type="date"
                      value={dt_validade}
                      onChange={(e) => setDt_validade(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** DHSIS ***/}
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
                <SaveButton save={() => savePFisicaRVisto(props, form)} />
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  rvistoFichaData: state.pFisica.rvistoFichaData,
  pessoalFichaData: state.pFisica.pessoalFichaData,

  autoCompletarId_Pais: state.autoCompletar.autoCompletarId_Pais,
  autoCompletarId_Municipio: state.autoCompletar.autoCompletarId_Municipio,

  visibilityPageCadastro: state.usuario.visibilityPageCadastro,
});
export default connect(() => (mapState))(FichaRVisto);
