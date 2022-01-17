///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhoneAlt, faBuilding, faMedkit, faFileAlt, faAddressCard, faPlane, faUserAlt, faAddressBook,
} from '@fortawesome/free-solid-svg-icons';

import {
  Container, Row, CardBody, Card, Col, FormGroup, Label, CustomInput,
} from 'reactstrap';
import { SaveButton, PageTitle, TabsProjeto } from '../../../components';
import { getPagina, getDados } from '../../../functions/sistema';
import { configuraGrava } from '../../../functions/hotsite/projeto';
import './style.css';

function Hotsite(props) {
  const { id } = props.match.params;

  const [firstLoad, setFirst] = useState(true);
  const [listaPerfis, setListaPerfis] = useState([]);

  ////// MODULOS
  const [mod_dados_pessoais, set_mod_dados_pessoais] = useState(true);
  const [mod_dados_comerciais, set_mod_dados_comerciais] = useState(false);
  const [mod_contato, set_mod_contato] = useState(true);
  const [mod_endereco, set_mod_endereco] = useState(false);
  const [mod_emergencia, set_mod_emergencia] = useState(false);
  const [mod_passaporte, set_mod_passaporte] = useState(false);
  const [mod_anexo, set_mod_anexo] = useState(false);
  const [mod_perfil, set_mod_perfil] = useState(false);

  ////// CAMPOS
  const [nome_completo] = useState(true);
  const [nome_reserva, set_nome_reserva] = useState(false);
  const [nome_cracha, set_nome_cracha] = useState(false);
  const [rg, set_rg] = useState(false);
  const [cpf] = useState(true);
  const [rne, set_rne] = useState(false);
  const [nacionalidade, set_nacionalidade] = useState(false);
  const [aero_proximo, set_aero_proximo] = useState(false);
  const [dt_nascimento, set_dt_nascimento] = useState(false);
  const [estado_civil, set_estado_civil] = useState(false);
  const [genero, set_genero] = useState(false);

  const [empresa, set_empresa] = useState(false);
  const [profissao, set_profissao] = useState(false);
  const [cargo, set_cargo] = useState(false);

  const [telefone, set_telefone] = useState(false);
  const [celular] = useState(true);
  const [email] = useState(true);
  const [facebook, set_facebook] = useState(false);
  const [instagram, set_instagram] = useState(false);
  const [twitter, set_twitter] = useState(false);

  const [residencial, set_residencial] = useState(false);
  const [comercial, set_comercial] = useState(false);

  const [anexo_foto_pessoal, set_anexo_foto_pessoal] = useState(false);
  const [anexo_rg, set_anexo_rg] = useState(false);
  const [anexo_cpf, set_anexo_cpf] = useState(false);
  const [anexo_passaporte, set_anexo_passaporte] = useState(false);
  const [anexo_visto, set_anexo_visto] = useState(false);

  ////// CAMPOS DOS PERFIS ENVIADOS P/ O WS
  const [campo_regs, set_campo_regs] = useState([]);

  const [form, set_form] = useState([]);

  /// ATUALIZA FORM PARA O GRAVA
  const handlePerfil = useCallback((campo_regs, checked, id) => {
    const _temp = []; /// ARRAY VAZIA
    const permissao = parseInt(id.replace('hotsite-switch-perfil-', ''), 10);

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
      ? set_mod_perfil(true)
      : set_mod_perfil(false);

    set_campo_regs(_temp);
  }, []);

  /// RENDERIZA BOTOES NA TELA
  const updateFicha = useCallback((ficha) => {
    const { modulo_regs } = ficha;

    modulo_regs.forEach((modulo) => {
      const { permissao, acesso } = modulo;
      switch (permissao) {
        case 1: if (acesso) { set_mod_dados_pessoais(true); } break;
        case 2: if (acesso) { set_mod_dados_comerciais(true); } break;
        case 3: if (acesso) { set_mod_contato(true); } break;
        case 4: if (acesso) { set_mod_endereco(true); } break;
        case 5: if (acesso) { set_mod_emergencia(true); } break;
        case 6: if (acesso) { set_mod_passaporte(true); } break;
        case 7: if (acesso) { set_mod_perfil(true); } break;
        case 8: if (acesso) { set_mod_anexo(true); } break;
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
              case 2: set_nome_reserva(acesso); break;
              case 3: set_nome_cracha(acesso); break;
              case 4: set_rg(acesso); break;
              case 6: set_rne(acesso); break;
              case 7: set_nacionalidade(acesso); break;
              case 8: set_aero_proximo(acesso); break;
              case 9: set_dt_nascimento(acesso); break;
              case 10: set_estado_civil(acesso); break;
              case 11: set_genero(acesso); break;
              default: break;
            }
          });
          break;
        case 2:
          campo_regs.forEach((campo) => {
            const { permissao, acesso } = campo;
            switch (permissao) {
              case 1: set_empresa(acesso); break;
              case 2: set_profissao(acesso); break;
              case 3: set_cargo(acesso); break;
              default: break;
            }
          });
          break;
        case 3:
          campo_regs.forEach((campo) => {
            const { permissao, acesso } = campo;
            switch (permissao) {
              case 1: set_telefone(acesso); break;
              case 4: set_facebook(acesso); break;
              case 5: set_instagram(acesso); break;
              case 6: set_twitter(acesso); break;
              default: break;
            }
          });
          break;
        case 4:
          campo_regs.forEach((campo) => {
            const { permissao, acesso } = campo;
            switch (permissao) {
              case 1: set_residencial(acesso); break;
              case 2: set_comercial(acesso); break;
              default: break;
            }
          });
          break;
        case 7:
          ////// PERFIL
          campo_regs.forEach((campo) => {
            const { permissao, acesso } = campo;
            if (acesso) {
              const id = `hotsite-switch-perfil-${permissao}`;
              const element = document.getElementById(id);
              element.checked = acesso;
              handlePerfil([], acesso, id);
            }
          });

          break;
        case 8:
          ////// ANEXO
          campo_regs.forEach((campo) => {
            const { permissao, acesso } = campo;
            switch (permissao) {
              case 1: set_anexo_foto_pessoal(acesso); break;
              case 2: set_anexo_rg(acesso); break;
              case 3: set_anexo_cpf(acesso); break;
              case 4: set_anexo_passaporte(acesso); break;
              case 5: set_anexo_visto(acesso); break;
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

      const ficha = await getDados(props, `/TsmHOTSITE/CONFIGURA_FICHA/${id}`, '');
      updateFicha(ficha);
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
  useEffect(() => {
    nome_completo || nome_reserva || nome_cracha || cpf || rg || rne
      || nacionalidade || aero_proximo || dt_nascimento || estado_civil || genero
      ? set_mod_dados_pessoais(true)
      : set_mod_dados_pessoais(false);
  }, [aero_proximo, cpf, dt_nascimento, estado_civil, genero, nacionalidade, nome_completo, nome_cracha, nome_reserva, rg, rne]);

  ////// MONITORA DADOS COMERCIAIS
  useEffect(() => {
    empresa || profissao || cargo
      ? set_mod_dados_comerciais(true)
      : set_mod_dados_comerciais(false);
  }, [cargo, empresa, profissao]);

  ////// MONITORA ENDERECO
  useEffect(() => {
    residencial || comercial
      ? set_mod_endereco(true)
      : set_mod_endereco(false);
  }, [comercial, residencial]);

  ////// MONITORA ANEXO
  useEffect(() => {
    anexo_foto_pessoal || anexo_rg || anexo_cpf || anexo_passaporte
      ? set_mod_anexo(true)
      : set_mod_anexo(false);
  }, [anexo_cpf, anexo_foto_pessoal, anexo_passaporte, anexo_rg]);

  ////// MONITORA FORM
  useEffect(() => {
    const form = {
      id_projeto: id,
      modulo_regs: [
        {
          permissao: 1,
          descricao: 'DADOS PESSOAIS',
          modulo: 'HST_PERDADPESSOAL',
          acesso: mod_dados_pessoais,
          campo_regs: [
            {
              permissao: 1,
              acesso: nome_completo,
            },
            {
              permissao: 2,
              acesso: nome_reserva,
            },
            {
              permissao: 3,
              acesso: nome_cracha,
            },
            {
              permissao: 4,
              acesso: rg,
            },
            {
              permissao: 5,
              acesso: cpf,
            },
            {
              permissao: 6,
              acesso: rne,
            },
            {
              permissao: 7,
              acesso: nacionalidade,
            },
            {
              permissao: 8,
              acesso: aero_proximo,
            },
            {
              permissao: 9,
              acesso: dt_nascimento,
            },
            {
              permissao: 10,
              acesso: estado_civil,
            },
            {
              permissao: 11,
              acesso: genero,
            },
          ],
        },
        {
          permissao: 2,
          descricao: 'DADOS COMERCIAIS',
          modulo: 'HST_PERDADCOMERCIAL',
          acesso: mod_dados_comerciais,
          campo_regs: [
            {
              permissao: 1,
              acesso: empresa,
            },
            {
              permissao: 2,
              acesso: profissao,
            },
            {
              permissao: 3,
              acesso: cargo,
            },
          ],
        },
        {
          permissao: 3,
          descricao: 'CONTATO',
          modulo: 'HST_PERCONTATO',
          acesso: mod_contato,
          campo_regs: [
            {
              permissao: 1,
              acesso: telefone,
            },
            {
              permissao: 2,
              acesso: celular,
            },
            {
              permissao: 3,
              acesso: email,
            },
            {
              permissao: 4,
              acesso: facebook,
            },
            {
              permissao: 5,
              acesso: instagram,
            },
            {
              permissao: 6,
              acesso: twitter,
            },
          ],
        },
        {
          permissao: 4,
          descricao: 'ENDEREÇO',
          modulo: 'HST_PERENDERECO',
          acesso: mod_endereco,
          campo_regs: [
            {
              permissao: 1,
              acesso: residencial,
            },
            {
              permissao: 2,
              acesso: comercial,
            },
          ],
        },
        {
          permissao: 5,
          descricao: 'EMERGÊNCIA',
          modulo: 'HST_PEREMERGENCIA',
          acesso: mod_emergencia,
          campo_regs: [],
        },
        {
          permissao: 6,
          descricao: 'PASSAPORTE',
          modulo: 'HST_PERPASSAPORTE',
          acesso: mod_passaporte,
          campo_regs: [],
        },
        {
          permissao: 7,
          descricao: 'PERFIL',
          acesso: mod_perfil,
          modulo: 'HST_PERPERFIL',
          campo_regs,
        },
        {
          permissao: 8,
          descricao: 'ANEXO',
          modulo: 'HST_PERANEXO',
          acesso: mod_anexo,
          campo_regs: [
            {
              permissao: 1,
              acesso: anexo_foto_pessoal,
            },
            {
              permissao: 2,
              acesso: anexo_rg,
            },
            {
              permissao: 3,
              acesso: anexo_cpf,
            },
            {
              permissao: 4,
              acesso: anexo_passaporte,
            },
            {
              permissao: 5,
              acesso: anexo_visto,
            },
          ],
        },
      ],
    };
    set_form(form);
  }, [aero_proximo, anexo_cpf, anexo_foto_pessoal, anexo_passaporte, anexo_rg, anexo_visto, campo_regs, cargo, celular, comercial, cpf, dt_nascimento, email, empresa, estado_civil, facebook, genero, id, instagram, mod_anexo, mod_contato, mod_dados_comerciais, mod_dados_pessoais, mod_emergencia, mod_endereco, mod_passaporte, mod_perfil, nacionalidade, nome_completo, nome_cracha, nome_reserva, profissao, residencial, rg, rne, telefone, twitter]);

  return (
    <>
      <Container fluid className="p-0">

        <PageTitle
          history={props.history}
          title="Projeto"
          voltar
          linkTo={`/projeto/painel/${id}/hotsite/ficha`}
        />

        <TabsProjeto ativo={11} props={props} />

        <Row>
          <Col sm={12}>
            <Card>
              <CardBody className="pt-2">
                <Row>

                  {/*** COLUNA MODULOS ***/}
                  {/**********************/}
                  <Col sm={12} md={6} xl={5} className="border-left border-right">
                    <Row>

                      {/*** DADOS PESSOAIS ***/}
                      <Col sm={12}>
                        <Row>

                          {/*** TITULO ***/}
                          <Col sm={12} className="pt-1 pb-1 border-bottom mb-1">
                            <FormGroup className="p-0 m-0">
                              <Label className="mt-1 lead text-muted">
                                <FontAwesomeIcon className="mr-2" icon={faAddressBook} />
                                             Dados Pessoais
                              </Label>
                            </FormGroup>
                          </Col>

                          {/*** NOME COMPLETO ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-nome-completo" className="mt-1">Nome Completo</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-nome-completo"
                                name="hotsite-switch-nome-completo"
                                className="m-0 float-left noselect"
                                checked={nome_completo}
                              />
                            </FormGroup>
                          </Col>

                          {/*** NOME P/ RESERVA ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-nome-reserva" className="mt-1">Nome p/ reserva</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-nome-reserva"
                                name="hotsite-switch-nome-reserva"
                                className="m-0 float-left noselect"
                                checked={nome_reserva}
                                onClick={(e) => set_nome_reserva(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                          {/*** NOME P/ CRACHÁ ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-nome-cracha" className="mt-1">Nome p/ Crachá</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-nome-cracha"
                                name="hotsite-switch-nome-cracha"
                                className="m-0 float-left noselect"
                                checked={nome_cracha}
                                onClick={(e) => set_nome_cracha(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                          {/*** CPF ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-cpf" className="mt-1">CPF</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-cpf"
                                name="hotsite-switch-cpf"
                                className="m-0 float-left noselect"
                                checked={cpf}
                              />
                            </FormGroup>
                          </Col>

                          {/*** RG ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-rg" className="mt-1">RG</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-rg"
                                name="hotsite-switch-rg"
                                className="m-0 float-left noselect"
                                checked={rg}
                                onClick={(e) => set_rg(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                          {/*** RNE ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-rne" className="mt-1">RNE</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-rne"
                                name="hotsite-switch-rne"
                                className="m-0 float-left noselect"
                                checked={rne}
                                onClick={(e) => set_rne(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                          {/*** NACIONALIDADE ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-nacionalidade" className="mt-1">Nacionalidade</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-nacionalidade"
                                name="hotsite-switch-nacionalidade"
                                className="m-0 float-left noselect"
                                checked={nacionalidade}
                                onClick={(e) => set_nacionalidade(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                          {/*** AEROPORTO PRÓXIMO ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-aeroporto-proximo" className="mt-1">Aeroporto próximo</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-aeroporto-proximo"
                                name="hotsite-switch-aeroporto-proximo"
                                className="m-0 float-left noselect"
                                checked={aero_proximo}
                                onClick={(e) => set_aero_proximo(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                          {/*** DATA NASCIMENTO ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-data-nascimento" className="mt-1">Data Nascimento</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-data-nascimento"
                                name="hotsite-switch-data-nascimento"
                                className="m-0 float-left noselect"
                                checked={dt_nascimento}
                                onClick={(e) => set_dt_nascimento(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                          {/*** ESTADO CIVIL ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-estado-civil" className="mt-1">Estado Civil</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-estado-civil"
                                name="hotsite-switch-estado-civil"
                                className="m-0 float-left noselect"
                                checked={estado_civil}
                                onClick={(e) => set_estado_civil(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                          {/*** GÊNERO ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-genero" className="mt-1">Gênero</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-genero"
                                name="hotsite-switch-genero"
                                className="m-0 float-left noselect"
                                checked={genero}
                                onClick={(e) => set_genero(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                        </Row>
                      </Col>

                      {/*** DADOS COMERCIAIS ***/}
                      <Col sm={12}>
                        <Row>

                          {/*** TITULO ***/}
                          <Col sm={12} className="pt-1 pb-1 border-bottom mb-1">
                            <FormGroup className="p-0 m-0">
                              <Label className="mt-1 lead text-muted">
                                <FontAwesomeIcon className="mr-2" icon={faBuilding} />
                                             Dados Comerciais
                              </Label>
                            </FormGroup>
                          </Col>

                          {/*** EMPRESA ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-empresa" className="mt-1">Empresa</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-empresa"
                                name="hotsite-switch-empresa"
                                className="m-0 float-left noselect"
                                checked={empresa}
                                onClick={(e) => set_empresa(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                          {/*** PROFISSAO ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-profissao" className="mt-1">Profissão</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-profissao"
                                name="hotsite-switch-profissao"
                                className="m-0 float-left noselect"
                                checked={profissao}
                                onClick={(e) => set_profissao(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                          {/*** CARGO ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-cargo" className="mt-1">Cargo</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-cargo"
                                name="hotsite-switch-cargo"
                                className="m-0 float-left noselect"
                                checked={cargo}
                                onClick={(e) => set_cargo(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                        </Row>
                      </Col>

                      {/*** CONTATO ***/}
                      <Col sm={12}>
                        <Row>

                          {/*** TITULO ***/}
                          <Col sm={12} className="pt-1 pb-1 border-bottom mb-1">
                            <FormGroup className="p-0 m-0">
                              <Label className="mt-1 lead text-muted">
                                <FontAwesomeIcon className="mr-2" icon={faPhoneAlt} />
                                             Contato
                              </Label>
                            </FormGroup>
                          </Col>

                          {/*** EMAIL ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-email" className="mt-1">Email</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-email"
                                name="hotsite-switch-email"
                                className="m-0 float-left noselect"
                                checked={email}
                              />
                            </FormGroup>
                          </Col>

                          {/*** TELEFONE ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-telefone" className="mt-1">Telefone</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-telefone"
                                name="hotsite-switch-telefone"
                                className="m-0 float-left noselect"
                                checked={telefone}
                                onClick={(e) => set_telefone(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                          {/*** CELULAR ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-celular" className="mt-1">Celular</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-celular"
                                name="hotsite-switch-celular"
                                className="m-0 float-left noselect"
                                checked={celular}
                              />
                            </FormGroup>
                          </Col>

                          {/*** FACEBOOK ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-facebook" className="mt-1">Facebook</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-facebook"
                                name="hotsite-switch-facebook"
                                className="m-0 float-left noselect"
                                checked={facebook}
                                onClick={(e) => set_facebook(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                          {/*** INSTAGRAM ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-instagram" className="mt-1">Instagram</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-instagram"
                                name="hotsite-switch-instagram"
                                className="m-0 float-left noselect"
                                checked={instagram}
                                onClick={(e) => set_instagram(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                          {/*** TWITTER ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-twitter" className="mt-1">Twitter</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-twitter"
                                name="hotsite-switch-twitter"
                                className="m-0 float-left noselect"
                                checked={twitter}
                                onClick={(e) => set_twitter(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                        </Row>
                      </Col>

                      {/*** ENDEREÇO ***/}
                      <Col sm={12}>
                        <Row>

                          {/*** TITULO ***/}
                          <Col sm={12} className="pt-1 pb-1 border-bottom mb-1">
                            <FormGroup className="p-0 m-0">
                              <Label className="mt-1 lead text-muted">
                                <FontAwesomeIcon className="mr-2" icon={faAddressCard} />
                                             Endereço
                              </Label>
                            </FormGroup>
                          </Col>

                          {/*** RESIDENCIAL ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-recidencial" className="mt-1">Residencial</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-recidencial"
                                name="hotsite-switch-recidencial"
                                className="m-0 float-left noselect"
                                checked={residencial}
                                onClick={(e) => set_residencial(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                          {/*** COMERCIAL ***/}
                          <Col sm={4} md={6} lg={4} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-comercial" className="mt-1">Comercial</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-comercial"
                                name="hotsite-switch-comercial"
                                className="m-0 float-left noselect"
                                checked={comercial}
                                onClick={(e) => set_comercial(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                        </Row>
                      </Col>

                      {/*** EMERGÊNCIA ***/}
                      <Col sm={12}>
                        <Row>

                          {/*** TITULO ***/}
                          <Col sm={12} className="pt-1 pb-1 border-bottom mb-1">
                            <FormGroup className="p-0 m-0">
                              <Label className="mt-1 lead text-muted">
                                <FontAwesomeIcon className="mr-2" icon={faMedkit} />
                                             Emergência
                              </Label>
                            </FormGroup>
                          </Col>

                          <Col sm={12} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-emergencia" className="mt-1">Exibir formulário de dados de emergência.</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-emergencia"
                                name="hotsite-switch-emergencia"
                                className="m-0 float-left noselect"
                                checked={mod_emergencia}
                                onClick={(e) => set_mod_emergencia(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                        </Row>
                      </Col>

                      {/*** PASSAPORTE ***/}
                      <Col sm={12}>
                        <Row>

                          {/*** TITULO ***/}
                          <Col sm={12} className="pt-1 pb-1 border-bottom mb-1">
                            <FormGroup className="p-0 m-0">
                              <Label className="mt-1 lead text-muted">
                                <FontAwesomeIcon className="mr-2" icon={faPlane} />
                                             Passaporte
                              </Label>
                            </FormGroup>
                          </Col>

                          <Col sm={12} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-passaporte" className="mt-1">Exibir dados do passaporte padrão.</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-passaporte"
                                name="hotsite-switch-passaporte"
                                className="m-0 float-left noselect"
                                checked={mod_passaporte}
                                onClick={(e) => set_mod_passaporte(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                        </Row>
                      </Col>

                      {/*** ANEXOS ***/}
                      <Col sm={12}>
                        <Row>

                          {/*** TITULO ***/}
                          <Col sm={12} className="pt-1 pb-1 border-bottom mb-1">
                            <FormGroup className="p-0 m-0">
                              <Label className="mt-1 lead text-muted">
                                <FontAwesomeIcon className="mr-2" icon={faFileAlt} />
                                             Anexos (upload de imagens)
                              </Label>
                            </FormGroup>
                          </Col>

                          <Col sm={3} md={6} lg={3} className="pt-1 pb-0 hide">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-anexo-foto-pessoal" className="mt-1">Foto pessoal</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-anexo-foto-pessoal"
                                name="hotsite-switch-anexo-foto-pessoal"
                                className="m-0 float-left noselect"
                                checked={anexo_foto_pessoal}
                                onClick={(e) => set_anexo_foto_pessoal(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                          <Col sm={3} md={6} lg={3} className="pt-1 pb-0 hide">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-anexo-rg" className="mt-1">RG</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-anexo-rg"
                                name="hotsite-switch-anexo-rg"
                                className="m-0 float-left noselect"
                                checked={anexo_rg}
                                onClick={(e) => set_anexo_rg(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                          <Col sm={3} md={6} lg={3} className="pt-1 pb-0 hide">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-anexo-cpf" className="mt-1">CPF</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-anexo-cpf"
                                name="hotsite-switch-anexo-cpf"
                                className="m-0 float-left noselect"
                                checked={anexo_cpf}
                                onClick={(e) => set_anexo_cpf(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                          <Col sm={3} md={6} lg={3} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-anexo-passaporte" className="mt-1">Passaporte</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-anexo-passaporte"
                                name="hotsite-switch-anexo-passaporte"
                                className="m-0 float-left noselect"
                                checked={anexo_passaporte}
                                onClick={(e) => set_anexo_passaporte(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                          <Col sm={3} md={6} lg={3} className="pt-1 pb-0">
                            <FormGroup className="p-0 m-0">
                              <Label for="hotsite-switch-anexo-visto" className="mt-1">Visto</Label>
                              <CustomInput
                                type="switch"
                                id="hotsite-switch-anexo-visto"
                                name="hotsite-switch-anexo-visto"
                                className="m-0 float-left noselect"
                                checked={anexo_visto}
                                onClick={(e) => set_anexo_visto(e.target.checked)}
                              />
                            </FormGroup>
                          </Col>

                        </Row>
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
                              <Label for={`hotsite-switch-perfil-${item.id}`} className="mt-1">{ item.descricao }</Label>
                              <CustomInput
                                type="switch"
                                id={`hotsite-switch-perfil-${item.id}`}
                                name={`hotsite-switch-perfil-${item.id}`}
                                className="m-0 float-left noselect"
                                onChange={(e) => handlePerfil(campo_regs, e.target.checked, `hotsite-switch-perfil-${item.id}`)}
                              />
                            </FormGroup>
                          </Col>
                        ))
                      }

                    </Row>

                  </Col>

                </Row>

                {/*** SAVE BUTTON ***/}
                <SaveButton save={() => configuraGrava(form, props)} />

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
export default connect(() => (mapState))(Hotsite);
