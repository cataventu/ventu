///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardBody, Col, FormGroup, Input, Label, Row, Container,
} from 'reactstrap';
import moment from 'moment';
import {
  CardHeaderName, MenuPFisica, PageTitle, AutoCompletarV2, SaveButton, Checkbox,
} from '../../../../components';
import { getPFisicaRServicoFicha, savePFisicaRServico, getPFisicaPessoalFicha } from '../../../../functions/cadastro/pessoa-fisica';
import { getDados, formatDataInput } from '../../../../functions/sistema';

function FichaServico(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id, setId] = useState(0);

  const [id_pfisica, setId_pfisica] = useState(0);
  const [id_pjuridica, setId_pjuridica] = useState(0);
  const [nome, setNome] = useState('');

  const [id_servico, setId_servico] = useState(0);
  const [tipo_servico, setTipo_servico] = useState(0);
  const [servico, setServico] = useState('');
  const [colcodigo, setColCodigo] = useState('hide');

  const [tipo_serv, setTipo_serv] = useState([]);

  const [cod_ciaaerea, setCod_ciaaerea] = useState('');
  const [pag_prazo, setPag_prazo] = useState(0);
  const [pag_criterio, setPag_criterio] = useState(0);
  const [dpag_criterio, setDpag_criterio] = useState('');

  const [rec_prazo, setRec_prazo] = useState(0);
  const [rec_criterio, setRec_criterio] = useState(0);
  const [drec_criterio, setDrec_criterio] = useState('');

  const [pagrec_criterio, setPagrec_criterio] = useState([]);

  const [gera_pagto, setGera_pagto] = useState(true);
  const [observacao, setObservacao] = useState('');

  const [form, setForm] = useState({});

  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const handleServico = useCallback((value) => {
    setTipo_servico(value);
    if (parseInt(value, 10) === 1) {
      setColCodigo('show');
    } else {
      setColCodigo('hide');
    }
  }, []);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      const ID_RServico = props.match.params.idRServico;
      setId_pfisica(id);
      getDados(props, '/TsmSISTEMA/TIPO_SERVICO_TABELA/', '@GET_TIPO_SERVICO');
      getDados(props, '/TsmSISTEMA/CRITERIO_PAGREC_TABELA/', '@GET_CRITERIO_PAGREC');

      getPFisicaPessoalFicha(props, id);

      if (ID_RServico > 0) { getPFisicaRServicoFicha(props, ID_RServico); }
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    handleServico(tipo_servico);
  }, [tipo_servico, handleServico]);

  //EDITAR
  useEffect(() => {
    const {
      id, id_pfisica, id_pjuridica, nome, id_servico, tipo_servico, servico, cod_ciaaerea,
      pag_prazo, pag_criterio, dpag_criterio, rec_prazo, rec_criterio, drec_criterio,
      gera_pagto, observacao, alt_dhsis,
    } = props.rservicoFichaData;

    if (id > 0) {
      setId(id);
      setId_pfisica(id_pfisica);
      setId_pjuridica(id_pjuridica);
      setNome(nome);

      setId_servico(id_servico);
      setTipo_servico(tipo_servico);
      setServico(servico);

      setCod_ciaaerea(cod_ciaaerea);

      setPag_prazo(pag_prazo);
      setPag_criterio(pag_criterio);
      setDpag_criterio(dpag_criterio);

      setRec_prazo(rec_prazo);
      setRec_criterio(rec_criterio);
      setDrec_criterio(drec_criterio);

      setGera_pagto(gera_pagto);
      setObservacao(observacao);

      handleServico(handleServico);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.rservicoFichaData, handleServico]);

  //lista
  useEffect(() => {
    const arrayTipo_serv = [];
    props.tipo_servico.forEach((item) => {
      arrayTipo_serv.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });
    setTipo_serv(arrayTipo_serv);
  }, [props.tipo_servico]);

  //lista CRITERIO PAG REC
  useEffect(() => {
    const arrayPagrec_criterio = [];
    props.criterio_pagrec.forEach((item) => {
      arrayPagrec_criterio.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });
    setPagrec_criterio(arrayPagrec_criterio);
  }, [props.criterio_pagrec]);

  useEffect(() => {
    setId_servico(props.autoCompletarId_RServico);
  }, [props.autoCompletarId_RServico]);

  useEffect(() => {
    setForm({
      id,
      id_pfisica,
      id_pjuridica,
      nome,
      id_servico,
      tipo_servico,
      servico,
      cod_ciaaerea,
      pag_prazo,
      pag_criterio,
      dpag_criterio,
      rec_prazo,
      rec_criterio,
      drec_criterio,
      gera_pagto,
      observacao,

      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, id_pfisica, id_pjuridica, nome, id_servico, tipo_servico, servico, cod_ciaaerea,
    pag_prazo, pag_criterio, dpag_criterio, rec_prazo, rec_criterio, drec_criterio,
    gera_pagto, observacao, alt_dhsis, props.user.id, props.autoCompletar_RServico]);

  return (
    <Container fluid className="p-0">
      <PageTitle
        title="Pessoa Física"
        subtitle="/ Cadastrar Serviço"
        voltar
        history={props.history}
      />
      <Row>
        {/*** MENU ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuPFisica {...props} item_13="active" />
        </Col>
        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
          <Card>
            <CardBody className="pb-1">
              {/*** CARD HEADER ***/}
              <CardHeaderName {...props} titulo={props.pessoalFichaData.nome_completo} />
              <Row>
                {/*** ID ***/}
                <Col sm={0} md={0} lg={0} xl={0} className="hide">
                  <FormGroup>
                    <Label>Id</Label>
                    <Input
                      type="text"
                      disabled
                      value={id}
                    />
                  </FormGroup>
                </Col>
                {/***tipo SERVICO ** */}
                <Col sm={4} md={4} lg={2} xl={2}>
                  <FormGroup>
                    <Label>tipo Serviço</Label>
                    <Input
                      type="select"
                      className="required"
                      value={tipo_servico}
                      onChange={(e) => setTipo_servico(e.target.value)}
                    >
                      <option value="0" selected>Selecione...</option>
                      { tipo_serv }
                    </Input>
                  </FormGroup>
                </Col>
                {/*** SERVICO ** */}
                <Col sm={4} md={4} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Serviço</Label>
                    <AutoCompletarV2
                      {...props}
                      className="required"
                      value={servico}
                      valueId={id_servico}
                      tabela="RSERVICO"
                      campo={tipo_servico}
                      disabled={false}
                      visible
                      editar={{ id, value: servico, valueId: id_servico }}
                    />
                  </FormGroup>
                </Col>

                {/*** COD CIA AEREA ***/}
                <Col sm={3} md={3} lg={2} xl={2} className={colcodigo}>
                  <FormGroup>
                    <Label>Cód Cia Aérea</Label>
                    <Input
                      type="text"
                      value={cod_ciaaerea}
                      maxLength={2}
                      onChange={(e) => setCod_ciaaerea(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                {/*** PAGAMENTO ***/}
                <Col sm={12} md={12} lg={12} xl={12}>
                  <FormGroup>
                    <Label className="h5 text-roxo-ventu">Pagamento</Label>
                  </FormGroup>
                </Col>

                {/*** GERA PAGTO ***/}
                <Col sm={3} md={3} lg={2} xl={2}>
                  <FormGroup className="text-right">
                    <Label>Gera Pgto</Label>
                    <Checkbox //checked = {gera_pagto}
                      info="Sim"
                      checked={gera_pagto}
                      onClick={(e) => setGera_pagto(e.target.checked)}
                    />

                  </FormGroup>
                </Col>
                {/*** PRAZO PAGTO ***/}
                <Col sm={2} md={2} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Prazo</Label>
                    <Input
                      type="text"
                      value={pag_prazo}
                      maxLength={3}
                      onChange={(e) => setPag_prazo(e.target.value)}

                    />
                  </FormGroup>
                </Col>
                {/*** CRITERIO PAGTO ***/}
                <Col sm={6} md={6} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Critério</Label>
                    <Input
                      type="select"
                      className="required"
                      value={pag_criterio}
                      onChange={(e) => setPag_criterio(e.target.value)}
                    >
                      <option value="0">Selecione...</option>
                      {pagrec_criterio}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={12} lg={12} xl={12}>
                  <hr marginLeft={50} />
                </Col>
              </Row>
              <Row>
                {/*** RECEBIMENTO ***/}
                <Col sm={12} md={12} lg={12} xl={12}>
                  <FormGroup>
                    <Label className="h5 text-roxo-ventu">Recebimento</Label>
                  </FormGroup>
                </Col>
                {/*** COLUNA VAZIA ***/}
                <Col sm={3} md={3} lg={2} xl={2}>
                  <FormGroup className="text-right">
                    <Label />
                  </FormGroup>
                </Col>
                {/*** PRAZO PAGTO ***/}
                <Col sm={2} md={2} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Prazo</Label>
                    <Input
                      type="text"
                      value={rec_prazo}
                      maxLength={3}
                      onChange={(e) => setRec_prazo(e.target.value)}

                    />
                  </FormGroup>
                </Col>
                {/*** CRITERIO PAGTO ***/}
                <Col sm={6} md={6} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Critério</Label>
                    <Input
                      type="select"
                      className="required"
                      value={rec_criterio}
                      onChange={(e) => setRec_criterio(e.target.value)}
                    >
                      <option value="0">Selecione...</option>
                      {pagrec_criterio}
                    </Input>
                  </FormGroup>
                </Col>

                {/*** OBSERVACAO ***/}
                <Col sm={12} md={12} lg={12} xl={12}>
                  <Label>Observação</Label>
                  <FormGroup>
                    <Input
                      type="textarea"
                      maxLength={2000}
                      value={observacao}
                      onChange={(e) => setObservacao(e.target.value)}
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
                <SaveButton save={() => savePFisicaRServico(props, form)} />
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
  rservicoFichaData: state.pFisica.rservicoFichaData,
  pessoalFichaData: state.pFisica.pessoalFichaData,
  criterio_pagrec: state.sistema.criterio_pagrec,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  tipo_servico: state.sistema.tipo_servico,

  autoCompletarId_RServico: state.autoCompletar.autoCompletarId_RServico,
  visibilityPageCadastro: state.usuario.visibilityPageCadastro,
});
export default connect(() => (mapState))(FichaServico);
