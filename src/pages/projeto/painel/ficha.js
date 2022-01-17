///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, CardBody, Card, Col, FormGroup, Input, Label,
} from 'reactstrap';
import moment from 'moment';
import {
  BannerProjeto, TabsProjeto, PageTitle, SaveButton, AutoCompletarV2,
} from '../../../components';
import {
  formatData, formatDataInput, getDados, getCurrentDate,
} from '../../../functions/sistema';
import { getProjetoFicha, saveProjeto } from '../../../functions/projeto';

function Painel(props) {
  const { id: id_projeto } = props.match.params;

  const [firstLoad, setFirst] = useState(true);
  const [listaStatus, setListaStatus] = useState([]);
  const [listaTipo, setlistaTipo] = useState([]);

  const [id, setId] = useState('');
  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [vagas, setVagas] = useState('');
  const [dt_inicio, setDtInicio] = useState('');
  const [dt_termino, setDtFim] = useState('');
  const [status, setStatus] = useState('');
  const [tipo, setTipo] = useState('');
  const [fuso, setFuso] = useState('');

  const [res_id_pfisica, setRes_id_pfisica] = useState(0);
  const [sol_id_pfisica, setSol_id_pfisica] = useState(0);

  const [res_nome_pessoa, setRes_nome_pessoa] = useState('');
  const [sol_nome_pessoa, setSol_nome_pessoa] = useState('');

  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  useEffect(() => {
    async function getListas() {
      const listaTipos = await getDados(props, '/TsmSISTEMA/TIPO_PROJETO_TABELA', '@GET_TIPO_PROJETO');
      const listaStatus = await getDados(props, '/TsmSISTEMA/STATUS_PROJETO_TABELA', '@GET_STATUS_PROJETO');

      setListaStatus(listaStatus);
      setlistaTipo(listaTipos);
    }

    if (firstLoad) {
      const { id } = props.match.params;
      setId(id);

      setDtInicio(formatDataInput(getCurrentDate()));
      setDtFim(formatDataInput(getCurrentDate()));

      getListas();
      if (id > 0) { getProjetoFicha(props, id); }
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, codigo, descricao, status, tipo, fuso, dt_inicio, dt_termino, vagas,
      res_id_pfisica, sol_id_pfisica, res_nome_pessoa, sol_nome_pessoa, alt_dhsis,
    } = props.FichaData;

    if (id > 0) {
      setId(id);
      setCodigo(codigo);
      setDescricao(descricao);
      setRes_id_pfisica(res_id_pfisica);
      setSol_id_pfisica(sol_id_pfisica);
      setRes_nome_pessoa(res_nome_pessoa);
      setSol_nome_pessoa(sol_nome_pessoa);
      setStatus(status);
      setTipo(tipo);
      setFuso(fuso);
      setDtInicio(formatDataInput(dt_inicio));
      setDtFim(formatDataInput(dt_termino));
      setVagas(vagas);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.FichaData]);

  useEffect(() => {
    setRes_id_pfisica(props.autoCompletarId_Pfisica);
  }, [props.autoCompletarId_Pfisica]);

  useEffect(() => {
    setSol_id_pfisica(props.autoCompletarId_Solicitante);
  }, [props.autoCompletarId_Solicitante]);

  useEffect(() => {
    setForm({
      id,
      codigo,
      descricao,
      res_id_pfisica,
      res_nome_pessoa,
      sol_id_pfisica,
      sol_nome_pessoa,
      vagas,
      tipo,
      fuso,
      dt_inicio: formatData(dt_inicio),
      dt_termino: formatData(dt_termino),
      status,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, codigo, descricao, res_id_pfisica, res_nome_pessoa,
    sol_id_pfisica, sol_nome_pessoa, vagas, dt_inicio, dt_termino,
    status, tipo, fuso, alt_dhsis, props.user.id]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle
          history={props.history}
          title="Projeto"
          voltar
          linkTo="/projeto/painel"
        />

        <TabsProjeto ativo={1} props={props} />

        <Row>
          <Col sm={12}>
            <Card>
              <CardBody className="pb-0">
                <Row>

                  { /*** BANNER *******************/
                    parseInt(id_projeto, 10) > 0
                      ? <BannerProjeto {...props} />
                      : null
                  }

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
                  {/*** NOME DO PROJETO ***/}
                  <Col sm={4} md={4} lg={5} xl={4}>
                    <FormGroup>
                      <Label>Descrição</Label>
                      <Input
                        type="text"
                        className="required"
                        maxLength={60}

                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  {/*** CODIGO ***/}
                  <Col sm={3} md={3} lg={2} xl={2}>
                    <FormGroup>
                      <Label>Código</Label>
                      <Input
                        type="text"
                        className="required"
                        maxLength={30}
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  {/*** TIPO ***/}
                  <Col sm={3} md={3} lg={2} xl={2}>
                    <FormGroup>
                      <Label>Tipo</Label>
                      <Input
                        type="select"
                        className="required"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                      >
                        <option value="0">Selecione...</option>
                        {
                          !!listaTipo && listaTipo.map((tipo) => (
                            <option value={tipo.id}>{ tipo.descricao }</option>
                          ))
                        }
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  {/*** VAGAS ***/}
                  <Col sm={3} md={3} lg={1} xl={1}>
                    <FormGroup>
                      <Label>Vagas</Label>
                      <Input
                        type="number"
                        step={1}
                        maxLength={60}
                        value={vagas}
                        onChange={(e) => setVagas(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  {/*** DATA INICIO ***/}
                  <Col sm={3} md={3} lg={2} xl={2}>
                    <FormGroup>
                      <Label>Data Início</Label>
                      <Input
                        type="date"
                        className="required"
                        value={dt_inicio}
                        onChange={(e) => setDtInicio(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  {/*** DATA FIM ***/}
                  <Col sm={3} md={3} lg={2} xl={2}>
                    <FormGroup>
                      <Label>Data Fim</Label>
                      <Input
                        type="date"
                        className="required"
                        value={dt_termino}
                        onChange={(e) => setDtFim(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  {/*** STATUS ***/}
                  <Col sm={3} md={3} lg={2} xl={2}>
                    <FormGroup>
                      <Label>Status</Label>
                      <Input
                        type="select"
                        className="required"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="0">Selecione...</option>
                        {
                          !!listaStatus && listaStatus.map((status) => (
                            <option value={status.id}>{ status.descricao }</option>
                          ))
                        }
                      </Input>
                    </FormGroup>
                  </Col>
                  {/*** FUSO ***/}
                  <Col sm={8} md={10} lg={3} xl={3}>
                    <FormGroup>
                      <Label>Fuso Horário</Label>
                      <Input
                        type="text"
                        className=""
                        maxLength={200}
                        value={fuso}
                        onChange={(e) => setFuso(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  {/*** RESPONSAVEL ***/}
                  <Col sm={8} md={5} lg={5} xl={5}>
                    <FormGroup>
                      <Label>Responsável</Label>
                      <AutoCompletarV2
                        {...props}
                        value={res_nome_pessoa}
                        valueId={res_id_pfisica}
                        tabela="PFISICA"
                        campo=""
                        disabled={false}
                        visible
                        editar={{ id: res_id_pfisica, value: res_nome_pessoa, valueId: res_id_pfisica }}
                      />
                    </FormGroup>
                  </Col>

                  {/*** SOLICITANTE ***/}
                  <Col sm={8} md={5} lg={5} xl={5}>
                    <FormGroup>
                      <Label>Solicitante</Label>
                      <AutoCompletarV2
                        {...props}
                        value={sol_nome_pessoa}
                        valueId={sol_id_pfisica}
                        tabela="SOLICITANTE"
                        campo=""
                        disabled={false}
                        visible
                        editar={{ id: sol_id_pfisica, value: sol_nome_pessoa, valueId: sol_id_pfisica }}
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

                  {/*** SAVE BUTTON ***/}
                  <SaveButton save={() => saveProjeto(props, form)} />
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
  status_projeto: state.sistema.status_projeto,
  tipo_projeto: state.sistema.tipo_projeto,
  FichaData: state.projeto.projetoFichaData,

  autoCompletarId_Pfisica: state.autoCompletar.autoCompletarId_Pfisica,
  autoCompletarId_Solicitante: state.autoCompletar.autoCompletarId_Solicitante,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(Painel);
