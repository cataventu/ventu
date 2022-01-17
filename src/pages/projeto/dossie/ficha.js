///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhoneAlt, faBuilding, faUsers, faUserTie, faFileInvoice, faMedkit, faFileAlt, faAddressCard, faPlane, faUserAlt, faAddressBook, faCalendarAlt, faPeopleCarry, faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  Container, Row, CardBody, Card, Col, FormGroup, Label, CustomInput,
} from 'reactstrap';
import { consultaDossie } from '../../../functions/projeto/dossie';
import {
  SaveButton, PageTitle, TabsProjeto, Buttons,
} from '../../../components';
import { getPagina } from '../../../functions/sistema';

import './style.css';
//import { faEarlybirds } from '@fortawesome/free-brands-svg-icons';

function Dossie(props) {
  const id_projeto = props.match.params.id;
  const { id } = props.match.params;

  const [firstLoad, setFirst] = useState(true);
  const [listaPerfis, setListaPerfis] = useState([]);

  ////// MODULOS
  //const [mod_dados_projeto, set_dados_projeto] = useState(true);
  //const [mod_participante, set_participante] = useState(false);
  //const [mod_participante_tag, set_mod_participante_tag] = useState(true);
  //const [mod_endereco, set_endereco] = useState(false);
  //const [mod_emergencia, set_emergencia] = useState(false);
  //const [mod_passaporte, set_passaporte] = useState(false);
  //const [mod_anexo, set_anexo] = useState(false);

  ////// CAMPOS
  const [dados_do_projeto] = useState(true);
  const [aprovado, set_aprovado] = useState(false);
  const [participante, set_participante] = useState(false);
  const [malas, set_malas] = useState(false);
  const [perfil, set_perfil] = useState(false);
  const [aniversariante, set_aniversariante] = useState(false);
  const [melhoridade, set_melhoridade] = useState(false);
  const [emergencia, set_emergencia] = useState(false);
  const [despertar, set_despertar] = useState(false);
  const [voos, set_voos] = useState(false);
  const [passaporte, set_passaporte] = useState(false);
  const [tm, set_tm] = useState(false);
  const [ver_flag_privado, set_ver_flag_privado] = useState('hide');
  const [flag_privado, set_flag_privado] = useState(false);
  const [fornecedor, set_fornecedor] = useState(false);

  ////// CAMPOS DOS PERFIS ENVIADOS P/ O WS
  const [campo_regs, set_campo_regs] = useState([]);

  const [form, set_form] = useState([]);

  /// VISIBILIDADE DO PRIVADO TM
  useEffect(() => {
    if (tm === true) { set_ver_flag_privado(''); } else { set_ver_flag_privado('hide'); }
  }, [tm]);

  /// ATUALIZA FORM PARA O GRAVA
  const handlePerfil = useCallback((campo_regs, checked, id) => {
    const _temp = []; /// ARRAY VAZIA
    const permissao = parseInt(id.replace('dossie-switch-perfil-', ''), 10);

    /// VERIFICAR OUTROS CAMPOS JÁ MARCADOS
    campo_regs.forEach((marcado) => {
      const { permissao: id_perfil } = marcado;
      if (id_perfil !== permissao) { _temp.push(marcado); }
    });

    /// VERIFICA PERFIL CLICADO
    if (checked) {
      _temp.push({
        permissao,
        acesso: true,
      });
    }

    _temp.length > 0
      ? set_perfil(true)
      : set_perfil(false);

    set_campo_regs(_temp);
  }, []);

  /// RENDERIZA BOTOES NA TELA
  const updateFicha = useCallback((ficha) => {
    const { modulo_regs } = ficha;

    modulo_regs.forEach((modulo) => {
      const { permissao, acesso } = modulo;
      switch (permissao) {
        //case 1: if (acesso) { set_dados_projeto(true); } break;
        //case 2: if (acesso) { set_participante(true); } break;
        //case 3: if (acesso) { set_participante_tag(true); } break;
        //case 4: if (acesso) { set_endereco(true); } break;
        //case 5: if (acesso) { set_emergencia(true); } break;
        //case 6: if (acesso) { set_passaporte(true); } break;
        case 7: if (acesso) { set_perfil(true); } break;
          //case 8: if (acesso) { set_anexo(true); } break;
        default: break;
      }
    });

    modulo_regs.forEach((modulo) => {
      const { permissao, campo_regs } = modulo;
      switch (permissao) {
        case 1:
          campo_regs.forEach((campo) => {
            const { permissao, acesso } = campo;
            switch (permissao) {
              //case 2: set_nome_reserva(acesso); break;

              default: break;
            }
          });
          break;
        case 2:
          campo_regs.forEach((campo) => {
            const { permissao, acesso } = campo;
            switch (permissao) {
              //case 1: set_participante(acesso); break;
              //case 2: set_profissao(acesso); break;
              //case 3: set_cargo(acesso); break;
              default: break;
            }
          });
          break;
        case 3:
          campo_regs.forEach((campo) => {
            const { permissao, acesso } = campo;
            switch (permissao) {
              //case 1: set_participante_tag(acesso); break;
              //case 4: set_facebook(acesso); break;
              //case 5: set_instagram(acesso); break;
              //case 6: set_twitter(acesso); break;
              default: break;
            }
          });
          break;
        case 4:
          campo_regs.forEach((campo) => {
            const { permissao, acesso } = campo;
            switch (permissao) {
              //case 1: set_residencial(acesso); break;
              //case 2: set_comercial(acesso); break;
              default: break;
            }
          });
          break;
        case 7:
          ////// PERFIL
          campo_regs.forEach((campo) => {
            const { permissao, acesso } = campo;
            if (acesso) {
              //const id = `dossie-switch-perfil-${permissao}`;
              //const element = document.getElementById(id);
              //element.checked = acesso;
              handlePerfil([], acesso, id);
            }
          });

          break;
        case 8:
          ////// ANEXO
          campo_regs.forEach((campo) => {
            const { permissao, acesso } = campo;
            switch (permissao) {
              //case 1: set_foto_pessoal(acesso); break;
              //case 2: set_rg(acesso); break;
              //case 3: set_cpf(acesso); break;
              //case 4: set_passaporte(acesso); break;
              //case 5: set_visto(acesso); break;
              default: break;
            }
          });
          break;

        default: break;
      }
    });
  }, [handlePerfil]);

  const getPerfil = useCallback((id) => {
    async function getPerfil(id) {
      const filtro = {
        chave: '',
        descricao: '',
        tipo: '',
        situacao: '',
        alt_dhsis_maior: '',
        alt_dhsis_menor: '',
      };
      const res = await getPagina(props, '/TsmPERFIL/PAGINA', '', filtro, '');
      setListaPerfis(res);

      //const ficha = await getDados(props, `/Tsmdossie/CONFIGURA_FICHA/${id}`, '');
      //updateFicha(ficha);
    }
    getPerfil(id);
  }, [props, updateFicha]);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      getPerfil(id);
      setFirst(false);
    }
  }, [firstLoad, id, getPerfil]);

  ////// MONITORA DADOS PESSOAIS
  //useEffect(() => {
  //nome_completo || nome_reserva || nome_cracha || cpf || rg || rne
  //|| nacionalidade || aero_proximo || dt_nascimento || estado_civil || genero
  //? set_dados_projeto(true)
  //: set_dados_projeto(false);
  //}, [aero_proximo, cpf, dt_nascimento, estado_civil, genero, nacionalidade, nome_completo, nome_cracha, nome_reserva, rg, rne]);

  //////// MONITORA DADOS COMERCIAIS
  //useEffect(() => {
  //participante || profissao || cargo
  //? set_participante(true)
  //: set_participante(false);
  //}, [cargo, participante, profissao]);

  //////// MONITORA ENDERECO
  //useEffect(() => {
  //residencial || comercial
  //? set_endereco(true)
  //: set_endereco(false);
  //}, [comercial, residencial]);

  //////// MONITORA ANEXO
  //useEffect(() => {
  //foto_pessoal || rg || cpf || passaporte
  //? set_anexo(true)
  //: set_anexo(false);
  //}, [cpf, foto_pessoal, passaporte, rg]);

  //////// MONITORA FORM
  useEffect(() => {
    set_form({
      id_projeto,
      aprovado,
      voos,
      participante,
      perfil,
      //dperfil,
      campo_regs,
      aniversariante,
      malas,
      melhoridade,
      emergencia,
      despertar,
      passaporte,
      tm,
      flag_privado,
      fornecedor,
    });
  }, [id_projeto, aprovado, voos, participante, campo_regs, malas, aniversariante, melhoridade, emergencia, despertar,
    passaporte, tm, flag_privado, fornecedor]);

  return (
    <>
      <Container fluid className="p-0">

        <PageTitle
          history={props.history}
          title="Projeto"
          voltar
          linkTo="/projeto/painel"
        />

        <TabsProjeto ativo={12} props={props} />

        <Row>
          <Col sm={12}>
            <Card>
              <CardBody className="pt-2">
                <Row>

                  {/*** COLUNA MODULOS ***/}
                  {/**********************/}
                  <Col sm={12} md={6} xl={5} className="border-left border-right">
                    <Row>

                      {/*** DADOS projeto ***/}
                      <Col sm={12}>
                        <Row>

                          {/*** Dados do Projeto ***/}
                          <Col sm={12} className="pt-1 pb-1 border-bottom mb-1">
                            <FormGroup className="p-0 m-0">
                              <Label className="mt-1 lead text-muted">
                                <FontAwesomeIcon className="mr-2" icon={faFileInvoice} />
                                             Dados do Projeto
                              </Label>
                            </FormGroup>
                          </Col>

                          {/*** Dados do Projeto ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="dossie-switch-dados-do-projeto" className="mt-1">Dados do Projeto</Label>
                              <CustomInput
                                type="switch"
                                id="dossie-switch-dados-do-projeto"
                                name="dossie-switch-dados-do-projeto"
                                className="m-0 float-left noselect"
                                checked={dados_do_projeto}
                                disable
                              />
                            </FormGroup>
                          </Col>
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="dossie-switch-aprovado" className="mt-1">Aprovado</Label>
                              <CustomInput
                                type="switch"
                                id="dossie-switch-aprovado"
                                name="dossie-switch-aprovado"
                                className="m-0 float-left noselect"
                                checked={aprovado}
                                onClick={(e) => set_aprovado(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>
                          {/*** DADOS PARTICIPANTE ***/}
                          <Col sm={12}>
                            <Row>

                              {/*** TITULO ** */}
                              <Col sm={12} className="pt-1 pb-1 border-bottom mb-1">
                                <FormGroup className="p-0 m-0">
                                  <Label className="mt-1 lead text-muted">
                                    <FontAwesomeIcon className="mr-2" icon={faUsers} />
                                Participantes
                                  </Label>
                                </FormGroup>
                              </Col>
                            </Row>
                          </Col>
                          {/*** participante_tag ***/}
                          <Col sm={4} md={4} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="dossie-switch-participante_tag" className="mt-1">Participantes #tag #alpha</Label>
                              <CustomInput
                                type="switch"
                                id="dossie-switch-participante_tag"
                                name="dossie-switch-participante_tag"
                                className="m-0 float-left noselect"
                                checked={participante}
                                onClick={(e) => set_participante(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>
                          {/*** aniversariante ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="dossie-switch-aniversariante" className="mt-1">Aniversariantes</Label>
                              <CustomInput
                                type="switch"
                                id="dossie-switch-aniversariante"
                                name="dossie-switch-aniversariante"
                                className="m-0 float-left noselect"
                                checked={aniversariante}
                                onClick={(e) => set_aniversariante(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>
                          {/*** Idoso ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="dossie-switch-melhoridade" className="mt-1">Jovens e Melhor Idade</Label>
                              <CustomInput
                                type="switch"
                                id="dossie-switch-melhoridade"
                                name="dossie-switch-melhoridade"
                                className="m-0 float-left noselect"
                                checked={melhoridade}
                                onClick={(e) => set_melhoridade(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>
                          {/*** despertar ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="dossie-switch-despertar" className="mt-1">Despertar</Label>
                              <CustomInput
                                type="switch"
                                id="dossie-switch-despertar"
                                name="dossie-switch-despertar"
                                className="m-0 float-left noselect"
                                checked={despertar}
                                onClick={(e) => set_despertar(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="dossie-switch-emergencia" className="mt-1">Emergência</Label>
                              <CustomInput
                                type="switch"
                                id="dossie-switch-emergencia"
                                name="dossie-switch-emergencia"
                                className="m-0 float-left noselect"
                                checked={emergencia}
                                onClick={(e) => set_emergencia(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>
                          {/*** malas ***/}
                          <Col sm={4} md={4} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="dossie-switch-malas" className="mt-1">Malas</Label>
                              <CustomInput
                                type="switch"
                                id="dossie-switch-malas"
                                name="dossie-switch-malas"
                                className="m-0 float-left noselect"
                                checked={malas}
                                onClick={(e) => set_malas(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                          {/*** Passaportes ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="dossie-switch-passaporte" className="mt-1">Passaportes</Label>
                              <CustomInput
                                type="switch"
                                id="dossie-switch-passaporte"
                                name="dossie-switch-passaporte"
                                className="m-0 float-left noselect"
                                checked={passaporte}
                                onClick={(e) => set_passaporte(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>

                      {/*** Voo ***/}
                      <Col sm={12} className="pt-1 pb-1 border-bottom mb-1">
                        <FormGroup className="p-0 m-0">
                          <Label className="mt-1 lead text-muted">
                            <FontAwesomeIcon className="mr-2" icon={faUserTie} />
                                            Serviços
                          </Label>
                        </FormGroup>
                      </Col>

                      {/*** Voos ***/}
                      <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                        <FormGroup className="p-0 m-0">
                          <Label for="dossie-switch-voos" className="mt-1">Voos</Label>
                          <CustomInput
                            type="switch"
                            id="dossie-switch-voos"
                            name="dossie-switch-voos"
                            className="m-0 float-left noselect"
                            checked={voos}
                            onClick={(e) => set_voos(e.target.checked)}
                          />
                        </FormGroup>
                      </Col>

                      {/*** Fornecedor ***/}
                      <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                        <FormGroup className="p-0 m-0">
                          <Label for="dossie-switch-fornecedor" className="mt-1">Fornecedor</Label>
                          <CustomInput
                            type="switch"
                            id="dossie-switch-fornecedor"
                            name="dossie-switch-fornecedor"
                            className="m-0 float-left noselect"
                            checked={fornecedor}
                            onClick={(e) => set_fornecedor(e.target.checked)}
                          />
                        </FormGroup>
                      </Col>
                      {/*** Voo ***/}
                      <Col sm={12} className="pt-1 pb-1 border-bottom mb-1">
                        <FormGroup className="p-0 m-0">
                          <Label className="mt-1 lead text-muted">
                            <FontAwesomeIcon className="mr-2" icon={faCalendarAlt} />
                                            Eventos
                          </Label>
                        </FormGroup>
                      </Col>

                      {/*** tm ***/}
                      <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                        <FormGroup className="p-0 m-0">
                          <Label for="dossie-switch-tm" className="mt-1">Tempos e Movimentos</Label>
                          <CustomInput
                            type="switch"
                            id="dossie-switch-tm"
                            name="dossie-switch-tm"
                            className="m-0 float-left noselect"
                            checked={tm}
                            onClick={(e) => set_tm(e.target.checked)}
                          />
                        </FormGroup>
                      </Col>
                      {/*** flag_privado ***/}

                      <Col sm={4} md={6} lg={4} className={`pt-1 pb-0 ${ver_flag_privado}`}>
                        <FormGroup className="p-0 m-0">
                          <Label for="dossie-switch-flag_privado" className="mt-1">Privado</Label>
                          <CustomInput
                            type="switch"
                            id="dossie-switch-flag_privado"
                            name="dossie-switch-flag_privado"
                            className="m-0 float-left noselect"
                            checked={flag_privado}
                            onClick={(e) => set_flag_privado(e.target.checked)}
                          />
                        </FormGroup>
                      </Col>

                    </Row>
                  </Col>

                  {/*** COLUNA PERFIL ***/}
                  {/*********************/}
                  <Col sm={12} md={6} xl={7} className="border-left border-right">

                    <Row>

                      {/*** TITULO ***/}
                      <Col sm={12} className="pt-1 pb-1 border-bottom mb-1">
                        <FormGroup className="p-0 m-0">
                          <Label className="mt-1 lead text-muted">
                            <FontAwesomeIcon className="mr-2" icon={faUserAlt} />
                                       Perfis
                          </Label>
                        </FormGroup>
                      </Col>

                      {
                        !!listaPerfis && listaPerfis.map((item) => (
                          <Col sm={12} lg={6} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for={`dossie-switch-perfil-${item.id}`} className="mt-1">{ item.descricao }</Label>
                              <CustomInput
                                type="switch"
                                id={`dossie-switch-perfil-${item.id}`}
                                name={`dossie-switch-perfil-${item.id}`}
                                className="m-0 float-left noselect"
                                onChange={(e) => handlePerfil(campo_regs, e.target.checked, `dossie-switch-perfil-${item.id}`)}
                              />
                            </FormGroup>

                          </Col>
                        ))
                      }

                      {/*** TITULO ***/}
                      <Col sm={12} className="pt-1 pb-1 border-bottom mb-1">
                        <FormGroup className="p-0 m-0">
                          <Label className="mt-1 lead text-muted">
                            <FontAwesomeIcon className="mr-2" />

                          </Label>
                        </FormGroup>
                      </Col>
                      <Col sm={12} lg={6} className="pt-1 pb-0">

                        {/*** BOTAO ***/}

                        {/*<Col sm={4} className="text-right pb-3 border-1"> */}
                        <div className="dossie-save-button-container text-right p-3">
                          <Buttons
                            permission={props}
                            title="Consultar dossiê"
                            description="Consultar dossiê"
                            onClick={() => consultaDossie(props, id_projeto, form)}

                            color="info"
                          />
                        </div>

                        {/*</Col> */}
                        {/*</Row> */}
                        {/*</Col> */}
                      </Col>

                    </Row>

                  </Col>

                </Row>
                {/*** SAVE BUTTON ** */}
                {/*<SaveButton save={() => consultaDossie(form, props)} /> */}
                {/*** SAVE BUTTON ***/}

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
  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(Dossie);
