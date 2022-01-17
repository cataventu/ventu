///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row,
  Nav, NavItem, NavLink, TabContent, TabPane, CustomInput,
} from 'reactstrap';
import moment from 'moment';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Checkbox, PageTitle, SaveButton } from '../../../components';
import { saveUsuario } from '../../../functions/sistema/usuario';
import { newFormatCelular, getDados, formatDataInput } from '../../../functions/sistema';
import './style.css';

///////// FICHA /////////////////
/////////////////////////////////
function UsuarioFicha(props) {
  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const { history } = props;
  const { id: id_usuario } = props.match.params;
  const { id: id_user_logado } = props.user;
  const altura_linha = 36;

  const class_active = 'bg-primary text-white';
  const class_inactive = 'bg-white text-dark';

  ////// NAVEGACAO ENTRE TABS
  const [activeTab, set_activeTab] = useState('1');
  const [tab1, set_tab1] = useState(class_active);
  const [tab2, set_tab2] = useState(class_inactive);

  ////// TAB 01
  const [firstLoad, set_firstLoad] = useState(true);

  const [id] = useState(id_usuario);
  const [nome, set_nome] = useState('');
  const [email, set_email] = useState('');
  const [celular, set_celular] = useState('');
  const [situacao, set_situacao] = useState(false);

  ////// TAB 02
  const [modulo_regs, set_modulo_regs] = useState('');
  const [ultimo_modulo_selecionado, set_ultimo_modulo_selecionado] = useState('');
  const [ultima_linha_selecionada, set_ultima_linha_selecionada] = useState('');

  ////// VARIAVEIS MODULO
  const [mod_cadastro, set_mod_cadastro] = useState({});
  const [mod_tabelas, set_mod_tabelas] = useState({});
  const [mod_projeto, set_mod_projeto] = useState({});
  const [mod_financeiro, set_mod_financeiro] = useState({});
  const [mod_sistema, set_mod_sistema] = useState({});

  ////// VARIAVEIS POR PAGINA
  const [mod_cad_pfisica, set_mod_cad_pfisica] = useState({});
  const [mod_cad_pjuridica, set_mod_cad_pjuridica] = useState({});

  const [mod_tab_aeroporto, set_mod_tab_aeroporto] = useState({});
  const [mod_tab_municipio, set_mod_tab_municipio] = useState({});
  const [mod_tab_pais, set_mod_tab_pais] = useState({});
  const [mod_tab_perfil, set_mod_tab_perfil] = useState({});
  const [mod_tab_profissao, set_mod_tab_profissao] = useState({});
  const [mod_tab_ramoatividade, set_mod_tab_ramoatividade] = useState({});
  const [mod_tab_servico, set_mod_tab_servico] = useState({});
  const [mod_tab_tipocartao, set_mod_tab_tipocartao] = useState({});

  const [mod_proj_painel, set_mod_proj_painel] = useState({});

  const [mod_fin_cambio, set_mod_fin_cambio] = useState({});
  const [mod_fin_cartaocorp, set_mod_fin_cartaocorp] = useState({});
  const [mod_fin_conta, set_mod_fin_conta] = useState({});
  const [mod_fin_fixo, set_mod_fin_fixo] = useState({});
  const [mod_fin_grupo, set_mod_fin_grupo] = useState({});
  const [mod_fin_moeda, set_mod_fin_moeda] = useState({});
  const [mod_fin_movimento, set_mod_fin_movimento] = useState({});
  const [mod_fin_subgrupo, set_mod_fin_subgrupo] = useState({});

  const [mod_sis_anexo, set_mod_sis_anexo] = useState({});
  const [mod_sis_ocorrencia, set_mod_sis_ocorrencia] = useState({});
  const [mod_sis_parametro, set_mod_sis_parametro] = useState({});
  const [mod_sis_usuario, set_mod_sis_usuario] = useState({});

  ////// VARIAVEIS FUNCOES
  const [pfisica_incluir, set_pfisica_incluir] = useState({});
  const [pfisica_editar, set_pfisica_editar] = useState({});
  const [pfisica_excluir, set_pfisica_excluir] = useState({});
  const [pfisica_consultar, set_pfisica_consultar] = useState({});
  const [pfisica_anexar, set_pfisica_anexar] = useState({});
  const [pfisica_excel, set_pfisica_excel] = useState({});
  const [pfisica_ocorrencia, set_pfisica_ocorrencia] = useState({});
  const [pfisica_dashboard, set_pfisica_dashboard] = useState({});
  const [pfisica_cartao, set_pfisica_cartao] = useState({});
  const [pfisica_contato, set_pfisica_contato] = useState({});
  const [pfisica_endereco, set_pfisica_endereco] = useState({});
  const [pfisica_passaporte, set_pfisica_passaporte] = useState({});
  const [pfisica_perfil, set_pfisica_perfil] = useState({});
  const [pfisica_servico, set_pfisica_servico] = useState({});
  const [pfisica_visto, set_pfisica_visto] = useState({});

  const [pjuridica_incluir, set_pjuridica_incluir] = useState({});
  const [pjuridica_editar, set_pjuridica_editar] = useState({});
  const [pjuridica_excluir, set_pjuridica_excluir] = useState({});
  const [pjuridica_consultar, set_pjuridica_consultar] = useState({});
  const [pjuridica_anexar, set_pjuridica_anexar] = useState({});
  const [pjuridica_excel, set_pjuridica_excel] = useState({});
  const [pjuridica_ocorrencia, set_pjuridica_ocorrencia] = useState({});
  const [pjuridica_dashboard, set_pjuridica_dashboard] = useState({});
  const [pjuridica_cartao, set_pjuridica_cartao] = useState({});
  const [pjuridica_contato, set_pjuridica_contato] = useState({});
  const [pjuridica_endereco, set_pjuridica_endereco] = useState({});
  const [pjuridica_servico, set_pjuridica_servico] = useState({});

  const [aeroporto_incluir, set_aeroporto_incluir] = useState({});
  const [aeroporto_editar, set_aeroporto_editar] = useState({});
  const [aeroporto_excluir, set_aeroporto_excluir] = useState({});
  const [aeroporto_consultar, set_aeroporto_consultar] = useState({});
  const [aeroporto_excel, set_aeroporto_excel] = useState({});

  const [municipio_incluir, set_municipio_incluir] = useState({});
  const [municipio_editar, set_municipio_editar] = useState({});
  const [municipio_excluir, set_municipio_excluir] = useState({});
  const [municipio_consultar, set_municipio_consultar] = useState({});
  const [municipio_excel, set_municipio_excel] = useState({});

  const [pais_incluir, set_pais_incluir] = useState({});
  const [pais_editar, set_pais_editar] = useState({});
  const [pais_excluir, set_pais_excluir] = useState({});
  const [pais_consultar, set_pais_consultar] = useState({});
  const [pais_excel, set_pais_excel] = useState({});

  const [perfil_incluir, set_perfil_incluir] = useState({});
  const [perfil_editar, set_perfil_editar] = useState({});
  const [perfil_excluir, set_perfil_excluir] = useState({});
  const [perfil_consultar, set_perfil_consultar] = useState({});
  const [perfil_excel, set_perfil_excel] = useState({});

  const [profissao_incluir, set_profissao_incluir] = useState({});
  const [profissao_editar, set_profissao_editar] = useState({});
  const [profissao_excluir, set_profissao_excluir] = useState({});
  const [profissao_consultar, set_profissao_consultar] = useState({});
  const [profissao_excel, set_profissao_excel] = useState({});

  const [ramoatividade_incluir, set_ramoatividade_incluir] = useState({});
  const [ramoatividade_editar, set_ramoatividade_editar] = useState({});
  const [ramoatividade_excluir, set_ramoatividade_excluir] = useState({});
  const [ramoatividade_consultar, set_ramoatividade_consultar] = useState({});
  const [ramoatividade_excel, set_ramoatividade_excel] = useState({});

  const [servico_incluir, set_servico_incluir] = useState({});
  const [servico_editar, set_servico_editar] = useState({});
  const [servico_excluir, set_servico_excluir] = useState({});
  const [servico_consultar, set_servico_consultar] = useState({});
  const [servico_excel, set_servico_excel] = useState({});

  const [tipocartao_incluir, set_tipocartao_incluir] = useState({});
  const [tipocartao_editar, set_tipocartao_editar] = useState({});
  const [tipocartao_excluir, set_tipocartao_excluir] = useState({});
  const [tipocartao_consultar, set_tipocartao_consultar] = useState({});
  const [tipocartao_excel, set_tipocartao_excel] = useState({});

  const [painel_incluir, set_painel_incluir] = useState({});
  const [painel_editar, set_painel_editar] = useState({});
  const [painel_excluir, set_painel_excluir] = useState({});
  const [painel_consultar, set_painel_consultar] = useState({});
  const [painel_anexar, set_painel_anexar] = useState({});
  const [painel_excel, set_painel_excel] = useState({});
  const [painel_dashboard, set_painel_dashboard] = useState({});
  const [painel_gerente, set_painel_gerente] = useState({});
  const [painel_contratante, set_painel_contratante] = useState({});
  const [painel_orcamento, set_painel_orcamento] = useState({});
  const [painel_rsvp, set_painel_rsvp] = useState({});
  const [painel_participante, set_painel_participante] = useState({});
  const [painel_servico, set_painel_servico] = useState({});
  const [painel_ocorrencia, set_painel_ocorrencia] = useState({});
  const [painel_roominglist, set_painel_roominglist] = useState({});
  const [painel_tempomov, set_painel_tempomov] = useState({});
  const [painel_financeiro, set_painel_financeiro] = useState({});

  const [cambio_incluir, set_cambio_incluir] = useState({});
  const [cambio_editar, set_cambio_editar] = useState({});
  const [cambio_excluir, set_cambio_excluir] = useState({});
  const [cambio_consultar, set_cambio_consultar] = useState({});
  const [cambio_excel, set_cambio_excel] = useState({});

  const [cartaocorp_incluir, set_cartaocorp_incluir] = useState({});
  const [cartaocorp_editar, set_cartaocorp_editar] = useState({});
  const [cartaocorp_excluir, set_cartaocorp_excluir] = useState({});
  const [cartaocorp_consultar, set_cartaocorp_consultar] = useState({});
  const [cartaocorp_excel, set_cartaocorp_excel] = useState({});

  const [conta_incluir, set_conta_incluir] = useState({});
  const [conta_editar, set_conta_editar] = useState({});
  const [conta_excluir, set_conta_excluir] = useState({});
  const [conta_consultar, set_conta_consultar] = useState({});
  const [conta_anexar, set_conta_anexar] = useState({});
  const [conta_excel, set_conta_excel] = useState({});
  const [conta_admin, set_conta_admin] = useState({});

  const [fixo_incluir, set_fixo_incluir] = useState({});
  const [fixo_editar, set_fixo_editar] = useState({});
  const [fixo_excluir, set_fixo_excluir] = useState({});
  const [fixo_consultar, set_fixo_consultar] = useState({});
  const [fixo_excel, set_fixo_excel] = useState({});
  const [fixo_gerar, set_fixo_gerar] = useState({});

  const [grupo_incluir, set_grupo_incluir] = useState({});
  const [grupo_editar, set_grupo_editar] = useState({});
  const [grupo_excluir, set_grupo_excluir] = useState({});
  const [grupo_consultar, set_grupo_consultar] = useState({});
  const [grupo_excel, set_grupo_excel] = useState({});

  const [moeda_incluir, set_moeda_incluir] = useState({});
  const [moeda_editar, set_moeda_editar] = useState({});
  const [moeda_excluir, set_moeda_excluir] = useState({});
  const [moeda_consultar, set_moeda_consultar] = useState({});
  const [moeda_excel, set_moeda_excel] = useState({});
  const [moeda_admin, set_moeda_admin] = useState({});

  const [movimento_incluir, set_movimento_incluir] = useState({});
  const [movimento_editar, set_movimento_editar] = useState({});
  const [movimento_excluir, set_movimento_excluir] = useState({});
  const [movimento_consultar, set_movimento_consultar] = useState({});
  const [movimento_anexar, set_movimento_anexar] = useState({});
  const [movimento_agrupar, set_movimento_agrupar] = useState({});
  const [movimento_parcelar, set_movimento_parcelar] = useState({});
  const [movimento_excel, set_movimento_excel] = useState({});
  const [movimento_admin, set_movimento_admin] = useState({});
  const [movimento_dashboard, set_movimento_dashboard] = useState({});
  const [movimento_rel_contato, set_movimento_rel_contato] = useState({});
  const [movimento_rel_dre, set_movimento_rel_dre] = useState({});
  const [movimento_rel_anual, set_movimento_rel_anual] = useState({});
  const [movimento_rel_mensal, set_movimento_rel_mensal] = useState({});
  const [movimento_rel_fluxocaixa, set_movimento_rel_fluxocaixa] = useState({});
  const [movimento_rel_transacao, set_movimento_rel_transacao] = useState({});

  const [subgrupo_incluir, set_subgrupo_incluir] = useState({});
  const [subgrupo_editar, set_subgrupo_editar] = useState({});
  const [subgrupo_excluir, set_subgrupo_excluir] = useState({});
  const [subgrupo_consultar, set_subgrupo_consultar] = useState({});
  const [subgrupo_excel, set_subgrupo_excel] = useState({});

  const [anexo_incluir, set_anexo_incluir] = useState({});
  const [anexo_editar, set_anexo_editar] = useState({});
  const [anexo_excluir, set_anexo_excluir] = useState({});
  const [anexo_consultar, set_anexo_consultar] = useState({});
  const [anexo_excel, set_anexo_excel] = useState({});

  const [ocorrencia_incluir, set_ocorrencia_incluir] = useState({});
  const [ocorrencia_editar, set_ocorrencia_editar] = useState({});
  const [ocorrencia_excluir, set_ocorrencia_excluir] = useState({});
  const [ocorrencia_consultar, set_ocorrencia_consultar] = useState({});
  const [ocorrencia_excel, set_ocorrencia_excel] = useState({});

  const [parametro_editar, set_parametro_editar] = useState({});

  const [usuario_incluir, set_usuario_incluir] = useState({});
  const [usuario_editar, set_usuario_editar] = useState({});
  const [usuario_excluir, set_usuario_excluir] = useState({});
  const [usuario_consultar, set_usuario_consultar] = useState({});
  const [usuario_excel, set_usuario_excel] = useState({});

  const [form, set_form] = useState({});

  const inicializaValoresModulo = useCallback((modulo) => {
    const { acesso, permissao, descricao } = modulo;
    switch (descricao) {
      case 'CADASTRO': set_mod_cadastro({ permissao, acesso }); break;
      case 'TABELAS': set_mod_tabelas({ permissao, acesso }); break;
      case 'PROJETO': set_mod_projeto({ permissao, acesso }); break;
      case 'FINANCEIRO': set_mod_financeiro({ permissao, acesso }); break;
      case 'SISTEMA': set_mod_sistema({ permissao, acesso }); break;
      default:
    }
  }, []);

  const inicializaValoresPagina = useCallback((ficha) => {
    const {
      acesso, permissao, pagina, descricao,
    } = ficha;

    switch (descricao) {
      case 'PESSOA FÍSICA': set_mod_cad_pfisica({ permissao, pagina, acesso }); break;
      case 'PESSOA JURÍDICA': set_mod_cad_pjuridica({ permissao, pagina, acesso }); break;

      case 'AEROPORTO': set_mod_tab_aeroporto({ permissao, pagina, acesso }); break;
      case 'MUNICÍPIO': set_mod_tab_municipio({ permissao, pagina, acesso }); break;
      case 'PAIS': set_mod_tab_pais({ permissao, pagina, acesso }); break;
      case 'PERFIL': set_mod_tab_perfil({ permissao, pagina, acesso }); break;
      case 'PROFISSÃO': set_mod_tab_profissao({ permissao, pagina, acesso }); break;
      case 'RAMO ATIVIDADE': set_mod_tab_ramoatividade({ permissao, pagina, acesso }); break;
      case 'SERVIÇO': set_mod_tab_servico({ permissao, pagina, acesso }); break;
      case 'TIPO CARTÃO': set_mod_tab_tipocartao({ permissao, pagina, acesso }); break;

      case 'PAINEL': set_mod_proj_painel({ permissao, pagina, acesso }); break;

      case 'CÂMBIO': set_mod_fin_cambio({ permissao, pagina, acesso }); break;
      case 'CARTÃO CORPORATIVO': set_mod_fin_cartaocorp({ permissao, pagina, acesso }); break;
      case 'CONTA': set_mod_fin_conta({ permissao, pagina, acesso }); break;
      case 'FIXO': set_mod_fin_fixo({ permissao, pagina, acesso }); break;
      case 'GRUPO': set_mod_fin_grupo({ permissao, pagina, acesso }); break;
      case 'MOEDA': set_mod_fin_moeda({ permissao, pagina, acesso }); break;
      case 'MOVIMENTO': set_mod_fin_movimento({ permissao, pagina, acesso }); break;
      case 'SUBGRUPO': set_mod_fin_subgrupo({ permissao, pagina, acesso }); break;

      case 'ANEXO': set_mod_sis_anexo({ permissao, pagina, acesso }); break;
      case 'OCORRENCIA': set_mod_sis_ocorrencia({ permissao, pagina, acesso }); break;
      case 'PARÂMETRO': set_mod_sis_parametro({ permissao, pagina, acesso }); break;
      case 'USUÁRIO': set_mod_sis_usuario({ permissao, pagina, acesso }); break;
      default:
    }
  }, []);

  const inicializaValoresFuncoes = useCallback((pagina, funcoes) => {
    const { acesso, permissao, descricao } = funcoes;
    switch (pagina) {
      case 'PESSOA FÍSICA':
        switch (descricao) {
          case 'INCLUIR': set_pfisica_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_pfisica_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_pfisica_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_pfisica_consultar({ permissao, acesso }); break;
          case 'ANEXAR': set_pfisica_anexar({ permissao, acesso }); break;
          case 'EXCEL': set_pfisica_excel({ permissao, acesso }); break;
          case 'OCORRÊNCIA': set_pfisica_ocorrencia({ permissao, acesso }); break;
          case 'DASHBOARD': set_pfisica_dashboard({ permissao, acesso }); break;
          case '> CARTÃO': set_pfisica_cartao({ permissao, acesso }); break;
          case '> CONTATO': set_pfisica_contato({ permissao, acesso }); break;
          case '> ENDEREÇO': set_pfisica_endereco({ permissao, acesso }); break;
          case '> PASSAPORTE': set_pfisica_passaporte({ permissao, acesso }); break;
          case '> PERFIL': set_pfisica_perfil({ permissao, acesso }); break;
          case '> SERVIÇO': set_pfisica_servico({ permissao, acesso }); break;
          case '> VISTO': set_pfisica_visto({ permissao, acesso }); break;
          default:
        }
        break;
      case 'PESSOA JURÍDICA':
        switch (descricao) {
          case 'INCLUIR': set_pjuridica_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_pjuridica_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_pjuridica_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_pjuridica_consultar({ permissao, acesso }); break;
          case 'ANEXAR': set_pjuridica_anexar({ permissao, acesso }); break;
          case 'EXCEL': set_pjuridica_excel({ permissao, acesso }); break;
          case 'OCORRÊNCIA': set_pjuridica_ocorrencia({ permissao, acesso }); break;
          case 'DASHBOARD': set_pjuridica_dashboard({ permissao, acesso }); break;
          case '> CARTÃO': set_pjuridica_cartao({ permissao, acesso }); break;
          case '> CONTATO': set_pjuridica_contato({ permissao, acesso }); break;
          case '> ENDEREÇO': set_pjuridica_endereco({ permissao, acesso }); break;
          case '> SERVIÇO': set_pjuridica_servico({ permissao, acesso }); break;
          default:
        }
        break;
      case 'AEROPORTO':
        switch (descricao) {
          case 'INCLUIR': set_aeroporto_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_aeroporto_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_aeroporto_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_aeroporto_consultar({ permissao, acesso }); break;
          case 'EXCEL': set_aeroporto_excel({ permissao, acesso }); break;
          default:
        }
        break;
      case 'MUNICÍPIO':
        switch (descricao) {
          case 'INCLUIR': set_municipio_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_municipio_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_municipio_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_municipio_consultar({ permissao, acesso }); break;
          case 'EXCEL': set_municipio_excel({ permissao, acesso }); break;
          default:
        }
        break;
      case 'PAIS':
        switch (descricao) {
          case 'INCLUIR': set_pais_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_pais_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_pais_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_pais_consultar({ permissao, acesso }); break;
          case 'EXCEL': set_pais_excel({ permissao, acesso }); break;
          default:
        }
        break;
      case 'PERFIL':
        switch (descricao) {
          case 'INCLUIR': set_perfil_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_perfil_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_perfil_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_perfil_consultar({ permissao, acesso }); break;
          case 'EXCEL': set_perfil_excel({ permissao, acesso }); break;
          default:
        }
        break;
      case 'PROFISSÃO':
        switch (descricao) {
          case 'INCLUIR': set_profissao_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_profissao_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_profissao_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_profissao_consultar({ permissao, acesso }); break;
          case 'EXCEL': set_profissao_excel({ permissao, acesso }); break;
          default:
        }
        break;
      case 'RAMO ATIVIDADE':
        switch (descricao) {
          case 'INCLUIR': set_ramoatividade_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_ramoatividade_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_ramoatividade_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_ramoatividade_consultar({ permissao, acesso }); break;
          case 'EXCEL': set_ramoatividade_excel({ permissao, acesso }); break;
          default:
        }
        break;
      case 'SERVIÇO':
        switch (descricao) {
          case 'INCLUIR': set_servico_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_servico_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_servico_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_servico_consultar({ permissao, acesso }); break;
          case 'EXCEL': set_servico_excel({ permissao, acesso }); break;
          default:
        }
        break;
      case 'TIPO CARTÃO':
        switch (descricao) {
          case 'INCLUIR': set_tipocartao_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_tipocartao_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_tipocartao_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_tipocartao_consultar({ permissao, acesso }); break;
          case 'EXCEL': set_tipocartao_excel({ permissao, acesso }); break;
          default:
        }
        break;
      case 'PAINEL':
        switch (descricao) {
          case 'INCLUIR': set_painel_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_painel_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_painel_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_painel_consultar({ permissao, acesso }); break;
          case 'ANEXAR': set_painel_anexar({ permissao, acesso }); break;
          case 'EXCEL': set_painel_excel({ permissao, acesso }); break;
          case 'DASHBOARD': set_painel_dashboard({ permissao, acesso }); break;
          case 'GERENTE': set_painel_gerente({ permissao, acesso }); break;
          case '> CONTRATANTE': set_painel_contratante({ permissao, acesso }); break;
          case '> ORÇAMENTO': set_painel_orcamento({ permissao, acesso }); break;
          case '> RSVP': set_painel_rsvp({ permissao, acesso }); break;
          case '> PARTICIPANTE': set_painel_participante({ permissao, acesso }); break;
          case '> SERVIÇO': set_painel_servico({ permissao, acesso }); break;
          case '> OCORRÊNCIA': set_painel_ocorrencia({ permissao, acesso }); break;
          case '> ROOMING LIST': set_painel_roominglist({ permissao, acesso }); break;
          case '> TEMPO E MOVIMENTO': set_painel_tempomov({ permissao, acesso }); break;
          case '> FINANCEIRO': set_painel_financeiro({ permissao, acesso }); break;
          default:
        }
        break;
      case 'CÂMBIO':
        switch (descricao) {
          case 'INCLUIR': set_cambio_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_cambio_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_cambio_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_cambio_consultar({ permissao, acesso }); break;
          case 'EXCEL': set_cambio_excel({ permissao, acesso }); break;
          default:
        }
        break;
      case 'CARTÃO CORPORATIVO':
        switch (descricao) {
          case 'INCLUIR': set_cartaocorp_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_cartaocorp_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_cartaocorp_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_cartaocorp_consultar({ permissao, acesso }); break;
          case 'EXCEL': set_cartaocorp_excel({ permissao, acesso }); break;
          default:
        }
        break;
      case 'CONTA':
        switch (descricao) {
          case 'INCLUIR': set_conta_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_conta_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_conta_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_conta_consultar({ permissao, acesso }); break;
          case 'ANEXAR': set_conta_anexar({ permissao, acesso }); break;
          case 'EXCEL': set_conta_excel({ permissao, acesso }); break;
          case 'ADMIN': set_conta_admin({ permissao, acesso }); break;
          default:
        }
        break;
      case 'FIXO':
        switch (descricao) {
          case 'INCLUIR': set_fixo_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_fixo_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_fixo_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_fixo_consultar({ permissao, acesso }); break;
          case 'EXCEL': set_fixo_excel({ permissao, acesso }); break;
          case 'GERAR': set_fixo_gerar({ permissao, acesso }); break;
          default:
        }
        break;
      case 'GRUPO':
        switch (descricao) {
          case 'INCLUIR': set_grupo_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_grupo_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_grupo_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_grupo_consultar({ permissao, acesso }); break;
          case 'EXCEL': set_grupo_excel({ permissao, acesso }); break;
          default:
        }
        break;
      case 'MOEDA':
        switch (descricao) {
          case 'INCLUIR': set_moeda_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_moeda_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_moeda_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_moeda_consultar({ permissao, acesso }); break;
          case 'EXCEL': set_moeda_excel({ permissao, acesso }); break;
          case 'ADMIN': set_moeda_admin({ permissao, acesso }); break;
          default:
        }
        break;
      case 'MOVIMENTO':
        switch (descricao) {
          case 'INCLUIR': set_movimento_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_movimento_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_movimento_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_movimento_consultar({ permissao, acesso }); break;
          case 'ANEXAR': set_movimento_anexar({ permissao, acesso }); break;
          case 'AGRUPAR': set_movimento_agrupar({ permissao, acesso }); break;
          case 'PARCELAR': set_movimento_parcelar({ permissao, acesso }); break;
          case 'EXCEL': set_movimento_excel({ permissao, acesso }); break;
          case 'ADMIN': set_movimento_admin({ permissao, acesso }); break;
          case 'DASHBOARD': set_movimento_dashboard({ permissao, acesso }); break;
          case 'RELATÓRIO CONTATO': set_movimento_rel_contato({ permissao, acesso }); break;
          case 'RELATÓRIO DRE': set_movimento_rel_dre({ permissao, acesso }); break;
          case 'RELATÓRIO FECHAMENTO ANUAL': set_movimento_rel_anual({ permissao, acesso }); break;
          case 'RELATÓRIO FECHAMENTO MENSAL': set_movimento_rel_mensal({ permissao, acesso }); break;
          case 'RELATÓRIO FLUXO CAIXA': set_movimento_rel_fluxocaixa({ permissao, acesso }); break;
          case 'RELATÓRIO TRANSAÇÃO': set_movimento_rel_transacao({ permissao, acesso }); break;
          default:
        }
        break;
      case 'SUBGRUPO':
        switch (descricao) {
          case 'INCLUIR': set_subgrupo_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_subgrupo_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_subgrupo_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_subgrupo_consultar({ permissao, acesso }); break;
          case 'EXCEL': set_subgrupo_excel({ permissao, acesso }); break;
          default:
        }
        break;
      case 'ANEXO':
        switch (descricao) {
          case 'INCLUIR': set_anexo_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_anexo_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_anexo_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_anexo_consultar({ permissao, acesso }); break;
          case 'EXCEL': set_anexo_excel({ permissao, acesso }); break;
          default:
        }
        break;
      case 'OCORRENCIA':
        switch (descricao) {
          case 'INCLUIR': set_ocorrencia_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_ocorrencia_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_ocorrencia_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_ocorrencia_consultar({ permissao, acesso }); break;
          case 'EXCEL': set_ocorrencia_excel({ permissao, acesso }); break;
          default:
        }
        break;
      case 'PARÂMETRO':
        switch (descricao) {
          case 'EDITAR': set_parametro_editar({ permissao, acesso }); break;
          default:
        }
        break;
      case 'USUÁRIO':
        switch (descricao) {
          case 'INCLUIR': set_usuario_incluir({ permissao, acesso }); break;
          case 'EDITAR': set_usuario_editar({ permissao, acesso }); break;
          case 'EXCLUIR': set_usuario_excluir({ permissao, acesso }); break;
          case 'CONSULTAR': set_usuario_consultar({ permissao, acesso }); break;
          case 'EXCEL': set_usuario_excel({ permissao, acesso }); break;
          default:
        }
        break;
      default:
    }
  }, []);

  const handleFicha = useCallback(() => {
    async function getFicha(id) {
      const url = `/TsmUSUARIO/FICHA/${id}`;
      const ficha = await getDados(props, url, '');

      const {
        celular, email, nome, situacao, modulo_regs, alt_dhsis,
      } = ficha;

      set_celular(celular);
      set_email(email);
      set_nome(nome);
      set_situacao(situacao);
      set_modulo_regs(modulo_regs);
      setAlt_dhsis(alt_dhsis);
    }
    getFicha(id_usuario);
  }, [props, id_usuario]);

  const expandModulo = useCallback((descricao, ultimo_modulo) => {
    ////// 01 - remover ultima linha selecionada
    const ult_titulo = document.getElementById(`modulo-titulo-${ultimo_modulo}`);
    const ult_pagina = document.getElementById(`modulo-card-paginas-${ultimo_modulo}`);

    if (ult_titulo !== null) {
      ult_titulo.classList.add('hide');
      ult_pagina.classList.add('hide');
    }

    ////// 02 - selecionar linha atual
    const titulo = document.getElementById(`modulo-titulo-${descricao}`);
    const paginas = document.getElementById(`modulo-card-paginas-${descricao}`);

    titulo.getAttribute('class').includes('hide')
      ? titulo.classList.remove('hide')
      : titulo.classList.add('hide');

    paginas.getAttribute('class').includes('hide')
      ? paginas.classList.remove('hide')
      : paginas.classList.add('hide');

    set_ultimo_modulo_selecionado(descricao);
  }, []);

  const selectPagina = useCallback((descricao, ultima_linha) => {
    ////// 01 - remover ultima linha selecionada
    const ult_linha = document.getElementById(`modulo-pagina-${ultima_linha}`);
    const ult_funcoes = document.getElementById(`card-funcoes-${ultima_linha}`);

    if (ult_linha !== null) {
      ult_linha.classList.remove('usuario-linha-selecionada');
      ult_funcoes.classList.add('hide');
    }

    ////// 02 - selecionar linha atual
    const linha = document.getElementById(`modulo-pagina-${descricao}`);
    const funcoes = document.getElementById(`card-funcoes-${descricao}`);

    linha.getAttribute('class').includes('usuario-linha-selecionada')
      ? linha.classList.remove('usuario-linha-selecionada')
      : linha.classList.add('usuario-linha-selecionada');

    funcoes.getAttribute('class').includes('hide')
      ? funcoes.classList.remove('hide')
      : funcoes.classList.add('hide');

    set_ultima_linha_selecionada(descricao);
  }, []);

  ////// ATRIBUI VARIAVEIS NA COLUNA DE MODULOS
  const atribuiModuloOnClick = useCallback((descricao, permissao) => {
    switch (descricao) {
      case 'CADASTRO': return (e) => set_mod_cadastro({ permissao, acesso: e.target.checked });
      case 'TABELAS': return (e) => set_mod_tabelas({ permissao, acesso: e.target.checked });
      case 'PROJETO': return (e) => set_mod_projeto({ permissao, acesso: e.target.checked });
      case 'FINANCEIRO': return (e) => set_mod_financeiro({ permissao, acesso: e.target.checked });
      case 'SISTEMA': return (e) => set_mod_sistema({ permissao, acesso: e.target.checked });
      default:
    }
  }, []);

  const atribuiPaginaOnClick = useCallback((ficha) => {
    const { descricao, pagina, permissao } = ficha;
    switch (descricao) {
      case 'PESSOA FÍSICA': return (e) => set_mod_cad_pfisica({ permissao, pagina, acesso: e.target.checked });
      case 'PESSOA JURÍDICA': return (e) => set_mod_cad_pjuridica({ permissao, pagina, acesso: e.target.checked });

      case 'AEROPORTO': return (e) => set_mod_tab_aeroporto({ permissao, pagina, acesso: e.target.checked });
      case 'MUNICÍPIO': return (e) => set_mod_tab_municipio({ permissao, pagina, acesso: e.target.checked });
      case 'PAIS': return (e) => set_mod_tab_pais({ permissao, pagina, acesso: e.target.checked });
      case 'PERFIL': return (e) => set_mod_tab_perfil({ permissao, pagina, acesso: e.target.checked });
      case 'PROFISSÃO': return (e) => set_mod_tab_profissao({ permissao, pagina, acesso: e.target.checked });
      case 'RAMO ATIVIDADE': return (e) => set_mod_tab_ramoatividade({ permissao, pagina, acesso: e.target.checked });
      case 'SERVIÇO': return (e) => set_mod_tab_servico({ permissao, pagina, acesso: e.target.checked });
      case 'TIPO CARTÃO': return (e) => set_mod_tab_tipocartao({ permissao, pagina, acesso: e.target.checked });

      case 'PAINEL': return (e) => set_mod_proj_painel({ permissao, pagina, acesso: e.target.checked });

      case 'CÂMBIO': return (e) => set_mod_fin_cambio({ permissao, pagina, acesso: e.target.checked });
      case 'CARTÃO CORPORATIVO': return (e) => set_mod_fin_cartaocorp({ permissao, pagina, acesso: e.target.checked });
      case 'CONTA': return (e) => set_mod_fin_conta({ permissao, pagina, acesso: e.target.checked });
      case 'FIXO': return (e) => set_mod_fin_fixo({ permissao, pagina, acesso: e.target.checked });
      case 'GRUPO': return (e) => set_mod_fin_grupo({ permissao, pagina, acesso: e.target.checked });
      case 'MOEDA': return (e) => set_mod_fin_moeda({ permissao, pagina, acesso: e.target.checked });
      case 'MOVIMENTO': return (e) => set_mod_fin_movimento({ permissao, pagina, acesso: e.target.checked });
      case 'SUBGRUPO': return (e) => set_mod_fin_subgrupo({ permissao, pagina, acesso: e.target.checked });

      case 'ANEXO': return (e) => set_mod_sis_anexo({ permissao, pagina, acesso: e.target.checked });
      case 'OCORRENCIA': return (e) => set_mod_sis_ocorrencia({ permissao, pagina, acesso: e.target.checked });
      case 'PARÂMETRO': return (e) => set_mod_sis_parametro({ permissao, pagina, acesso: e.target.checked });
      case 'USUÁRIO': return (e) => set_mod_sis_usuario({ permissao, pagina, acesso: e.target.checked });
      default:
    }
  }, []);

  ////// ATRIBUI VARIAVEIS NA COLUNA DE FUNCOES
  const atribuiAcaoOnClick = useCallback((pagina, acao, permissao) => {
    switch (pagina) {
      case 'PESSOA FÍSICA':
        switch (acao) {
          case 'INCLUIR': return (e) => set_pfisica_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_pfisica_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_pfisica_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_pfisica_consultar({ permissao, acesso: e.target.checked });
          case 'ANEXAR': return (e) => set_pfisica_anexar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_pfisica_excel({ permissao, acesso: e.target.checked });
          case 'OCORRÊNCIA': return (e) => set_pfisica_ocorrencia({ permissao, acesso: e.target.checked });
          case 'DASHBOARD': return (e) => set_pfisica_dashboard({ permissao, acesso: e.target.checked });
          case '> CARTÃO': return (e) => set_pfisica_cartao({ permissao, acesso: e.target.checked });
          case '> CONTATO': return (e) => set_pfisica_contato({ permissao, acesso: e.target.checked });
          case '> ENDEREÇO': return (e) => set_pfisica_endereco({ permissao, acesso: e.target.checked });
          case '> PASSAPORTE': return (e) => set_pfisica_passaporte({ permissao, acesso: e.target.checked });
          case '> PERFIL': return (e) => set_pfisica_perfil({ permissao, acesso: e.target.checked });
          case '> SERVIÇO': return (e) => set_pfisica_servico({ permissao, acesso: e.target.checked });
          case '> VISTO': return (e) => set_pfisica_visto({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'PESSOA JURÍDICA':
        switch (acao) {
          case 'INCLUIR': return (e) => set_pjuridica_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_pjuridica_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_pjuridica_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_pjuridica_consultar({ permissao, acesso: e.target.checked });
          case 'ANEXAR': return (e) => set_pjuridica_anexar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_pjuridica_excel({ permissao, acesso: e.target.checked });
          case 'OCORRÊNCIA': return (e) => set_pjuridica_ocorrencia({ permissao, acesso: e.target.checked });
          case 'DASHBOARD': return (e) => set_pjuridica_dashboard({ permissao, acesso: e.target.checked });
          case '> CARTÃO': return (e) => set_pjuridica_cartao({ permissao, acesso: e.target.checked });
          case '> CONTATO': return (e) => set_pjuridica_contato({ permissao, acesso: e.target.checked });
          case '> ENDEREÇO': return (e) => set_pjuridica_endereco({ permissao, acesso: e.target.checked });
          case '> SERVIÇO': return (e) => set_pjuridica_servico({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'AEROPORTO':
        switch (acao) {
          case 'INCLUIR': return (e) => set_aeroporto_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_aeroporto_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_aeroporto_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_aeroporto_consultar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_aeroporto_excel({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'MUNICÍPIO':
        switch (acao) {
          case 'INCLUIR': return (e) => set_municipio_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_municipio_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_municipio_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_municipio_consultar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_municipio_excel({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'PAIS':
        switch (acao) {
          case 'INCLUIR': return (e) => set_pais_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_pais_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_pais_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_pais_consultar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_pais_excel({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'PERFIL':
        switch (acao) {
          case 'INCLUIR': return (e) => set_perfil_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_perfil_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_perfil_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_perfil_consultar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_perfil_excel({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'PROFISSÃO':
        switch (acao) {
          case 'INCLUIR': return (e) => set_profissao_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_profissao_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_profissao_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_profissao_consultar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_profissao_excel({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'RAMO ATIVIDADE':
        switch (acao) {
          case 'INCLUIR': return (e) => set_ramoatividade_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_ramoatividade_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_ramoatividade_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_ramoatividade_consultar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_ramoatividade_excel({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'SERVIÇO':
        switch (acao) {
          case 'INCLUIR': return (e) => set_servico_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_servico_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_servico_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_servico_consultar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_servico_excel({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'TIPO CARTÃO':
        switch (acao) {
          case 'INCLUIR': return (e) => set_tipocartao_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_tipocartao_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_tipocartao_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_tipocartao_consultar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_tipocartao_excel({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'PAINEL':
        switch (acao) {
          case 'INCLUIR': return (e) => set_painel_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_painel_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_painel_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_painel_consultar({ permissao, acesso: e.target.checked });
          case 'ANEXAR': return (e) => set_painel_anexar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_painel_excel({ permissao, acesso: e.target.checked });
          case 'DASHBOARD': return (e) => set_painel_dashboard({ permissao, acesso: e.target.checked });
          case 'GERENTE': return (e) => set_painel_gerente({ permissao, acesso: e.target.checked });
          case '> CONTRATANTE': return (e) => set_painel_contratante({ permissao, acesso: e.target.checked });
          case '> ORÇAMENTO': return (e) => set_painel_orcamento({ permissao, acesso: e.target.checked });
          case '> RSVP': return (e) => set_painel_rsvp({ permissao, acesso: e.target.checked });
          case '> PARTICIPANTE': return (e) => set_painel_participante({ permissao, acesso: e.target.checked });
          case '> SERVIÇO': return (e) => set_painel_servico({ permissao, acesso: e.target.checked });
          case '> OCORRÊNCIA': return (e) => set_painel_ocorrencia({ permissao, acesso: e.target.checked });
          case '> ROOMING LIST': return (e) => set_painel_roominglist({ permissao, acesso: e.target.checked });
          case '> TEMPO E MOVIMENTO': return (e) => set_painel_tempomov({ permissao, acesso: e.target.checked });
          case '> FINANCEIRO': return (e) => set_painel_financeiro({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'CÂMBIO':
        switch (acao) {
          case 'INCLUIR': return (e) => set_cambio_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_cambio_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_cambio_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_cambio_consultar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_cambio_excel({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'CARTÃO CORPORATIVO':
        switch (acao) {
          case 'INCLUIR': return (e) => set_cartaocorp_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_cartaocorp_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_cartaocorp_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_cartaocorp_consultar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_cartaocorp_excel({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'CONTA':
        switch (acao) {
          case 'INCLUIR': return (e) => set_conta_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_conta_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_conta_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_conta_consultar({ permissao, acesso: e.target.checked });
          case 'ANEXAR': return (e) => set_conta_anexar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_conta_excel({ permissao, acesso: e.target.checked });
          case 'ADMIN': return (e) => set_conta_admin({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'FIXO':
        switch (acao) {
          case 'INCLUIR': return (e) => set_fixo_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_fixo_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_fixo_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_fixo_consultar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_fixo_excel({ permissao, acesso: e.target.checked });
          case 'GERAR': return (e) => set_fixo_gerar({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'GRUPO':
        switch (acao) {
          case 'INCLUIR': return (e) => set_grupo_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_grupo_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_grupo_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_grupo_consultar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_grupo_excel({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'MOEDA':
        switch (acao) {
          case 'INCLUIR': return (e) => set_moeda_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_moeda_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_moeda_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_moeda_consultar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_moeda_excel({ permissao, acesso: e.target.checked });
          case 'ADMIN': return (e) => set_moeda_admin({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'MOVIMENTO':
        switch (acao) {
          case 'INCLUIR': return (e) => set_movimento_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_movimento_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_movimento_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_movimento_consultar({ permissao, acesso: e.target.checked });
          case 'ANEXAR': return (e) => set_movimento_anexar({ permissao, acesso: e.target.checked });
          case 'AGRUPAR': return (e) => set_movimento_agrupar({ permissao, acesso: e.target.checked });
          case 'PARCELAR': return (e) => set_movimento_parcelar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_movimento_excel({ permissao, acesso: e.target.checked });
          case 'ADMIN': return (e) => set_movimento_admin({ permissao, acesso: e.target.checked });
          case 'DASHBOARD': return (e) => set_movimento_dashboard({ permissao, acesso: e.target.checked });
          case 'RELATÓRIO CONTATO': return (e) => set_movimento_rel_contato({ permissao, acesso: e.target.checked });
          case 'RELATÓRIO DRE': return (e) => set_movimento_rel_dre({ permissao, acesso: e.target.checked });
          case 'RELATÓRIO FECHAMENTO ANUAL': return (e) => set_movimento_rel_anual({ permissao, acesso: e.target.checked });
          case 'RELATÓRIO FECHAMENTO MENSAL': return (e) => set_movimento_rel_mensal({ permissao, acesso: e.target.checked });
          case 'RELATÓRIO FLUXO CAIXA': return (e) => set_movimento_rel_fluxocaixa({ permissao, acesso: e.target.checked });
          case 'RELATÓRIO TRANSAÇÃO': return (e) => set_movimento_rel_transacao({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'SUBGRUPO':
        switch (acao) {
          case 'INCLUIR': return (e) => set_subgrupo_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_subgrupo_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_subgrupo_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_subgrupo_consultar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_subgrupo_excel({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'ANEXO':
        switch (acao) {
          case 'INCLUIR': return (e) => set_anexo_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_anexo_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_anexo_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_anexo_consultar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_anexo_excel({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'OCORRENCIA':
        switch (acao) {
          case 'INCLUIR': return (e) => set_ocorrencia_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_ocorrencia_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_ocorrencia_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_ocorrencia_consultar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_ocorrencia_excel({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'PARÂMETRO':
        switch (acao) {
          case 'EDITAR': return (e) => set_parametro_editar({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      case 'USUÁRIO':
        switch (acao) {
          case 'INCLUIR': return (e) => set_usuario_incluir({ permissao, acesso: e.target.checked });
          case 'EDITAR': return (e) => set_usuario_editar({ permissao, acesso: e.target.checked });
          case 'EXCLUIR': return (e) => set_usuario_excluir({ permissao, acesso: e.target.checked });
          case 'CONSULTAR': return (e) => set_usuario_consultar({ permissao, acesso: e.target.checked });
          case 'EXCEL': return (e) => set_usuario_excel({ permissao, acesso: e.target.checked });
          default:
        }
        break;
      default:
    }
  }, []);

  ////// FIRSTLOAD
  useEffect(() => {
    if (firstLoad) {
      set_firstLoad(false);
      handleFicha();
    }
  }, [firstLoad, handleFicha]);

  ////// INICIALIZA VALORES
  useEffect(() => {
    if (modulo_regs.length === 0) { return; }

    modulo_regs.forEach((modulo) => {
      const {
        acesso, descricao: desc_modulo, pagina_regs,
      } = modulo;
      const button_modulo = document.getElementById(`modulo-${desc_modulo}-acesso`);
      button_modulo.checked = acesso;

      inicializaValoresModulo(modulo);

      pagina_regs.forEach((pagina) => {
        const {
          acesso, descricao: desc_pagina, funcao_regs,
        } = pagina;
        const button_pagina = document.getElementById(`pagina-${desc_pagina}-acesso`);
        button_pagina.checked = acesso;

        inicializaValoresPagina(pagina);

        funcao_regs.forEach((funcao) => {
          const {
            acesso, descricao: desc_acao,
          } = funcao;
          const button_funcao = document.getElementById(`funcao-${desc_pagina}-${desc_acao}-acesso`);
          button_funcao.checked = acesso;

          inicializaValoresFuncoes(desc_pagina, funcao);
        });
      });
    });
  }, [modulo_regs, inicializaValoresFuncoes, inicializaValoresModulo, inicializaValoresPagina]);

  ////// ATIVO
  useEffect(() => {
    switch (activeTab) {
      case '1':
        set_tab1(class_active);
        set_tab2(class_inactive);
        break;
      case '2':
        set_tab1(class_inactive);
        set_tab2(class_active);
        break;
      default:
    }
  }, [activeTab]);

  ////// FORM
  useEffect(() => {
    const ficha = {
      id,
      nome,
      email,
      celular,
      situacao,
      inc_usuario: id_user_logado,
      alt_usuario: id_user_logado,
      alt_dhsis,
      modulo_regs: [
        {
          descricao: 'CADASTRO',
          permissao: mod_cadastro.permissao,
          acesso: mod_cadastro.acesso,
          pagina_regs: [
            {
              pagina: mod_cad_pfisica.pagina,
              permissao: mod_cad_pfisica.permissao,
              acesso: mod_cad_pfisica.acesso,
              funcao_regs: [
                pfisica_incluir,
                pfisica_editar,
                pfisica_excluir,
                pfisica_consultar,
                pfisica_anexar,
                pfisica_excel,
                pfisica_ocorrencia,
                pfisica_dashboard,
                pfisica_cartao,
                pfisica_contato,
                pfisica_endereco,
                pfisica_passaporte,
                pfisica_perfil,
                pfisica_servico,
                pfisica_visto,
              ],
            },
            {
              pagina: mod_cad_pjuridica.pagina,
              permissao: mod_cad_pjuridica.permissao,
              acesso: mod_cad_pjuridica.acesso,
              funcao_regs: [
                pjuridica_incluir,
                pjuridica_editar,
                pjuridica_excluir,
                pjuridica_consultar,
                pjuridica_anexar,
                pjuridica_excel,
                pjuridica_ocorrencia,
                pjuridica_dashboard,
                pjuridica_cartao,
                pjuridica_contato,
                pjuridica_endereco,
                pjuridica_servico,
              ],
            },
          ],
        },
        ////// TABELAS
        {
          descricao: 'TABELAS',
          permissao: mod_tabelas.permissao,
          acesso: mod_tabelas.acesso,
          pagina_regs: [
            {
              pagina: mod_tab_aeroporto.pagina,
              permissao: mod_tab_aeroporto.permissao,
              acesso: mod_tab_aeroporto.acesso,
              funcao_regs: [
                aeroporto_incluir,
                aeroporto_editar,
                aeroporto_excluir,
                aeroporto_consultar,
                aeroporto_excel,
              ],
            },
            {
              pagina: mod_tab_municipio.pagina,
              permissao: mod_tab_municipio.permissao,
              acesso: mod_tab_municipio.acesso,
              funcao_regs: [
                municipio_incluir,
                municipio_editar,
                municipio_excluir,
                municipio_consultar,
                municipio_excel,
              ],
            },
            {
              pagina: mod_tab_pais.pagina,
              permissao: mod_tab_pais.permissao,
              acesso: mod_tab_pais.acesso,
              funcao_regs: [
                pais_incluir,
                pais_editar,
                pais_excluir,
                pais_consultar,
                pais_excel,
              ],
            },
            {
              pagina: mod_tab_perfil.pagina,
              permissao: mod_tab_perfil.permissao,
              acesso: mod_tab_perfil.acesso,
              funcao_regs: [
                perfil_incluir,
                perfil_editar,
                perfil_excluir,
                perfil_consultar,
                perfil_excel,
              ],
            },
            {
              pagina: mod_tab_profissao.pagina,
              permissao: mod_tab_profissao.permissao,
              acesso: mod_tab_profissao.acesso,
              funcao_regs: [
                profissao_incluir,
                profissao_editar,
                profissao_excluir,
                profissao_consultar,
                profissao_excel,
              ],
            },
            {
              pagina: mod_tab_ramoatividade.pagina,
              permissao: mod_tab_ramoatividade.permissao,
              acesso: mod_tab_ramoatividade.acesso,
              funcao_regs: [
                ramoatividade_incluir,
                ramoatividade_editar,
                ramoatividade_excluir,
                ramoatividade_consultar,
                ramoatividade_excel,
              ],
            },
            {
              pagina: mod_tab_servico.pagina,
              permissao: mod_tab_servico.permissao,
              acesso: mod_tab_servico.acesso,
              funcao_regs: [
                servico_incluir,
                servico_editar,
                servico_excluir,
                servico_consultar,
                servico_excel,
              ],
            },
            {
              pagina: mod_tab_tipocartao.pagina,
              permissao: mod_tab_tipocartao.permissao,
              acesso: mod_tab_tipocartao.acesso,
              funcao_regs: [
                tipocartao_incluir,
                tipocartao_editar,
                tipocartao_excluir,
                tipocartao_consultar,
                tipocartao_excel,
              ],
            },
          ],
        },
        ////// PROJETO
        {
          descricao: 'PROJETO',
          permissao: mod_projeto.permissao,
          acesso: mod_projeto.acesso,
          pagina_regs: [
            {
              pagina: mod_proj_painel.pagina,
              permissao: mod_proj_painel.permissao,
              acesso: mod_proj_painel.acesso,
              funcao_regs: [
                painel_incluir,
                painel_editar,
                painel_excluir,
                painel_consultar,
                painel_anexar,
                painel_excel,
                painel_dashboard,
                painel_gerente,
                painel_contratante,
                painel_orcamento,
                painel_rsvp,
                painel_participante,
                painel_servico,
                painel_ocorrencia,
                painel_roominglist,
                painel_tempomov,
                painel_financeiro,
              ],
            },
          ],
        },
        ////// FINANCEIRO
        {
          descricao: 'FINANCEIRO',
          permissao: mod_financeiro.permissao,
          acesso: mod_financeiro.acesso,
          pagina_regs: [
            {
              pagina: mod_fin_cambio.pagina,
              permissao: mod_fin_cambio.permissao,
              acesso: mod_fin_cambio.acesso,
              funcao_regs: [
                cambio_incluir,
                cambio_editar,
                cambio_excluir,
                cambio_consultar,
                cambio_excel,
              ],
            },
            {
              pagina: mod_fin_cartaocorp.pagina,
              permissao: mod_fin_cartaocorp.permissao,
              acesso: mod_fin_cartaocorp.acesso,
              funcao_regs: [
                cartaocorp_incluir,
                cartaocorp_editar,
                cartaocorp_excluir,
                cartaocorp_consultar,
                cartaocorp_excel,
              ],
            },
            {
              pagina: mod_fin_conta.pagina,
              permissao: mod_fin_conta.permissao,
              acesso: mod_fin_conta.acesso,
              funcao_regs: [
                conta_incluir,
                conta_editar,
                conta_excluir,
                conta_consultar,
                conta_anexar,
                conta_excel,
                conta_admin,
              ],
            },
            {
              pagina: mod_fin_fixo.pagina,
              permissao: mod_fin_fixo.permissao,
              acesso: mod_fin_fixo.acesso,
              funcao_regs: [
                fixo_incluir,
                fixo_editar,
                fixo_excluir,
                fixo_consultar,
                fixo_excel,
                fixo_gerar,
              ],
            },
            {
              pagina: mod_fin_grupo.pagina,
              permissao: mod_fin_grupo.permissao,
              acesso: mod_fin_grupo.acesso,
              funcao_regs: [
                grupo_incluir,
                grupo_editar,
                grupo_excluir,
                grupo_consultar,
                grupo_excel,
              ],
            },
            {
              pagina: mod_fin_moeda.pagina,
              permissao: mod_fin_moeda.permissao,
              acesso: mod_fin_moeda.acesso,
              funcao_regs: [
                moeda_incluir,
                moeda_editar,
                moeda_excluir,
                moeda_consultar,
                moeda_excel,
                moeda_admin,
              ],
            },
            {
              pagina: mod_fin_movimento.pagina,
              permissao: mod_fin_movimento.permissao,
              acesso: mod_fin_movimento.acesso,
              funcao_regs: [
                movimento_incluir,
                movimento_editar,
                movimento_excluir,
                movimento_consultar,
                movimento_anexar,
                movimento_agrupar,
                movimento_parcelar,
                movimento_excel,
                movimento_admin,
                movimento_dashboard,
                movimento_rel_contato,
                movimento_rel_dre,
                movimento_rel_anual,
                movimento_rel_mensal,
                movimento_rel_fluxocaixa,
                movimento_rel_transacao,
              ],
            },
            {
              pagina: mod_fin_subgrupo.pagina,
              permissao: mod_fin_subgrupo.permissao,
              acesso: mod_fin_subgrupo.acesso,
              funcao_regs: [
                subgrupo_incluir,
                subgrupo_editar,
                subgrupo_excluir,
                subgrupo_consultar,
                subgrupo_excel,
              ],
            },
          ],
        },
        ////// SISTEMA
        {
          descricao: 'SISTEMA',
          permissao: mod_sistema.permissao,
          acesso: mod_sistema.acesso,
          pagina_regs: [
            {
              pagina: mod_sis_anexo.pagina,
              permissao: mod_sis_anexo.permissao,
              acesso: mod_sis_anexo.acesso,
              funcao_regs: [
                anexo_incluir,
                anexo_editar,
                anexo_excluir,
                anexo_consultar,
                anexo_excel,
              ],
            },
            {
              pagina: mod_sis_ocorrencia.pagina,
              permissao: mod_sis_ocorrencia.permissao,
              acesso: mod_sis_ocorrencia.acesso,
              funcao_regs: [
                ocorrencia_incluir,
                ocorrencia_editar,
                ocorrencia_excluir,
                ocorrencia_consultar,
                ocorrencia_excel,
              ],
            },
            {
              pagina: mod_sis_parametro.pagina,
              permissao: mod_sis_parametro.permissao,
              acesso: mod_sis_parametro.acesso,
              funcao_regs: [
                parametro_editar,
              ],
            },
            {
              pagina: mod_sis_usuario.pagina,
              permissao: mod_sis_usuario.permissao,
              acesso: mod_sis_usuario.acesso,
              funcao_regs: [
                usuario_incluir,
                usuario_editar,
                usuario_excluir,
                usuario_consultar,
                usuario_excel,
              ],
            },
          ],
        },
      ],
    };

    set_form(ficha);
  }, [
    id_user_logado,
    id,
    nome,
    email,
    celular,
    situacao,
    alt_dhsis,
    mod_cadastro,
    mod_tabelas,
    mod_projeto,
    mod_financeiro,
    mod_sistema,
    mod_cad_pfisica,
    mod_cad_pjuridica,
    mod_tab_aeroporto,
    mod_tab_municipio,
    mod_tab_pais,
    mod_tab_perfil,
    mod_tab_profissao,
    mod_tab_ramoatividade,
    mod_tab_servico,
    mod_tab_tipocartao,
    mod_proj_painel,
    mod_fin_cambio,
    mod_fin_cartaocorp,
    mod_fin_conta,
    mod_fin_fixo,
    mod_fin_grupo,
    mod_fin_moeda,
    mod_fin_movimento,
    mod_fin_subgrupo,
    mod_sis_anexo,
    mod_sis_ocorrencia,
    mod_sis_parametro,
    mod_sis_usuario,
    pfisica_incluir,
    pfisica_editar,
    pfisica_excluir,
    pfisica_consultar,
    pfisica_anexar,
    pfisica_excel,
    pfisica_ocorrencia,
    pfisica_dashboard,
    pfisica_cartao,
    pfisica_contato,
    pfisica_endereco,
    pfisica_passaporte,
    pfisica_perfil,
    pfisica_servico,
    pfisica_visto,
    pjuridica_incluir,
    pjuridica_editar,
    pjuridica_excluir,
    pjuridica_consultar,
    pjuridica_anexar,
    pjuridica_excel,
    pjuridica_ocorrencia,
    pjuridica_dashboard,
    pjuridica_cartao,
    pjuridica_contato,
    pjuridica_endereco,
    pjuridica_servico,
    aeroporto_incluir,
    aeroporto_editar,
    aeroporto_excluir,
    aeroporto_consultar,
    aeroporto_excel,
    municipio_incluir,
    municipio_editar,
    municipio_excluir,
    municipio_consultar,
    municipio_excel,
    pais_incluir,
    pais_editar,
    pais_excluir,
    pais_consultar,
    pais_excel,
    perfil_incluir,
    perfil_editar,
    perfil_excluir,
    perfil_consultar,
    perfil_excel,
    profissao_incluir,
    profissao_editar,
    profissao_excluir,
    profissao_consultar,
    profissao_excel,
    ramoatividade_incluir,
    ramoatividade_editar,
    ramoatividade_excluir,
    ramoatividade_consultar,
    ramoatividade_excel,
    servico_incluir,
    servico_editar,
    servico_excluir,
    servico_consultar,
    servico_excel,
    tipocartao_incluir,
    tipocartao_editar,
    tipocartao_excluir,
    tipocartao_consultar,
    tipocartao_excel,
    painel_incluir,
    painel_editar,
    painel_excluir,
    painel_consultar,
    painel_anexar,
    painel_excel,
    painel_dashboard,
    painel_gerente,
    painel_contratante,
    painel_orcamento,
    painel_rsvp,
    painel_participante,
    painel_servico,
    painel_ocorrencia,
    painel_roominglist,
    painel_tempomov,
    painel_financeiro,
    cambio_incluir,
    cambio_editar,
    cambio_excluir,
    cambio_consultar,
    cambio_excel,
    cartaocorp_incluir,
    cartaocorp_editar,
    cartaocorp_excluir,
    cartaocorp_consultar,
    cartaocorp_excel,
    conta_incluir,
    conta_editar,
    conta_excluir,
    conta_consultar,
    conta_anexar,
    conta_excel,
    conta_admin,
    fixo_incluir,
    fixo_editar,
    fixo_excluir,
    fixo_consultar,
    fixo_excel,
    fixo_gerar,
    grupo_incluir,
    grupo_editar,
    grupo_excluir,
    grupo_consultar,
    grupo_excel,
    moeda_incluir,
    moeda_editar,
    moeda_excluir,
    moeda_consultar,
    moeda_excel,
    moeda_admin,
    movimento_incluir,
    movimento_editar,
    movimento_excluir,
    movimento_consultar,
    movimento_anexar,
    movimento_agrupar,
    movimento_parcelar,
    movimento_excel,
    movimento_admin,
    movimento_dashboard,
    movimento_rel_contato,
    movimento_rel_dre,
    movimento_rel_anual,
    movimento_rel_mensal,
    movimento_rel_fluxocaixa,
    movimento_rel_transacao,
    subgrupo_incluir,
    subgrupo_editar,
    subgrupo_excluir,
    subgrupo_consultar,
    subgrupo_excel,
    anexo_incluir,
    anexo_editar,
    anexo_excluir,
    anexo_consultar,
    anexo_excel,
    ocorrencia_incluir,
    ocorrencia_editar,
    ocorrencia_excluir,
    ocorrencia_consultar,
    ocorrencia_excel,
    parametro_editar,
    usuario_incluir,
    usuario_editar,
    usuario_excluir,
    usuario_consultar,
    usuario_excel,
  ]);

  return (
    <Container fluid className="p-0">
      <PageTitle history={history} title="Usuário" subtitle="/ Cadastrar" voltar />
      <Row>
        <Col lg="12">
          {/****** NAVIGATION ******/}
          {/************************/}
          <Nav tabs>
            <NavItem>
              <NavLink
                className={`border ${tab1}`}
                onClick={() => { set_activeTab('1'); }}
              >
                Dados
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`border ${tab2}`}
                onClick={() => { set_activeTab('2'); }}
              >
                Permissões
              </NavLink>
            </NavItem>
          </Nav>
          {/****** CONTEÚDO ********/}
          {/************************/}
          <Card>
            <CardBody className="pb-0 m-0 pl-3 pr-3 pt-0">

              <TabContent activeTab={activeTab}>
                {/****** TAB 01 **********/}
                {/************************/}
                <TabPane tabId="1">
                  <Row className="pt-3">
                    {/*** ID ***/}
                    <Col sm={2} md={2} lg={1} xl={1}>
                      <FormGroup>
                        <Label>Id</Label>
                        <Input
                          type="text"
                          disabled
                          role="contentinfo"
                          value={id}
                        />
                      </FormGroup>
                    </Col>
                    {/*** NOME ***/}
                    <Col sm={5} md={3} lg={3} xl={3}>
                      <FormGroup>
                        <Label>Nome</Label>
                        <Input
                          type="text"
                          className="required"
                          maxLength={150}
                          value={nome}
                          onChange={(e) => set_nome(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    {/*** E-MAIL ***/}
                    <Col sm={5} md={3} lg={3} xl={3}>
                      <FormGroup>
                        <Label>E-mail</Label>
                        <Input
                          type="text"
                          className="email"
                          maxLength={60}
                          value={email}
                          onChange={(e) => set_email(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    {/*** CELULAR ***/}
                    <Col sm={4} md={3} lg={3} xl={3}>
                      <FormGroup>
                        <Label>Celular</Label>
                        <Input
                          type="text"
                          maxLength={16}
                          value={celular}
                          onChange={(e) => set_celular(newFormatCelular(e.target.value))}
                        />
                      </FormGroup>
                    </Col>
                    {/*** SITUACAO ***/}
                    <Col sm={8} md={1} lg={1} xl={1}>
                      <FormGroup className="text-right">
                        <Label>Situação</Label>
                        <Checkbox
                          info="Ativo"
                          checked={situacao}
                          onChange={(e) => set_situacao(e.target.checked)}
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
                  </Row>
                </TabPane>
                {/****** TAB 02 **********/}
                {/************************/}
                <TabPane tabId="2">
                  <Row className="border-dark-2">
                    {/************************/}
                    {/*** COL 01 - MODULOS ***/}
                    {/************************/}
                    <Col sm={6} className="border-dark-right-2">
                      {
                        ////// RENDER MODULOS
                        !!modulo_regs && modulo_regs.map((modulo) => {
                          const {
                            descricao: desc_modulo, permissao: perm_modulo, pagina_regs,
                          } = modulo;

                          const onClick_mod = atribuiModuloOnClick(desc_modulo, perm_modulo);

                          return (
                            <>
                              {/*** LINHA MODULO EXPAND ***/}
                              <Row onClick={() => expandModulo(desc_modulo, ultimo_modulo_selecionado)}>
                                <Col
                                  sm={12}
                                  className="p-2 pl-3 bg-dark text-white usuario-container"
                                  style={{ height: altura_linha }}
                                >
                                  <span className="cursor-default noselect">{`MÓD. ${desc_modulo}`}</span>
                                  <div className="usuario-container">
                                    <FontAwesomeIcon id={`tab-icon-up-${perm_modulo}`} className="usuario-icon-up" icon={faSortUp} />
                                    <FontAwesomeIcon id={`tab-icon-down-${perm_modulo}`} className="usuario-icon-down" icon={faSortDown} />
                                  </div>
                                </Col>
                              </Row>
                              {/*** LINHA COM TITULO DO MODULO - OCULTO ***/}
                              <Row
                                id={`modulo-titulo-${desc_modulo}`}
                                className="hide"
                              >
                                <Col
                                  sm={12}
                                  className="p-2 pl-3 text-dark"
                                  style={{ backgroundColor: '#EEE', height: altura_linha }}
                                >
                                  <CustomInput
                                    type="switch"
                                    id={`modulo-${desc_modulo}-acesso`}
                                    name={`modulo-${desc_modulo}-acesso`}
                                    className="m-0 float-left noselect"
                                    onChange={onClick_mod}
                                  />
                                  <span className="text-dark ml-2 cursor-default noselect">
                                    { desc_modulo }
                                  </span>
                                </Col>
                              </Row>
                              {/*** LINHA COM PAGINAS DO MODULO - OCULTO ***/}
                              <Row
                                id={`modulo-card-paginas-${desc_modulo}`}
                                className="hide"
                              >
                                <Col sm={12}>
                                  {
                                    !!pagina_regs && pagina_regs.map((pagina) => {
                                      const { descricao: desc_pagina } = pagina;

                                      //const checked_pag = atribuiPaginaChecked(desc_pagina);
                                      const onClick_pag = atribuiPaginaOnClick(pagina);

                                      return (
                                        <Row
                                          id={`modulo-pagina-${desc_pagina}`}
                                          onClick={() => selectPagina(desc_pagina, ultima_linha_selecionada)}
                                        >
                                          <Col
                                            sm={12}
                                            className="p-2 pl-5"
                                            style={{ height: altura_linha }}
                                          >
                                            <CustomInput
                                              type="switch"
                                              id={`pagina-${desc_pagina}-acesso`}
                                              name={`pagina-${desc_pagina}-acesso`}
                                              className="m-0 float-left noselect"
                                              onClick={onClick_pag}
                                            />
                                            <span className="ml-2 cursor-default noselect">{ desc_pagina }</span>
                                          </Col>
                                        </Row>
                                      );
                                    })
                                  }
                                </Col>
                              </Row>
                            </>
                          );
                        })
                      }
                    </Col>
                    {/************************/}
                    {/*** COL 02 - FUNCOES ***/}
                    {/************************/}
                    <Col sm={6}>
                      {/*** LINHA TITULO FUNCOES ***/}
                      <Row>
                        <Col
                          sm={12}
                          className="p-2 pl-3 bg-dark text-white"
                          style={{ height: altura_linha }}
                        >
                          <span className="cursor-default noselect">FUNÇÕES</span>
                        </Col>
                      </Row>
                      {/*** LINHA CARD FUNCOES ***/}
                      {
                        !!modulo_regs && modulo_regs.map((modulo) => {
                          const { pagina_regs } = modulo;
                          return (
                            <>
                              {
                                !!pagina_regs && pagina_regs.map((pagina) => {
                                  const { descricao: desc_pagina, funcao_regs } = pagina;
                                  /*** LINHA FUNCOES DA PAGINA ***/
                                  return (
                                    <Row
                                      id={`card-funcoes-${desc_pagina}`}
                                      className="hide"
                                    >
                                      <Col
                                        sm={12}
                                        className="p-2 pl-3"
                                        style={{ backgroundColor: '#EEE', height: altura_linha }}
                                      >
                                        <span className="text-dark ml-2 cursor-default noselect">{ desc_pagina }</span>
                                      </Col>
                                      {
                                        !!funcao_regs && funcao_regs.map((funcao) => {
                                          const { descricao: desc_acao, permissao: perm_acao } = funcao;

                                          //const checked_funcao = atribuiAcaoChecked(desc_pagina, desc_acao);
                                          const onClick_funcao = atribuiAcaoOnClick(desc_pagina, desc_acao, perm_acao);

                                          return (
                                            <Col
                                              sm={12}
                                              className="p-2 pl-4"
                                              style={{ height: altura_linha }}
                                            >
                                              <CustomInput
                                                type="switch"
                                                id={`funcao-${desc_pagina}-${desc_acao}-acesso`}
                                                name={`funcao-${desc_pagina}-${desc_acao}-acesso`}
                                                className="m-0 float-left noselect"
                                                //checked={checked_funcao}
                                                onClick={onClick_funcao}
                                              />
                                              <span className="text-dark ml-2 cursor-default noselect">{ desc_acao }</span>
                                            </Col>
                                          );
                                        })
                                      }
                                    </Row>
                                  );
                                })
                              }
                            </>
                          );
                        })
                      }
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>

              <Row className="pb-3">
                <Col>
                  <SaveButton save={() => saveUsuario(props, form)} />
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
  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(UsuarioFicha);
