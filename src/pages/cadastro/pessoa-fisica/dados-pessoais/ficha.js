///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Button, Card, CardBody, Col, FormGroup, Input, Label, Row, Container,
} from 'reactstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import {
  Checkbox, AutoCompletarV2, PageTitle, SaveButton, MenuPFisica,
} from '../../../../components';

import {
  getPFisicaPessoalFicha,
  getPFisicaFoto,
  savePFisicaPessoal,
  uploadFoto,
  getFotoData,
  getRSVPFichaPF,
} from '../../../../functions/cadastro/pessoa-fisica';
import {
  formatRG, formatCPF, getDados, formatDataInput, formatData,
} from '../../../../functions/sistema';
import setNomeReserva from '../../../../functions/cadastro/pessoa-fisica/setNomeReserva';

function FichaDadosPessoais(props) {
  const [firstLoad, setFirst] = useState(true);
  const hoje = moment().format('L');
  const [id, setId] = useState(0);

  const [image, setImage] = useState([]);

  const [fornecedor, setFornecedor] = useState(false);

  const [situacao, setSituacao] = useState(true);
  const [notificacao, setNotificacao] = useState(false);
  const [estrangeira, setEstrangeira] = useState(false);
  const [estrangeiro, setEstrangeiro] = useState('hide');
  const [nacional, setNacional] = useState('show');
  const [nome_completo, setNome_completo] = useState('');
  const [nome_reserva, setNome_reserva] = useState('');
  const [nome_cracha, setNome_cracha] = useState('');
  const [dt_nascimento, setDt_nascimento] = useState('');
  const [rg, setRg] = useState('');
  const [cpf, setCpf] = useState('');
  const [rne, setRne] = useState('');
  const [gen_outros, setGen_outros] = useState('');
  const [colgen_outros, setColgen_outros] = useState('hide');
  const [genero, setGenero] = useState(0);
  const [dgenero, setDgenero] = useState('');
  const [estado_civil, setEstado_civil] = useState(0);
  const [nacionalidade, setNacionalidade] = useState('');
  const [nac_id_pais, setNac_id_pais] = useState(0);
  const [pro_aeroporto, setPro_aeroporto] = useState('');
  const [pro_id_aeroporto, setPro_id_aeroporto] = useState(0);
  const [estadoCivil, setEstadoCivil] = useState([]);
  const [sexo, setSexo] = useState([]);
  const [form, setForm] = useState({});
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const handleEstrangeira = useCallback((value) => {
    setEstrangeira(value);
    if (value === true) {
      setEstrangeiro('show');
      setNacional('hide');
    } else {
      setEstrangeiro('hide');
      setNacional('show');
    }
  }, []);

  const handleGenero = useCallback((value) => {
    if (value === 3 || value === '3') {
      setColgen_outros('show');
    } else {
      setColgen_outros('hide');
    }
  }, []);

  const handleFornecedor = useCallback((fornecedor) => {
    const { dispatch } = props;
    fornecedor
      ? dispatch({ type: '@SET_PFISICA_FORNECEDOR_TRUE' })
      : dispatch({ type: '@SET_PFISICA_FORNECEDOR_FALSE' });
  }, [props]);

  const handleNomeReserva = useCallback((value) => {
    setNome_reserva(setNomeReserva(value));
  }, []);

  useEffect(() => {
    const { id } = props.match.params;
    const { idRSVP } = props.match.params;

    if (firstLoad && id > 0) {
      getDados(props, '/TsmSISTEMA/ESTADO_CIVIL_TABELA/', '@GET_ESTADO_CIVIL');
      getDados(props, '/TsmSISTEMA/GENERO_TABELA/', '@GET_SEXO');

      if (id > 0) {
        getPFisicaPessoalFicha(props, id);
        getPFisicaFoto(props, id);
        if (idRSVP > 0) { getRSVPFichaPF(props, idRSVP); }
      }
    }

    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    handleGenero(genero);
  }, [genero, handleGenero]);

  /// EDITAR
  useEffect(() => {
    const {
      id, nome_completo, nome_reserva, nome_cracha, rg, cpf, rne, nacionalidade, fornecedor,
      nac_id_pais, pro_aeroporto, pro_id_aeroporto, dt_nascimento, genero, dgenero, gen_outros, colgen_outros, estado_civil,
      situacao, notificacao, estrangeira, estrangeiro, nacional, alt_dhsis,
    } = props.pessoalFichaData;

    if (id > 0) {
      setId(id);
      setFornecedor(fornecedor);
      setSituacao(situacao);
      setNotificacao(notificacao);
      setNome_completo(nome_completo);
      setNome_reserva(nome_reserva);
      setNome_cracha(nome_cracha);
      setRg(rg);
      setCpf(cpf);
      setRne(rne);
      setNacionalidade(nacionalidade);
      setNac_id_pais(nac_id_pais);
      setPro_aeroporto(pro_aeroporto);
      setPro_id_aeroporto(pro_id_aeroporto);
      setDt_nascimento(formatDataInput(dt_nascimento));
      setGenero(genero);
      setDgenero(dgenero);

      setGen_outros(gen_outros);
      setColgen_outros(colgen_outros);
      setEstado_civil(estado_civil);

      setEstrangeira(estrangeira);
      setEstrangeiro(estrangeiro);
      setNacional(nacional);

      setAlt_dhsis(alt_dhsis);

      handleEstrangeira(estrangeira);
      handleGenero(genero);
      handleFornecedor(fornecedor);
    }
  }, [props.pessoalFichaData, handleGenero, handleEstrangeira, handleFornecedor]);

  /// campo AC
  useEffect(() => {
    setNac_id_pais(props.autoCompletarId_Pais);
  }, [props.autoCompletarId_Pais]);

  useEffect(() => {
    setPro_id_aeroporto(props.autoCompletarId_Aeroporto);
  }, [props.autoCompletarId_Aeroporto]);

  /// lista
  useEffect(() => {
    const arrayEstadoCivil = [];
    props.estadoCivil.forEach((item) => {
      arrayEstadoCivil.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });
    setEstadoCivil(arrayEstadoCivil);
  }, [props.estadoCivil]);

  useEffect(() => {
    const arraySexo = [];
    props.sexo.forEach((item) => {
      arraySexo.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });
    setSexo(arraySexo);
  }, [props.sexo]);

  /// salvar
  useEffect(() => {
    setForm({
      id,
      fornecedor,
      nome_completo,
      nome_reserva,
      nome_cracha,
      rg,
      cpf,
      rne,
      nacionalidade,
      nac_id_pais,
      pro_aeroporto,
      pro_id_aeroporto,
      dt_nascimento: formatData(dt_nascimento),
      genero,
      dgenero,
      gen_outros,
      colgen_outros,
      estado_civil,
      situacao,
      notificacao,
      estrangeira,
      estrangeiro,
      nacional,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, nome_completo, nome_reserva, nome_cracha, rg, cpf, rne, nacionalidade, fornecedor,
    nac_id_pais, pro_aeroporto, pro_id_aeroporto, dt_nascimento, genero, dgenero, gen_outros, colgen_outros, estado_civil,
    situacao, notificacao, estrangeira, estrangeiro, nacional, alt_dhsis, props.user.id]);

  /// image
  useEffect(() => {
    const _temp = [];

    if (props.fotoFichaData.foto) {
      _temp.push(
        <img
          className="rounded-circle img-responsive mt-2"
          alt="Foto do registro"
          width="120"
          height="120"
          src={`data:image/gif;base64,${props.fotoFichaData.foto}`}
        />,
      );
    } else {
      _temp.push(<div className="pt-5 pb-5 mt-3">&nbsp;</div>);
    }
    setImage(_temp);
  }, [props.fotoFichaData.foto]);

  return (
    <Container fluid className="p-0">
      <PageTitle
        history={props.history}
        title="Pessoa Física"
        subtitle="/ Dados pessoais"
        voltar
        linkTo="/cadastro/pessoa-fisica"
      />
      <Row>
        {/*** MENU ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuPFisica {...props} item_1="active" />
        </Col>
        {/*** BODY ***/}
        <Col sm={6} md={6} lg={8} xl={8} className="pl-1">
          <Card className="pessoal-ficha">
            <CardBody>
              <Row>
                {/*** ID ***/}
                <Col sm={3} md={3} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Id</Label>
                    <Input
                      type="text"
                      disabled
                      value={id}
                    />
                  </FormGroup>
                </Col>
                {/*** FORNECEDOR ***/}
                <Col sm={6} md={6} lg={5} xl={6}>
                  <FormGroup className="text-right">
                    <Label>Fornecedor</Label>
                    <Checkbox
                      checked={fornecedor}
                      info="Sim"
                      onClick={(e) => setFornecedor(e.target.checked)}
                    />
                  </FormGroup>
                </Col>
                {/*** ESTRANGEIRA ***/}
                <Col sm={3} md={3} lg={1} xl={1}>
                  <FormGroup className="text-right">
                    <Label>Estrangeira</Label>
                    <Checkbox
                      onClick={(e) => handleEstrangeira(e.target.checked)}
                      info="Sim"
                      checked={estrangeira}
                    />
                  </FormGroup>
                </Col>
                {/*** NOTIFICACAO ***/}
                <Col sm={9} md={9} lg={3} xl={2}>
                  <FormGroup className="text-right">
                    <Label>Notificação</Label>
                    {/*<Checkbox  info="Sim, receber notificações" id="pfisica-ficha-notificacao" name="pfisica-ficha-notificacao" /> */}
                    <Checkbox
                      type="text"
                      info="Sim, receber notificações"
                      value={notificacao}
                    />
                  </FormGroup>
                </Col>
                {/*** SITUACAO ***/}
                <Col sm={3} md={3} lg={1} xl={1}>
                  <FormGroup className="text-right">
                    <Label>Situação</Label>

                    <Checkbox
                      info="Ativo"
                      checked={situacao}
                      onClick={(e) => setSituacao(e.target.checked)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                {/*** NOME COMPLETO ***/}
                <Col sm={12} md={12} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Nome Completo</Label>
                    <Input
                      type="text"
                      value={nome_completo}
                      className="required"
                      maxLength={60}
                      onChange={(e) => setNome_completo(e.target.value)}
                      onChangeCapture={(e) => handleNomeReserva(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** NOME RESERVA ***/}
                <Col sm={6} md={6} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Nome p/ reserva</Label>
                    <Input
                      type="text"
                      value={nome_reserva}
                      className="required"
                      maxLength={60}
                      onChange={(e) => setNome_reserva(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** NOME CRACHÁ ***/}
                <Col sm={6} md={6} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Nome p/ Crachá</Label>
                    <Input
                      type="text"
                      value={nome_cracha}
                      className="required"
                      maxLength={30}
                      onChange={(e) => setNome_cracha(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                {/*** DADOS NACIONAIS ***/}
                {/*** RG ***/}
                <Col sm={6} md={6} lg={3} xl={3} className={nacional}>
                  <FormGroup>
                    <Label>RG</Label>
                    <Input
                      type="text"
                      value={rg}
                      maxLength={15}
                      onChange={(e) => setRg(formatRG(e.target.value))}
                    />
                  </FormGroup>
                </Col>
                {/*** CPF ***/}
                <Col sm={6} md={6} lg={3} xl={3} className={nacional}>
                  <FormGroup>
                    <Label>CPF</Label>
                    <Input
                      type="text"
                      value={cpf}
                      id="pfisica-ficha-cpf"
                      maxLength={14}
                      onChange={(e) => setCpf(formatCPF(e.target.value))}
                    />
                  </FormGroup>
                </Col>
                {/*** RNE - OCULTO ***/}
                <Col sm={6} md={6} lg={3} xl={3} className={estrangeiro}>
                  <FormGroup>
                    <Label>RNE</Label>
                    <Input
                      type="text"
                      value={rne}
                      maxLength={20}
                      onChange={(e) => setRne(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** CAMPO VAZIO - OCULTO ***/}
                <Col sm={6} md={6} lg={3} xl={3} className="hide" />
                {/*** NACIONALIDADE ***/}
                <Col sm={6} md={6} lg={3} xl={3}>
                  <FormGroup>
                    <Label>Nacionalidade</Label>
                    <AutoCompletarV2
                      {...props}
                      value={nacionalidade}
                      valueId={nac_id_pais}
                      tabela="PAIS"
                      campo="NACIONALIDADE"
                      disabled={false}
                      visible
                      editar={{ id, value: nacionalidade, valueId: nac_id_pais }}
                    />

                  </FormGroup>
                </Col>
                {/*** AEROPORTO PRÓXIMO ***/}
                <Col sm={6} md={6} lg={3} xl={3}>
                  <FormGroup>
                    <Label>Aeroporto próximo</Label>
                    <AutoCompletarV2
                      {...props}
                      value={pro_aeroporto}
                      valueId={pro_id_aeroporto}
                      tabela="AEROPORTO"
                      campo=""
                      disabled={false}
                      visible
                      editar={{ id, value: pro_aeroporto, valueId: pro_id_aeroporto }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                {/*** DATA NASCIMENTO ***/}
                <Col sm={6} md={6} lg={3} xl={3}>
                  <FormGroup>
                    <Label>Data Nascimento</Label>
                    <Input
                      type="date"
                      value={dt_nascimento}
                      onChange={(e) => setDt_nascimento(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** ESTADO CIVIL ***/}
                <Col sm={6} md={6} lg={3} xl={3}>
                  <FormGroup>
                    <Label>Estado Civil</Label>
                    <Input
                      type="select"
                      value={estado_civil}
                      dados={props.estadoCivil}
                      config={props}
                      action="@GET_ESTADO_CIVIL"
                      onChange={(e) => setEstado_civil(e.target.value)}
                    >
                      <option value="0" selected>Selecione...</option>
                      { estadoCivil }
                    </Input>
                  </FormGroup>
                </Col>
                {/*** GENERO ***/}
                <Col sm={6} md={6} lg={3} xl={3}>
                  <FormGroup>
                    <Label>Gênero</Label>
                    <Input
                      type="select"
                      value={genero}
                      dados={props.sexo}
                      config={props}
                      action="@GET_SEXO"
                      onChange={(e) => setGenero(e.target.value)}
                    >
                      <option value="0" selected>Selecione...</option>
                      { sexo }
                    </Input>
                  </FormGroup>
                </Col>
                {/*** GENERO OUTROS ***/}
                <Col sm={6} md={6} lg={3} xl={3} className={colgen_outros}>
                  <FormGroup>
                    <Label>&nbsp;</Label>
                    <Input
                      type="text"
                      maxLength={30}
                      value={gen_outros}
                      onChange={(e) => setGen_outros(e.target.value)}
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
                {/*** SAVE BUTTON ***/}
                <SaveButton save={() => savePFisicaPessoal(props, form)} />
              </Row>
            </CardBody>
          </Card>
        </Col>

        {/*** FOTO ***/}
        <Col sm={3} md={3} lg={2} xl={2} className="pl-1">
          <Card className="pessoal-ficha">
            <CardBody>
              <Row>
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
                <Col>
                  <div className="text-center">
                    { image }
                    <div className="mt-3 mb-3">
                      <Button onClick={() => uploadFoto()} color="primary">
                        <FontAwesomeIcon icon={faUpload} />
                        {' '}
Upload
                      </Button>
                      <form encType="multipart/form-data" action="/upload/image" method="post">
                        <input
                          id="image-file"
                          type="file"
                          className="hide"
                          onChange={() => getFotoData(props.match.params.id, props)}
                        />
                      </form>
                    </div>
                    <small>
                        Configuração mínima:
                      {' '}
                      <br />
                      {' '}
120px x 120px
                      {' '}
                      <br />
                      {' '}
formato .jpg
                    </small>
                  </div>
                </Col>
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
  pessoalFichaData: state.pFisica.pessoalFichaData,

  fotoFichaData: state.pFisica.fotoFichaData,
  fotoFichaFlag: state.pFisica.fotoFichaFlag,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  estadoCivil: state.sistema.estadoCivil,
  sexo: state.sistema.sexo,

  autoCompletarId_Aeroporto: state.autoCompletar.autoCompletarId_Aeroporto,
  autoCompletarId_Pais: state.autoCompletar.autoCompletarId_Pais,

});
export default connect(() => (mapState))(FichaDadosPessoais);
