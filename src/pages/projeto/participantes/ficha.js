///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, CardBody, Card, Col, FormGroup, Input, Label,
} from 'reactstrap';
import moment from 'moment';
import {
  SaveButton, PageTitle, CardHeaderName, TabsProjeto, AutoCompletarV2,
} from '../../../components';
import {
  formatData, formatDataInput, getDados, formatNomeReserva,
} from '../../../functions/sistema';
import { saveParticipante, resetParticipantes } from '../../../functions/projeto/participantes';

function ParticipantesFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const [listaAtuacao, setListaAtuacao] = useState([]);

  const [id, setId] = useState('');
  const [tag, setTag] = useState('');
  const [id_participante, setId_Participante] = useState(0);
  const [par_nome_completo, setNomeCompleto] = useState('');
  const [par_nome_reserva, setNomeReserva] = useState('');
  const [atuacao, setAtuacao] = useState('');
  const [id_acompanhante, setId_Acompanhante] = useState(0);
  const [aco_nome_completo, setAcompanhante] = useState('');
  const [aco_nome_reserva, setNomeReservaAcompanhante] = useState('');
  const [id_municipio, setId_Municipio] = useState(0);
  const [municipio, setMunicipio] = useState('');
  const [check_in, setCheckIn] = useState('');
  const [check_out, setCheckOut] = useState('');
  const [observacao, setObservacao] = useState('');

  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  const handleNomeReserva = useCallback((value, id) => {
    switch (id) {
      case 1: setNomeReserva(formatNomeReserva(value)); break;
      case 2: setNomeReservaAcompanhante(formatNomeReserva(value)); break;
      default:
    }
  }, []);

  useEffect(() => {
    const id = props.match.params.idParticipante;
    if (firstLoad) {
      resetParticipantes(props);

      const arrayAtuacao = [];
      props.atuacao_participante.forEach((item) => {
        arrayAtuacao.push(<option value={item.id}>{ item.descricao }</option>);
      });

      setListaAtuacao(arrayAtuacao);

      if (id > 0) { getDados(props, `/tsmPARTICIPANTE/Ficha/${id}`, '@GET_PARTICIPANTES_FICHA', id); }
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, tag, id_participante, par_nome_completo, par_nome_reserva, atuacao, id_mun_origem,
      mun_origem, check_in, check_out, id_acompanhante, aco_nome_completo, aco_nome_reserva, notas, alt_dhsis,
    } = props.fichaData;

    if (id > 0) {
      setId(id);

      setTag(tag);
      setId_Participante(id_participante);
      setNomeCompleto(par_nome_completo);
      setNomeReserva(par_nome_reserva);
      setAtuacao(atuacao);

      setId_Municipio(id_mun_origem);
      setMunicipio(mun_origem);
      setCheckIn(formatDataInput(check_in));
      setCheckOut(formatDataInput(check_out));

      setAcompanhante(aco_nome_completo);
      setId_Acompanhante(id_acompanhante);
      setNomeReservaAcompanhante(aco_nome_reserva);
      setObservacao(notas);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.fichaData]);

  useEffect(() => {
    setForm({
      id,
      id_participante,
      id_projeto: props.match.params.id,
      tag,
      par_nome_reserva,
      atuacao,
      id_mun_origem: id_municipio,
      check_in: formatData(check_in),
      check_out: formatData(check_out),
      id_acompanhante,
      aco_nome_reserva,
      notas: observacao,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, tag, id_participante, par_nome_reserva, atuacao, id_municipio,
    check_in, check_out, id_acompanhante, aco_nome_reserva, observacao, alt_dhsis,
    props.user.id, props.match.params.id]);

  useEffect(() => {
    setId_Municipio(props.autoCompletarId_Municipio);
  }, [props.autoCompletarId_Municipio]);

  useEffect(() => {
    setId_Participante(props.autoCompletarId_Pfisica);
  }, [props.autoCompletarId_Pfisica, handleNomeReserva]);

  useEffect(() => {
    setId_Acompanhante(props.autoCompletarId_Acompanhante);
  }, [props.autoCompletarId_Acompanhante, handleNomeReserva]);

  useEffect(() => {
    setNomeReserva(props.autoCompletarNomeReservaPFisica);
  }, [props.autoCompletarNomeReservaPFisica]);

  useEffect(() => {
    setNomeReservaAcompanhante(props.autoCompletarNomeReservaAcompanhante);
  }, [props.autoCompletarNomeReservaAcompanhante]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle
          history={props.history}
          title="Projeto"
          subtitle="/ Participantes / Cadastrar"
          voltar
          linkTo="/projeto/painel"
        />

        <TabsProjeto ativo={4} props={props} />

        <Row>
          <Col sm={12}>
            <Card>
              <CardBody className="pb-0">

                <CardHeaderName {...props} titulo={props.nomeProjeto} label="Projeto:" />

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
                  {/*** TAG ***/}
                  <Col sm={2} md={2} lg={1} xl={1}>
                    <FormGroup>
                      <Label>Tag</Label>
                      <Input
                        type="text"
                        step={1}
                        className="required"
                        maxLength={3}
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  {/*** NOME COMPLETO ***/}
                  <Col sm={8} md={5} lg={5} xl={5}>
                    <FormGroup>
                      <Label>Nome Completo</Label>
                      <AutoCompletarV2
                        {...props}
                        value={par_nome_completo}
                        valueId={id_participante}
                        tabela="PFISICA"
                        campo=""
                        disabled={false}
                        visible
                        editar={{ id, value: par_nome_completo, valueId: id_participante }}
                        nomeReserva
                      />
                    </FormGroup>
                  </Col>
                  {/*** NOME RESERVA ***/}
                  <Col sm={6} md={3} lg={3} xl={3}>
                    <FormGroup>
                      <Label>Nome Reserva</Label>
                      <Input
                        type="text"
                        className="required"
                        maxLength={30}
                        value={par_nome_reserva}
                        onChange={(e) => setNomeReserva(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  {/*** ATUAÇÃO ***/}
                  <Col sm={6} md={3} lg={2} xl={3}>
                    <FormGroup>
                      <Label>Atuação</Label>
                      <Input
                        type="select"
                        className="required"
                        value={atuacao}
                        onChange={(e) => setAtuacao(e.target.value)}
                      >
                        <option value="0">Selecione...</option>
                        { listaAtuacao }
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
                <Row>
                  {/*** MUNICIPIO ***/}
                  <Col sm={6} md={5} lg={4} xl={4}>
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
                  {/*** CHECK IN ***/}
                  <Col sm={3} md={3} lg={2} xl={2}>
                    <FormGroup>
                      <Label>Check in</Label>
                      <Input
                        type="date"
                        value={check_in}
                        onChange={(e) => setCheckIn(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  {/*** CHECK OUT ***/}
                  <Col sm={3} md={3} lg={2} xl={2}>
                    <FormGroup>
                      <Label>Check out</Label>
                      <Input
                        type="date"
                        value={check_out}
                        onChange={(e) => setCheckOut(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
                <Row>
                  {/*** ACOMPANHANTE ***/}
                  <Col sm={6} md={4} lg={4} xl={4}>
                    <FormGroup>
                      <Label>Acompanhante</Label>
                      <AutoCompletarV2
                        {...props}
                        value={aco_nome_completo}
                        valueId={id_acompanhante}
                        tabela="ACOMPANHANTE"
                        campo=""
                        disabled={false}
                        visible
                        editar={{ id, value: aco_nome_completo, valueId: id_acompanhante }}
                        nomeReserva
                      />
                    </FormGroup>
                  </Col>
                  {/*** NOME RESERVA ***/}
                  <Col sm={6} md={3} lg={3} xl={3}>
                    <FormGroup>
                      <Label>Nome Reserva</Label>
                      <Input
                        type="text"
                        maxLength={30}
                        value={aco_nome_reserva}
                        onChange={(e) => setNomeReservaAcompanhante(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  {/*** OBSERVAÇÃO ***/}
                  <Col sm={12} md={5} lg={5} xl={5}>
                    <FormGroup>
                      <Label>Observação</Label>
                      <Input
                        type="text"
                        className="obs"
                        value={observacao}
                        onChange={(e) => setObservacao(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  {/*** DHSIS***/}
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
                  <SaveButton save={() => saveParticipante(props, form)} />
                </Row>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  nomeProjeto: state.projeto.nomeProjeto,
  fichaData: state.participantes.fichaData,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  atuacao_participante: state.sistema.atuacao_participante,
  auth: state.sistema.auth,

  user: state.usuario.fichaData,

  autoCompletarId_Pfisica: state.autoCompletar.autoCompletarId_Pfisica,
  autoCompletarId_Acompanhante: state.autoCompletar.autoCompletarId_Acompanhante,
  autoCompletarId_Municipio: state.autoCompletar.autoCompletarId_Municipio,

  autoCompletarNomeReservaPFisica: state.autoCompletar.autoCompletarNomeReservaPFisica,
  autoCompletarNomeReservaAcompanhante: state.autoCompletar.autoCompletarNomeReservaAcompanhante,
});
export default connect(() => (mapState))(ParticipantesFicha);
