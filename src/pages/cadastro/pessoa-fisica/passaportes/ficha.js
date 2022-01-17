///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardBody, Col, FormGroup, Input, Label, Row, Container,
} from 'reactstrap';
import moment from 'moment';
import {
  SaveButton, PageTitle, MenuPFisica, Checkbox, AutoCompletarV2, CardHeaderName,
} from '../../../../components';
import { getPFisicaRPassaporteFicha, savePFisicaRPassaporte, getPFisicaPessoalFicha } from '../../../../functions/cadastro/pessoa-fisica';
import { getDados, formatDataInput, formatData } from '../../../../functions/sistema';

function FichaPassaporte(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id, setId] = useState(0);

  const [id_pfisica, setId_pfisica] = useState(0);
  const [id_pjuridica, setId_pjuridica] = useState(0);

  const [id_pais, setId_pais] = useState(0);
  const [pais, setPais] = useState('');

  const [id_pais_emissao, setId_pais_emissao] = useState(0);
  const [pais_emissao, setPais_emissao] = useState('');

  const [nome_passaporte, setNome_passaporte] = useState('');
  const [numero, setNumero] = useState('');
  const [dt_emissao, setDt_emissao] = useState('');
  const [dt_validade, setDt_validade] = useState('');
  const [padrao, setPadrao] = useState(false);
  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      const id_Passaporte = props.match.params.idRPassaporte;
      setId_pfisica(id);
      getDados(props, `/TsmPFISICA/PESSOAL_FICHA/${id}`, '@GET_PFISICA_PESSOAL_FICHA');
      getPFisicaPessoalFicha(props, id);
      if (id_Passaporte > 0) { getPFisicaRPassaporteFicha(props, id_Passaporte); }
      setFirst(false);
    }
  }, [props, firstLoad]);

  //EDITAR
  useEffect(() => {
    const {
      id, id_pfisica, id_pjuridica, id_pais, pais, nome_passaporte, numero, id_pais_emissao,
      pais_emissao, dt_emissao, dt_validade, padrao, alt_dhsis,
    } = props.rpassaporteFichaData;

    if (id > 0) {
      setId(id);
      setId_pfisica(id_pfisica);
      setId_pjuridica(id_pjuridica);
      setId_pais(id_pais);
      setPais(pais);
      setNome_passaporte(nome_passaporte);
      setId_pais_emissao(id_pais_emissao);
      setPais(pais);
      setPais_emissao(pais_emissao);
      setDt_emissao(formatDataInput(dt_emissao));
      setDt_validade(formatDataInput(dt_validade));
      setNumero(numero);
      setPadrao(padrao);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.rpassaporteFichaData]);

  //campo AC
  useEffect(() => {
    setId_pais(props.autoCompletarId_Pais);
  }, [props.autoCompletarId_Pais]);

  useEffect(() => {
    setId_pais_emissao(props.autoCompletarId_PaisEmissao);
  }, [props.autoCompletarId_PaisEmissao]);

  useEffect(() => {
    setForm({
      id,
      id_pfisica,
      id_pjuridica,
      id_pais,
      pais,
      nome_passaporte,
      numero,
      id_pais_emissao,
      pais_emissao,
      dt_emissao: formatData(dt_emissao),
      dt_validade: formatData(dt_validade),
      padrao,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, id_pfisica, id_pjuridica, id_pais, pais, nome_passaporte, numero, id_pais_emissao,
    pais_emissao, dt_emissao, dt_validade, padrao, alt_dhsis, props.user.id]);

  return (
    <Container fluid className="p-0">
      <PageTitle
        title="Pessoa Física"
        subtitle="/ Cadastrar Passaporte"
        voltar
        history={props.history}
      />
      <Row>
        {/*** MENU ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuPFisica {...props} item_7="active" />
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
                {/*** NOME ***/}
                <Col sm={5} md={5} lg={7} xl={7}>
                  <FormGroup>
                    <Label>Nome</Label>
                    <Input
                      type="text"
                      value={nome_passaporte}
                      maxLength={60}
                      onChange={(e) => setNome_passaporte(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** PADRAO ***/}
                <Col sm={2}>
                  <FormGroup className="text-right">
                    <Label>Padrão</Label>
                    <Checkbox
                      info="Ativo"
                      checked={padrao}
                      onClick={(e) => setPadrao(e.target.checked)}
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
                {/*** PAIS EMISSAO ***/}
                <Col sm={6} md={6} lg={3} xl={3}>
                  <FormGroup>
                    <Label>País Emissão</Label>
                    <AutoCompletarV2
                      {...props}
                      value={pais_emissao}
                      valueId={id_pais_emissao}
                      tabela="PAISEMISSAO"
                      campo="PAISEMISSAO"
                      disabled={false}
                      visible
                      editar={{ id, value: pais_emissao, valueId: id_pais_emissao }}
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
                <SaveButton save={() => savePFisicaRPassaporte(props, form)} />
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

  rpassaporteFichaData: state.pFisica.rpassaporteFichaData,
  pessoalFichaData: state.pFisica.pessoalFichaData,

  autoCompletarId_Pais: state.autoCompletar.autoCompletarId_Pais,
  autoCompletarId_PaisEmissao: state.autoCompletar.autoCompletarId_PaisEmissao,

  visibilityPageCadastro: state.usuario.visibilityPageCadastro,
});
export default connect(() => (mapState))(FichaPassaporte);
