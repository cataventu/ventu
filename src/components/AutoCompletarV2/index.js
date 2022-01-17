///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'reactstrap';
import { connect } from 'react-redux';
import { autoCompletarV2, formatNomeReserva } from '../../functions/sistema';

function AutoCompletarV2(props) {
  ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////
  ////// INSTRUCOES AO INCLUIR NOVA PESQUISA
  ////// -- EDITAR handleEnter
  ////// -- EDITAR handleSelectLine
  ////// -- EDITAR USE EFFECT handleSelectLine
  ////// -- EDITAR USE EFFECT handleEnter
  ////// -- ADICIONAR STATES DO REDUX
  ////// -- EDITAR FUNCAO autoCompletarV2 (se necessário)
  ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////
  ////// PROPS (Obrigatórios)
  ////// -- value      { string }
  ////// -- valueId    { integer }
  ////// -- tabela     { string }
  ////// -- campo      { string or '' }
  ////// -- editar     { json = { id: 0, value: '', valueId: 0 } }
  ///////////////////////////////////////////////////////
  ////// PROPS (opcional)
  ////// -- disabled         { true/ false }
  ////// -- visible          { true/ false }
  ////// -- dados_adicionais { true/ false }
  ////// -- required         { true/ false }
  ////// -- nomeReserva      { true/ false }
  ////// -- resetEditar      { true/ false }
  ///////////////////////////////////////////////////////

  const [firstLoad, setFirst] = useState(true);
  const [flagEditar, setFlagEditar] = useState(true);
  const [listaDados, setListaDados] = useState('');
  const [listaDadosTotal, setTotal] = useState(0);

  const [Value, setValue] = useState('');
  const [ValueID, setValueID] = useState(0);
  const [Tabela, setTabela] = useState('');
  const [Campo, setCampo] = useState('');
  const [Disabled, setDisabled] = useState(false);
  const [Required, setRequired] = useState('');

  const [showInput, setShowInput] = useState('show');
  const [showContent, setShowContent] = useState('hide');

  const handleNomeReserva = useCallback((value) => {
    const { dispatch, tabela } = props;

    let Payload = formatNomeReserva(value);

    if (value === 'reset') { Payload = ' '; }

    switch (tabela) {
      case 'PFISICA':
        dispatch({ type: '@SET_AUTOCOMPLETAR_RESERVA_PFISICA', payload: Payload });
        break;
      case 'ACOMPANHANTE':
        dispatch({ type: '@SET_AUTOCOMPLETAR_RESERVA_ACOMPANHANTE', payload: Payload });
        break;
      default:
    }
  }, [props]);

  const handleDispatch = useCallback((id, descricao) => {
    const { dispatch } = props;
    dispatch({ type: `@SET_AUTOCOMPLETAR_${Tabela}`, payload: descricao });
    dispatch({ type: `@SET_AUTOCOMPLETAR_ID_${Tabela}`, payload: id });
  }, [props, Tabela]);

  const handleClear = useCallback(() => {
    handleNomeReserva('reset');
    setValue('');
    setValueID(0);
    handleDispatch(0, '');
  }, [handleDispatch, handleNomeReserva]);

  const handleClick = useCallback((id, descricao, dados_adicionais) => {
    const { dispatch, nomeReserva } = props;
    if (dados_adicionais) { dispatch({ type: `@SET_AUTOCOMPLETAR_${Tabela}_DADOS_ADICIONAIS`, payload: dados_adicionais }); }
    if (nomeReserva) { handleNomeReserva(descricao); }
    setValueID(id);
    setValue(descricao);
    setShowContent('hide');
    handleDispatch(id, descricao);
  }, [handleDispatch, handleNomeReserva, Tabela, props]);

  const handleKeyDown = useCallback((e) => {
    const keyPressed = e.key;
    const { dispatch, tabela } = props;
    if (keyPressed) {
      if (keyPressed === 'ArrowDown') { dispatch({ type: `@SET_AUTOCOMPLETAR_${tabela}_CURSOR_MAIS` }); }
      if (keyPressed === 'ArrowUp') { dispatch({ type: `@SET_AUTOCOMPLETAR_${tabela}_CURSOR_MENOS` }); }
      if (keyPressed === 'Enter') { dispatch({ type: `@SET_AUTOCOMPLETAR_${tabela}_ENTER_TRUE` }); }
    }
  }, [props]);

  const handleSearch = useCallback((value) => {
    setValue(value);

    document.addEventListener('keydown', handleKeyDown);

    async function getInfo(value) {
      const response = await autoCompletarV2(props, value, Tabela.toString(), Campo.toString());
      if (response) {
        const _temp = [];
        let i = -1;
        response.forEach((item) => {
          i += 1;
          _temp.push(
            <>
              <option
                id={`auto-completar-${Tabela}-${i}`}
                onClick={() => handleClick(item.id, item.descricao, item.dados_adicionais)}
                className="auto-completar-item"
                value={item.id}

                dados_adicionais={JSON.stringify(item.dados_adicionais)}
              >
                { item.descricao }
              </option>
            </>,
          );
        });
        setListaDados(_temp);
        setTotal(i);
      }
    }

    getInfo(value);

    if (value.length === 0) { handleNomeReserva('reset'); }
    if (value.length > 3) { setShowContent('show'); }
  }, [handleKeyDown, props, Tabela, Campo, handleClick, handleNomeReserva]);

  const handleShowContent = useCallback(() => {
    if (showContent === 'show') {
      setShowContent('hide');
      document.removeEventListener('keydown', handleKeyDown);
    } else {
      setShowContent('show');
    }
  }, [showContent, handleKeyDown]);

  const handleVisible = useCallback((visible) => {
    if (visible) {
      setShowInput('show');
    } else {
      setShowInput('hide');
      setValue('');
      setValueID(0);
    }
    setShowContent('hide');
  }, []);

  const handleDisable = useCallback((disable) => {
    disable
      ? setDisabled(true)
      : setDisabled(false);
  }, []);

  const handleReset = useCallback(() => {
    setValue('');
    setValueID(0);
    setFlagEditar(true);
  }, []);

  ////////////////////////
  ////////////////////////

  const handleEnter = useCallback(() => {
    const {
      dispatch,
      tabela,
      nomeReserva,
      dados_adicionais,

      autoCompletarSolicitanteCursor,
      autoCompletarProservicoCursor,
      autoCompletarServicoCursor,
      autoCompletarRServicoCursor,

      autoCompletarFornecedorCursor,
      autoCompletarContratanteCursor,
      autoCompletarCredorCursor,
      autoCompletarRepresentanteCursor,

      autoCompletarPaisCursor,
      autoCompletarPaisEmissaoCursor,
      autoCompletarGrupoCursor,
      autoCompletarMunicipioCursor,
      autoCompletarRES_MunicipioCursor,
      autoCompletarCOM_MunicipioCursor,
      autoCompletarAcompanhanteCursor,
      autoCompletarMoedaCursor,
      autoCompletarSubGrupoCursor,
      autoCompletarProfissaoCursor,

      autoCompletarPfisicaCursor,
      autoCompletarPjuridicaCursor,
      autoCompletarRfa_PfisicaCursor,
      autoCompletarRfa_PjuridicaCursor,
      autoCompletarWoo_PfisicaCursor,
      autoCompletarWoo_PjuridicaCursor,

      autoCompletarProjetoCursor,
      autoCompletarUsuarioCursor,
      autoCompletarUsuarioOrigemCursor,
      autoCompletarUsuarioDestinoCursor,
      autoCompletarCartaoCorpCursor,
      autoCompletarTitularCursor,
      autoCompletarTipoCartaoCursor,
      autoCompletarRamoatividadeCursor,
      autoCompletarAeroportoCursor,
      autoCompletarAeroporto_OrigemCursor,
      autoCompletarAeroporto_DestinoCursor,

      autoCompletarStep06_PfisicaCursor,
      autoCompletarStep06_PjuridicaCursor,

    } = props;

    dispatch({ type: `@SET_AUTOCOMPLETAR_${tabela}_ENTER_FALSE` });
    let id_item;

    switch (tabela) {
      case 'SOLICITANTE':
        id_item = `auto-completar-${tabela}-${autoCompletarSolicitanteCursor}`;
        break;
      case 'STEP06_PFISICA':
        id_item = `auto-completar-${tabela}-${autoCompletarStep06_PfisicaCursor}`;
        break;
      case 'STEP06_PJURIDICA':
        id_item = `auto-completar-${tabela}-${autoCompletarStep06_PjuridicaCursor}`;
        break;
      case 'PROSERVICO':
        id_item = `auto-completar-${tabela}-${autoCompletarProservicoCursor}`;
        break;
      case 'SERVICO':
        id_item = `auto-completar-${tabela}-${autoCompletarServicoCursor}`;
        break;
      case 'RSERVICO':
        id_item = `auto-completar-${tabela}-${autoCompletarRServicoCursor}`;
        break;
      case 'FORNECEDOR':
        id_item = `auto-completar-${tabela}-${autoCompletarFornecedorCursor}`;
        break;
      case 'CONTRATANTE':
        id_item = `auto-completar-${tabela}-${autoCompletarContratanteCursor}`;
        break;
      case 'CREDOR':
        id_item = `auto-completar-${tabela}-${autoCompletarCredorCursor}`;
        break;
      case 'REPRESENTANTE':
        id_item = `auto-completar-${tabela}-${autoCompletarRepresentanteCursor}`;
        break;
      case 'PAIS':
        id_item = `auto-completar-${tabela}-${autoCompletarPaisCursor}`;
        break;
      case 'PAISEMISSAO':
        id_item = `auto-completar-${tabela}-${autoCompletarPaisEmissaoCursor}`;
        break;
      case 'GRUPO':
        id_item = `auto-completar-${tabela}-${autoCompletarGrupoCursor}`;
        break;
      case 'MUNICIPIO':
        id_item = `auto-completar-${tabela}-${autoCompletarMunicipioCursor}`;
        break;
      case 'RES_MUNICIPIO':
        id_item = `auto-completar-${tabela}-${autoCompletarRES_MunicipioCursor}`;
        break;
      case 'COM_MUNICIPIO':
        id_item = `auto-completar-${tabela}-${autoCompletarCOM_MunicipioCursor}`;
        break;
      case 'ACOMPANHANTE':
        id_item = `auto-completar-${tabela}-${autoCompletarAcompanhanteCursor}`;
        break;
      case 'MOEDA':
        id_item = `auto-completar-${tabela}-${autoCompletarMoedaCursor}`;
        break;
      case 'SUBGRUPO':
        id_item = `auto-completar-${tabela}-${autoCompletarSubGrupoCursor}`;
        break;
      case 'PROFISSAO':
        id_item = `auto-completar-${tabela}-${autoCompletarProfissaoCursor}`;
        break;
      case 'PFISICA':
        id_item = `auto-completar-${tabela}-${autoCompletarPfisicaCursor}`;
        break;
      case 'PJURIDICA':
        id_item = `auto-completar-${tabela}-${autoCompletarPjuridicaCursor}`;
        break;
      case 'RFA_PFISICA':
        id_item = `auto-completar-${tabela}-${autoCompletarRfa_PfisicaCursor}`;
        break;
      case 'RFA_PJURIDICA':
        id_item = `auto-completar-${tabela}-${autoCompletarRfa_PjuridicaCursor}`;
        break;
      case 'WOO_PFISICA':
        id_item = `auto-completar-${tabela}-${autoCompletarWoo_PfisicaCursor}`;
        break;
      case 'WOO_PJURIDICA':
        id_item = `auto-completar-${tabela}-${autoCompletarWoo_PjuridicaCursor}`;
        break;
      case 'PROJETO':
        id_item = `auto-completar-${tabela}-${autoCompletarProjetoCursor}`;
        break;
      case 'USUARIO':
        id_item = `auto-completar-${tabela}-${autoCompletarUsuarioCursor}`;
        break;
      case 'USUARIO_ORIGEM':
        id_item = `auto-completar-${tabela}-${autoCompletarUsuarioOrigemCursor}`;
        break;
      case 'USUARIO_DESTINO':
        id_item = `auto-completar-${tabela}-${autoCompletarUsuarioDestinoCursor}`;
        break;
      case 'CARTAOCORP':
        id_item = `auto-completar-${tabela}-${autoCompletarCartaoCorpCursor}`;
        break;
      case 'TITULAR':
        id_item = `auto-completar-${tabela}-${autoCompletarTitularCursor}`;
        break;
      case 'TIPOCARTAO':
        id_item = `auto-completar-${tabela}-${autoCompletarTipoCartaoCursor}`;
        break;
      case 'RAMOATIVIDADE':
        id_item = `auto-completar-${tabela}-${autoCompletarRamoatividadeCursor}`;
        break;
      case 'AEROPORTO':
        id_item = `auto-completar-${tabela}-${autoCompletarAeroportoCursor}`;
        break;
      case 'AEROPORTO_ORIGEM':
        id_item = `auto-completar-${tabela}-${autoCompletarAeroporto_OrigemCursor}`;
        break;
      case 'AEROPORTO_DESTINO':
        id_item = `auto-completar-${tabela}-${autoCompletarAeroporto_DestinoCursor}`;
        break;
      default:
    }

    ////// SELECIONA LINHA //////
    const linhaSelecionada = document.getElementById(id_item);

    if (linhaSelecionada !== undefined && linhaSelecionada !== null) {
      const text = linhaSelecionada.textContent;
      const valueId = linhaSelecionada.value;
      setValue(text);
      setValueID(valueId);
      setShowContent('hide');
      if (nomeReserva) { handleNomeReserva(text); }
      if (dados_adicionais) {
        const dados = JSON.parse(linhaSelecionada.getAttribute('dados_adicionais'));
        dispatch({ type: `@SET_AUTOCOMPLETAR_${Tabela}_DADOS_ADICIONAIS`, payload: dados });
      }
      handleDispatch(valueId, text);
    }
  }, [props, handleDispatch, handleNomeReserva, Tabela]);

  const handleSelectLine = useCallback(() => {
    if (showContent === 'show' && listaDados !== '') {
      const { dispatch, tabela } = props;

      const { autoCompletarSolicitanteScroll, autoCompletarSolicitanteCursor } = props;
      const { autoCompletarProservicoScroll, autoCompletarProservicoCursor } = props;
      const { autoCompletarServicoScroll, autoCompletarServicoCursor } = props;
      const { autoCompletarRServicoScroll, autoCompletarRServicoCursor } = props;

      const { autoCompletarFornecedorScroll, autoCompletarFornecedorCursor } = props;
      const { autoCompletarContratanteScroll, autoCompletarContratanteCursor } = props;
      const { autoCompletarCredorScroll, autoCompletarCredorCursor } = props;
      const { autoCompletarRepresentanteScroll, autoCompletarRepresentanteCursor } = props;

      const { autoCompletarPaisScroll, autoCompletarPaisCursor } = props;
      const { autoCompletarPaisEmissaoScroll, autoCompletarPaisEmissaoCursor } = props;
      const { autoCompletarGrupoScroll, autoCompletarGrupoCursor } = props;
      const { autoCompletarMunicipioScroll, autoCompletarMunicipioCursor } = props;
      const { autoCompletarRES_MunicipioScroll, autoCompletarRES_MunicipioCursor } = props;
      const { autoCompletarCOM_MunicipioScroll, autoCompletarCOM_MunicipioCursor } = props;
      const { autoCompletarAcompanhanteScroll, autoCompletarAcompanhanteCursor } = props;
      const { autoCompletarMoedaScroll, autoCompletarMoedaCursor } = props;
      const { autoCompletarSubGrupoScroll, autoCompletarSubGrupoCursor } = props;
      const { autoCompletarProfissaoScroll, autoCompletarProfissaoCursor } = props;

      const { autoCompletarPfisicaScroll, autoCompletarPfisicaCursor } = props;
      const { autoCompletarPjuridicaScroll, autoCompletarPjuridicaCursor } = props;
      const { autoCompletarRfa_PfisicaScroll, autoCompletarRfa_PfisicaCursor } = props;
      const { autoCompletarRfa_PjuridicaScroll, autoCompletarRfa_PjuridicaCursor } = props;
      const { autoCompletarWoo_PfisicaScroll, autoCompletarWoo_PfisicaCursor } = props;
      const { autoCompletarWoo_PjuridicaScroll, autoCompletarWoo_PjuridicaCursor } = props;

      const { autoCompletarProjetoScroll, autoCompletarProjetoCursor } = props;
      const { autoCompletarUsuarioScroll, autoCompletarUsuarioCursor } = props;
      const { autoCompletarUsuarioOrigemScroll, autoCompletarUsuarioOrigemCursor } = props;
      const { autoCompletarUsuarioDestinoScroll, autoCompletarUsuarioDestinoCursor } = props;
      const { autoCompletarCartaoCorpScroll, autoCompletarCartaoCorpCursor } = props;
      const { autoCompletarTitularScroll, autoCompletarTitularCursor } = props;
      const { autoCompletarTipoCartaoScroll, autoCompletarTipoCartaoCursor } = props;
      const { autoCompletarRamoatividadeScroll, autoCompletarRamoatividadeCursor } = props;

      const { autoCompletarAeroportoScroll, autoCompletarAeroportoCursor } = props;
      const { autoCompletarAeroporto_OrigemScroll, autoCompletarAeroporto_OrigemCursor } = props;
      const { autoCompletarAeroporto_DestinoScroll, autoCompletarAeroporto_DestinoCursor } = props;

      const { autoCompletarStep06_PfisicaCursor, autoCompletarStep06_PfisicaScroll } = props;
      const { autoCompletarStep06_PjuridicaCursor, autoCompletarStep06_PjuridicaScroll } = props;

      const divContent = document.getElementById(`auto-completar-content-${tabela}`);
      const scrollLimit = divContent.scrollHeight - 28;

      let number;
      let scroll;

      switch (tabela) {
        case 'SOLICITANTE':
          number = autoCompletarSolicitanteCursor;
          scroll = autoCompletarSolicitanteScroll;
          break;
        case 'STEP06_PFISICA':
          number = autoCompletarStep06_PfisicaCursor;
          scroll = autoCompletarStep06_PfisicaScroll;
          break;
        case 'STEP06_PJURIDICA':
          number = autoCompletarStep06_PjuridicaCursor;
          scroll = autoCompletarStep06_PjuridicaScroll;
          break;
        case 'PROSERVICO':
          number = autoCompletarProservicoCursor;
          scroll = autoCompletarProservicoScroll;
          break;
        case 'SERVICO':
          number = autoCompletarServicoCursor;
          scroll = autoCompletarServicoScroll;
          break;
        case 'RSERVICO':
          number = autoCompletarRServicoCursor;
          scroll = autoCompletarRServicoScroll;
          break;
        case 'FORNECEDOR':
          number = autoCompletarFornecedorCursor;
          scroll = autoCompletarFornecedorScroll;
          break;
        case 'CONTRATANTE':
          number = autoCompletarContratanteCursor;
          scroll = autoCompletarContratanteScroll;
          break;
        case 'CREDOR':
          number = autoCompletarCredorCursor;
          scroll = autoCompletarCredorScroll;
          break;
        case 'REPRESENTANTE':
          number = autoCompletarRepresentanteCursor;
          scroll = autoCompletarRepresentanteScroll;
          break;
        case 'PAIS':
          number = autoCompletarPaisCursor;
          scroll = autoCompletarPaisScroll;
          break;
        case 'PAISEMISSAO':
          number = autoCompletarPaisEmissaoCursor;
          scroll = autoCompletarPaisEmissaoScroll;
          break;
        case 'GRUPO':
          number = autoCompletarGrupoCursor;
          scroll = autoCompletarGrupoScroll;
          break;
        case 'MUNICIPIO':
          number = autoCompletarMunicipioCursor;
          scroll = autoCompletarMunicipioScroll;
          break;
        case 'RES_MUNICIPIO':
          number = autoCompletarRES_MunicipioCursor;
          scroll = autoCompletarRES_MunicipioScroll;
          break;
        case 'COM_MUNICIPIO':
          number = autoCompletarCOM_MunicipioCursor;
          scroll = autoCompletarCOM_MunicipioScroll;
          break;
        case 'ACOMPANHANTE':
          number = autoCompletarAcompanhanteCursor;
          scroll = autoCompletarAcompanhanteScroll;
          break;
        case 'MOEDA':
          number = autoCompletarMoedaCursor;
          scroll = autoCompletarMoedaScroll;
          break;
        case 'SUBGRUPO':
          number = autoCompletarSubGrupoCursor;
          scroll = autoCompletarSubGrupoScroll;
          break;
        case 'PROFISSAO':
          number = autoCompletarProfissaoCursor;
          scroll = autoCompletarProfissaoScroll;
          break;
        case 'PFISICA':
          number = autoCompletarPfisicaCursor;
          scroll = autoCompletarPfisicaScroll;
          break;
        case 'PJURIDICA':
          number = autoCompletarPjuridicaCursor;
          scroll = autoCompletarPjuridicaScroll;
          break;
        case 'RFA_PFISICA':
          number = autoCompletarRfa_PfisicaCursor;
          scroll = autoCompletarRfa_PfisicaScroll;
          break;
        case 'RFA_PJURIDICA':
          number = autoCompletarRfa_PjuridicaCursor;
          scroll = autoCompletarRfa_PjuridicaScroll;
          break;
        case 'WOO_PFISICA':
          number = autoCompletarWoo_PfisicaCursor;
          scroll = autoCompletarWoo_PfisicaScroll;
          break;
        case 'WOO_PJURIDICA':
          number = autoCompletarWoo_PjuridicaCursor;
          scroll = autoCompletarWoo_PjuridicaScroll;
          break;
        case 'PROJETO':
          number = autoCompletarProjetoCursor;
          scroll = autoCompletarProjetoScroll;
          break;
        case 'USUARIO':
          number = autoCompletarUsuarioCursor;
          scroll = autoCompletarUsuarioScroll;
          break;
        case 'USUARIO_ORIGEM':
          number = autoCompletarUsuarioOrigemCursor;
          scroll = autoCompletarUsuarioOrigemScroll;
          break;
        case 'USUARIO_DESTINO':
          number = autoCompletarUsuarioDestinoCursor;
          scroll = autoCompletarUsuarioDestinoScroll;
          break;
        case 'CARTAOCORP':
          number = autoCompletarCartaoCorpCursor;
          scroll = autoCompletarCartaoCorpScroll;
          break;
        case 'TITULAR':
          number = autoCompletarTitularCursor;
          scroll = autoCompletarTitularScroll;
          break;
        case 'TIPOCARTAO':
          number = autoCompletarTipoCartaoCursor;
          scroll = autoCompletarTipoCartaoScroll;
          break;
        case 'RAMOATIVIDADE':
          number = autoCompletarRamoatividadeCursor;
          scroll = autoCompletarRamoatividadeScroll;
          break;
        case 'AEROPORTO':
          number = autoCompletarAeroportoCursor;
          scroll = autoCompletarAeroportoScroll;
          break;
        case 'AEROPORTO_ORIGEM':
          number = autoCompletarAeroporto_OrigemCursor;
          scroll = autoCompletarAeroporto_OrigemScroll;
          break;
        case 'AEROPORTO_DESTINO':
          number = autoCompletarAeroporto_DestinoCursor;
          scroll = autoCompletarAeroporto_DestinoScroll;
          break;
        default: return null;
      }

      if (number < 0) {
        number = 0;
        scroll = 0;
        dispatch({ type: `@SET_AUTOCOMPLETAR_${tabela}_CURSOR`, payload: 0 });
        dispatch({ type: `@SET_AUTOCOMPLETAR_${tabela}_SCROLL`, payload: 0 });
      }

      if (number > listaDadosTotal) {
        number = listaDadosTotal;
        dispatch({ type: `@SET_AUTOCOMPLETAR_${tabela}_CURSOR`, payload: number });
        dispatch({ type: `@SET_AUTOCOMPLETAR_${tabela}_SCROLL`, payload: scrollLimit });
      }

      ////// SCROLL CONTENT
      divContent.scroll({ top: scroll });

      ////// LIMPA LINHAS SELECIONADAS //////
      const itens = document.getElementsByClassName('auto-completar-item-hover');

      if (itens !== undefined) {
        itens.forEach((item) => {
          item.classList.remove('auto-completar-item-hover');
        });

        ////// SELECIONA LINHA //////
        const id_item = `auto-completar-${tabela}-${number}`;
        const element = document.getElementById(id_item);
        if (element !== undefined && element !== null) {
          element.classList.add('auto-completar-item-hover');
        }
      }
    }
    return false;
  }, [props, showContent, listaDadosTotal, listaDados]);

  ////////////////////////
  ////////////////////////

  ////// FIRST LOAD + RESET AC
  useEffect(() => {
    const {
      dispatch, disabled, value, valueID, tabela, visible, campo,
    } = props;

    if (firstLoad) {
      dispatch({ type: '@RESET_AUTOCOMPLETAR' });
      setValue(value);
      setValueID(valueID);
      setTabela(tabela);
      setCampo(campo);
      setDisabled(disabled);
      setFirst(false);
      handleVisible(visible);
    }
  }, [props, firstLoad, handleVisible]);

  ////// MONITORA EDITAR (UMA ÚNICA VEZ)
  useEffect(() => {
    if (props.editar.id > 0 && flagEditar) {
      setValueID(props.editar.valueId);
      setValue(props.editar.value);
      setFlagEditar(false);
    }
  }, [flagEditar, props.editar]);

  ////// MONITORA RESET VALORES
  useEffect(() => {
    if (props.resetEditar) { handleReset(); }
  }, [props.resetEditar, handleReset]);

  ////// MONITORA VISIBILITY | DISABLED | TABELA | EDITAR | CAMPO ADICIONAL BUSCA
  useEffect(() => {
    handleVisible(props.visible);
    handleDisable(props.disabled);
    setCampo(props.campo);
    setTabela(props.tabela);
    setListaDados('');
    setShowContent('hide');
    props.required
      ? setRequired('required')
      : setRequired('');
  }, [props.visible, props.disabled, props.required, props.campo, props.tabela, props.resetEditar, handleVisible, handleDisable]);

  ////// MONITORA BTN UP E DOWN - handleSelectLine
  useEffect(() => {
    handleSelectLine();
  }, [props.autoCompletarSolicitanteCursor,
    props.autoCompletarProservicoCursor,
    props.autoCompletarRServicoCursor,
    props.autoCompletarServicoCursor,

    props.autoCompletarFornecedorCursor,
    props.autoCompletarContratanteCursor,
    props.autoCompletarCredorCursor,
    props.autoCompletarRepresentanteCursor,

    props.autoCompletarPaisCursor,
    props.autoCompletarPaisEmissaoCursor,
    props.autoCompletarGrupoCursor,
    props.autoCompletarMunicipioCursor,
    props.autoCompletarRES_MunicipioCursor,
    props.autoCompletarCOM_MunicipioCursor,
    props.autoCompletarAcompanhanteCursor,
    props.autoCompletarMoedaCursor,
    props.autoCompletarSubGrupoCursor,
    props.autoCompletarProfissaoCursor,

    props.autoCompletarPfisicaCursor,
    props.autoCompletarPjuridicaCursor,
    props.autoCompletarRfa_PfisicaCursor,
    props.autoCompletarRfa_PjuridicaCursor,
    props.autoCompletarWoo_PfisicaCursor,
    props.autoCompletarWoo_PjuridicaCursor,

    props.autoCompletarProjetoCursor,
    props.autoCompletarUsuarioCursor,
    props.autoCompletarUsuarioOrigemCursor,
    props.autoCompletarUsuarioDestinoCursor,
    props.autoCompletarCartaoCorpCursor,
    props.autoCompletarTitularCursor,
    props.autoCompletarTipoCartaoCursor,
    props.autoCompletarRamoatividadeCursor,
    props.autoCompletarAeroportoCursor,
    props.autoCompletarAeroporto_OrigemCursor,
    props.autoCompletarAeroporto_DestinoCursor,
    props.autoCompletarStep06_PjuridicaCursor,
    props.autoCompletarStep06_PfisicaCursor,
    handleSelectLine]);

  ////// MONITORA BTN ENTER - handleEnter
  useEffect(() => {
    if (props.autoCompletarSolicitanteEnter
            || props.autoCompletarProservicoEnter
            || props.autoCompletarServicoEnter
            || props.autoCompletarRServicoEnter

            || props.autoCompletarFornecedorEnter
            || props.autoCompletarContratanteEnter
            || props.autoCompletarCredorEnter
            || props.autoCompletarRepresentanteEnter

            || props.autoCompletarPaisEnter
            || props.autoCompletarPaisEmissaoEnter
            || props.autoCompletarGrupoEnter
            || props.autoCompletarMunicipioEnter
            || props.autoCompletarRES_MunicipioEnter
            || props.autoCompletarCOM_MunicipioEnter
            || props.autoCompletarAcompanhanteEnter
            || props.autoCompletarMoedaEnter
            || props.autoCompletarSubGrupoEnter
            || props.autoCompletarProfissaoEnter

            || props.autoCompletarPfisicaEnter
            || props.autoCompletarPjuridicaEnter
            || props.autoCompletarRfa_PfisicaEnter
            || props.autoCompletarRfa_PjuridicaEnter
            || props.autoCompletarWoo_PfisicaEnter
            || props.autoCompletarWoo_PjuridicaEnter

            || props.autoCompletarProjetoEnter
            || props.autoCompletarUsuarioEnter
            || props.autoCompletarUsuarioOrigemEnter
            || props.autoCompletarUsuarioDestinoEnter
            || props.autoCompletarCartaoCorpEnter
            || props.autoCompletarTitularEnter
            || props.autoCompletarTipoCartaoEnter
            || props.autoCompletarRamoatividadeEnter
            || props.autoCompletarAeroportoEnter
            || props.autoCompletarAeroporto_OrigemEnter
            || props.autoCompletarAeroporto_DestinoEnter
            || props.autoCompletarStep06_PjuridicaEnter
            || props.autoCompletarStep06_PfisicaEnter
    ) {
      handleEnter();
    }
  }, [
    props.autoCompletarSolicitanteEnter,
    props.autoCompletarProservicoEnter,
    props.autoCompletarServicoEnter,
    props.autoCompletarRServicoEnter,

    props.autoCompletarFornecedorEnter,
    props.autoCompletarContratanteEnter,
    props.autoCompletarCredorEnter,
    props.autoCompletarRepresentanteEnter,

    props.autoCompletarPaisEnter,
    props.autoCompletarPaisEmissaoEnter,
    props.autoCompletarGrupoEnter,
    props.autoCompletarMunicipioEnter,
    props.autoCompletarRES_MunicipioEnter,
    props.autoCompletarCOM_MunicipioEnter,
    props.autoCompletarAcompanhanteEnter,
    props.autoCompletarMoedaEnter,
    props.autoCompletarSubGrupoEnter,
    props.autoCompletarProfissaoEnter,

    props.autoCompletarPfisicaEnter,
    props.autoCompletarPjuridicaEnter,
    props.autoCompletarRfa_PfisicaEnter,
    props.autoCompletarRfa_PjuridicaEnter,
    props.autoCompletarWoo_PfisicaEnter,
    props.autoCompletarWoo_PjuridicaEnter,

    props.autoCompletarProjetoEnter,
    props.autoCompletarUsuarioEnter,
    props.autoCompletarUsuarioOrigemEnter,
    props.autoCompletarUsuarioDestinoEnter,
    props.autoCompletarCartaoCorpEnter,
    props.autoCompletarTitularEnter,
    props.autoCompletarTipoCartaoEnter,
    props.autoCompletarRamoatividadeEnter,
    props.autoCompletarAeroportoEnter,
    props.autoCompletarAeroporto_OrigemEnter,
    props.autoCompletarAeroporto_DestinoEnter,
    props.autoCompletarStep06_PjuridicaEnter,
    props.autoCompletarStep06_PfisicaEnter,
    handleEnter]);

  return (
    <>
      <div className={`auto-completar-icon-light p-2 ${showInput}`}>
        <FontAwesomeIcon icon={faBolt} className={showInput} />
      </div>
      <div className={`auto-completar-icon-trash p-2 ${showInput}`} onClick={() => handleClear()}>
        <FontAwesomeIcon icon={faTrash} className={`text-danger ${showInput}`} />
      </div>
      {/***********************************/}
      <Input
        type="text"
        autocomplete="off"
        className={`auto-completar-input ${Required} ${showInput}`}
        value={Value}
        disabled={Disabled}
        onChange={(e) => handleSearch(e.target.value)}
        onClick={() => handleShowContent()}
      />
      {/*** ID OCULTO DO AUTO COMPLETAR ***/}
      <Input
        type="text"
        className="text-center hide"
        disabled
        value={ValueID}
        style={{ width: 70 }}
      />
      {/***********************************/}
      <div className={`col-12 auto-completar-container ${showContent}`}>
        <div id={`auto-completar-content-${Tabela}`} className="auto-completar-content form-control">
          { listaDados }
        </div>
      </div>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  autoCompletarId_Solicitante: state.autoCompletar.autoCompletarId_Solicitante,
  autoCompletarSolicitante: state.autoCompletar.autoCompletarSolicitante,
  autoCompletarSolicitanteEnter: state.autoCompletar.autoCompletarSolicitanteEnter,
  autoCompletarSolicitanteScroll: state.autoCompletar.autoCompletarSolicitanteScroll,
  autoCompletarSolicitanteCursor: state.autoCompletar.autoCompletarSolicitanteCursor,

  autoCompletarId_Servico: state.autoCompletar.autoCompletarId_Servico,
  autoCompletarServico: state.autoCompletar.autoCompletarServico,
  autoCompletarServicoEnter: state.autoCompletar.autoCompletarServicoEnter,
  autoCompletarServicoScroll: state.autoCompletar.autoCompletarServicoScroll,
  autoCompletarServicoCursor: state.autoCompletar.autoCompletarServicoCursor,

  autoCompletarId_RServico: state.autoCompletar.autoCompletarId_RServico,
  autoCompletarRServico: state.autoCompletar.autoCompletarRServico,
  autoCompletarRServicoEnter: state.autoCompletar.autoCompletarRServicoEnter,
  autoCompletarRServicoScroll: state.autoCompletar.autoCompletarRServicoScroll,
  autoCompletarRServicoCursor: state.autoCompletar.autoCompletarRServicoCursor,

  autoCompletarId_Proservico: state.autoCompletar.autoCompletarId_Proservico,
  autoCompletarProservico: state.autoCompletar.autoCompletarProservico,
  autoCompletarProservicoEnter: state.autoCompletar.autoCompletarProservicoEnter,
  autoCompletarProservicoScroll: state.autoCompletar.autoCompletarProservicoScroll,
  autoCompletarProservicoCursor: state.autoCompletar.autoCompletarProservicoCursor,

  autoCompletarId_Fornecedor: state.autoCompletar.autoCompletarId_Fornecedor,
  autoCompletarFornecedor: state.autoCompletar.autoCompletarFornecedor,
  autoCompletarFornecedorEnter: state.autoCompletar.autoCompletarFornecedorEnter,
  autoCompletarFornecedorScroll: state.autoCompletar.autoCompletarFornecedorScroll,
  autoCompletarFornecedorCursor: state.autoCompletar.autoCompletarFornecedorCursor,

  autoCompletarId_Contratante: state.autoCompletar.autoCompletarId_Contratante,
  autoCompletarContratante: state.autoCompletar.autoCompletarContratante,
  autoCompletarContratanteEnter: state.autoCompletar.autoCompletarContratanteEnter,
  autoCompletarContratanteScroll: state.autoCompletar.autoCompletarContratanteScroll,
  autoCompletarContratanteCursor: state.autoCompletar.autoCompletarContratanteCursor,

  autoCompletarId_Credor: state.autoCompletar.autoCompletarId_Credor,
  autoCompletarCredor: state.autoCompletar.autoCompletarCredor,
  autoCompletarCredorEnter: state.autoCompletar.autoCompletarCredorEnter,
  autoCompletarCredorScroll: state.autoCompletar.autoCompletarCredorScroll,
  autoCompletarCredorCursor: state.autoCompletar.autoCompletarCredorCursor,

  autoCompletarId_Representante: state.autoCompletar.autoCompletarId_Representante,
  autoCompletarRepresentante: state.autoCompletar.autoCompletarRepresentante,
  autoCompletarRepresentanteEnter: state.autoCompletar.autoCompletarRepresentanteEnter,
  autoCompletarRepresentanteScroll: state.autoCompletar.autoCompletarRepresentanteScroll,
  autoCompletarRepresentanteCursor: state.autoCompletar.autoCompletarRepresentanteCursor,

  autoCompletarId_Pais: state.autoCompletar.autoCompletarId_Pais,
  autoCompletarPais: state.autoCompletar.autoCompletarPais,
  autoCompletarPaisEnter: state.autoCompletar.autoCompletarPaisEnter,
  autoCompletarPaisScroll: state.autoCompletar.autoCompletarPaisScroll,
  autoCompletarPaisCursor: state.autoCompletar.autoCompletarPaisCursor,

  autoCompletarId_PaisEmissao: state.autoCompletar.autoCompletarId_PaisEmissao,
  autoCompletarPaisEmissao: state.autoCompletar.autoCompletarPaisEmissao,
  autoCompletarPaisEmissaoEnter: state.autoCompletar.autoCompletarPaisEmissaoEnter,
  autoCompletarPaisEmissaoScroll: state.autoCompletar.autoCompletarPaisEmissaoScroll,
  autoCompletarPaisEmissaoCursor: state.autoCompletar.autoCompletarPaisEmissaoCursor,

  autoCompletarId_Grupo: state.autoCompletar.autoCompletarId_Grupo,
  autoCompletarGrupo: state.autoCompletar.autoCompletarGrupo,
  autoCompletarGrupoEnter: state.autoCompletar.autoCompletarGrupoEnter,
  autoCompletarGrupoScroll: state.autoCompletar.autoCompletarGrupoScroll,
  autoCompletarGrupoCursor: state.autoCompletar.autoCompletarGrupoCursor,

  autoCompletarId_Municipio: state.autoCompletar.autoCompletarId_Municipio,
  autoCompletarMunicipio: state.autoCompletar.autoCompletarMunicipio,
  autoCompletarMunicipioEnter: state.autoCompletar.autoCompletarMunicipioEnter,
  autoCompletarMunicipioScroll: state.autoCompletar.autoCompletarMunicipioScroll,
  autoCompletarMunicipioCursor: state.autoCompletar.autoCompletarMunicipioCursor,

  autoCompletarId_RES_Municipio: state.autoCompletar.autoCompletarId_RES_Municipio,
  autoCompletarRES_Municipio: state.autoCompletar.autoCompletarRES_Municipio,
  autoCompletarRES_MunicipioEnter: state.autoCompletar.autoCompletarRES_MunicipioEnter,
  autoCompletarRES_MunicipioScroll: state.autoCompletar.autoCompletarRES_MunicipioScroll,
  autoCompletarRES_MunicipioCursor: state.autoCompletar.autoCompletarRES_MunicipioCursor,

  autoCompletarId_COM_Municipio: state.autoCompletar.autoCompletarId_COM_Municipio,
  autoCompletarCOM_Municipio: state.autoCompletar.autoCompletarCOM_Municipio,
  autoCompletarCOM_MunicipioEnter: state.autoCompletar.autoCompletarCOM_MunicipioEnter,
  autoCompletarCOM_MunicipioScroll: state.autoCompletar.autoCompletarCOM_MunicipioScroll,
  autoCompletarCOM_MunicipioCursor: state.autoCompletar.autoCompletarCOM_MunicipioCursor,

  autoCompletarId_Acompanhante: state.autoCompletar.Id_Acompanhante,
  autoCompletarAcompanhante: state.autoCompletar.autoCompletarAcompanhante,
  autoCompletarAcompanhanteEnter: state.autoCompletar.autoCompletarAcompanhanteEnter,
  autoCompletarAcompanhanteScroll: state.autoCompletar.autoCompletarAcompanhanteScroll,
  autoCompletarAcompanhanteCursor: state.autoCompletar.autoCompletarAcompanhanteCursor,

  autoCompletarId_Moeda: state.autoCompletar.autoCompletarId_Moeda,
  autoCompletarMoeda: state.autoCompletar.autoCompletarMoeda,
  autoCompletarMoedaEnter: state.autoCompletar.autoCompletarMoedaEnter,
  autoCompletarMoedaScroll: state.autoCompletar.autoCompletarMoedaScroll,
  autoCompletarMoedaCursor: state.autoCompletar.autoCompletarMoedaCursor,

  autoCompletarId_SubGrupo: state.autoCompletar.autoCompletarId_SubGrupo,
  autoCompletarSubGrupo: state.autoCompletar.autoCompletarSubGrupo,
  autoCompletarSubGrupoEnter: state.autoCompletar.autoCompletarSubGrupoEnter,
  autoCompletarSubGrupoScroll: state.autoCompletar.autoCompletarSubGrupoScroll,
  autoCompletarSubGrupoCursor: state.autoCompletar.autoCompletarSubGrupoCursor,

  autoCompletarId_Profissao: state.autoCompletar.autoCompletarId_Profissao,
  autoCompletarProfissao: state.autoCompletar.autoCompletarProfissao,
  autoCompletarProfissaoEnter: state.autoCompletar.autoCompletarProfissaoEnter,
  autoCompletarProfissaoScroll: state.autoCompletar.autoCompletarProfissaoScroll,
  autoCompletarProfissaoCursor: state.autoCompletar.autoCompletarProfissaoCursor,

  autoCompletarId_Pfisica: state.autoCompletar.autoCompletarId_Pfisica,
  autoCompletarPfisica: state.autoCompletar.autoCompletarPfisica,
  autoCompletarPfisicaEnter: state.autoCompletar.autoCompletarPfisicaEnter,
  autoCompletarPfisicaScroll: state.autoCompletar.autoCompletarPfisicaScroll,
  autoCompletarPfisicaCursor: state.autoCompletar.autoCompletarPfisicaCursor,

  autoCompletarId_Pjuridica: state.autoCompletar.autoCompletarId_Pjuridica,
  autoCompletarPjuridica: state.autoCompletar.autoCompletarPjuridica,
  autoCompletarPjuridicaEnter: state.autoCompletar.autoCompletarPjuridicaEnter,
  autoCompletarPjuridicaScroll: state.autoCompletar.autoCompletarPjuridicaScroll,
  autoCompletarPjuridicaCursor: state.autoCompletar.autoCompletarPjuridicaCursor,

  //////////// CONSOLIDADOR > PARAMETROS DO SISTEMA ///////////////////////////////

  autoCompletarRfa_Id_Pfisica: state.autoCompletar.autoCompletarRfa_Id_Pfisica,
  autoCompletarRfa_Pfisica: state.autoCompletar.autoCompletarRfa_Pfisica,
  autoCompletarRfa_PfisicaEnter: state.autoCompletar.autoCompletarRfa_PfisicaEnter,
  autoCompletarRfa_PfisicaScroll: state.autoCompletar.autoCompletarRfa_PfisicaScroll,
  autoCompletarRfa_PfisicaCursor: state.autoCompletar.autoCompletarRfa_PfisicaCursor,

  autoCompletarRfa_Id_Pjuridica: state.autoCompletar.autoCompletarRfa_Id_Pjuridica,
  autoCompletarRfa_Pjuridica: state.autoCompletar.autoCompletarRfa_Pjuridica,
  autoCompletarRfa_PjuridicaEnter: state.autoCompletar.autoCompletarRfa_PjuridicaEnter,
  autoCompletarRfa_PjuridicaScroll: state.autoCompletar.autoCompletarRfa_PjuridicaScroll,
  autoCompletarRfa_PjuridicaCursor: state.autoCompletar.autoCompletarRfa_PjuridicaCursor,

  autoCompletarWoo_Id_Pfisica: state.autoCompletar.autoCompletarWoo_Id_Pfisica,
  autoCompletarWoo_Pfisica: state.autoCompletar.autoCompletarWoo_Pfisica,
  autoCompletarWoo_PfisicaEnter: state.autoCompletar.autoCompletarWoo_PfisicaEnter,
  autoCompletarWoo_PfisicaScroll: state.autoCompletar.autoCompletarWoo_PfisicaScroll,
  autoCompletarWoo_PfisicaCursor: state.autoCompletar.autoCompletarWoo_PfisicaCursor,

  autoCompletarWoo_Id_Pjuridica: state.autoCompletar.autoCompletarWoo_Id_Pjuridica,
  autoCompletarWoo_Pjuridica: state.autoCompletar.autoCompletarWoo_Pjuridica,
  autoCompletarWoo_PjuridicaEnter: state.autoCompletar.autoCompletarWoo_PjuridicaEnter,
  autoCompletarWoo_PjuridicaScroll: state.autoCompletar.autoCompletarWoo_PjuridicaScroll,
  autoCompletarWoo_PjuridicaCursor: state.autoCompletar.autoCompletarWoo_PjuridicaCursor,

  autoCompletarId_Projeto: state.autoCompletar.autoCompletarId_Projeto,
  autoCompletarProjeto: state.autoCompletar.autoCompletarProjeto,
  autoCompletarProjetoEnter: state.autoCompletar.autoCompletarProjetoEnter,
  autoCompletarProjetoScroll: state.autoCompletar.autoCompletarProjetoScroll,
  autoCompletarProjetoCursor: state.autoCompletar.autoCompletarProjetoCursor,

  autoCompletarId_Usuario: state.autoCompletar.autoCompletarId_Usuario,
  autoCompletarUsuario: state.autoCompletar.autoCompletarUsuario,
  autoCompletarUsuarioEnter: state.autoCompletar.autoCompletarUsuarioEnter,
  autoCompletarUsuarioScroll: state.autoCompletar.autoCompletarUsuarioScroll,
  autoCompletarUsuarioCursor: state.autoCompletar.autoCompletarUsuarioCursor,

  autoCompletarId_UsuarioOrigem: state.autoCompletar.autoCompletarId_UsuarioOrigem,
  autoCompletarUsuarioOrigem: state.autoCompletar.autoCompletarUsuarioOrigem,
  autoCompletarUsuarioOrigemEnter: state.autoCompletar.autoCompletarUsuarioOrigemEnter,
  autoCompletarUsuarioOrigemScroll: state.autoCompletar.autoCompletarUsuarioOrigemScroll,
  autoCompletarUsuarioOrigemCursor: state.autoCompletar.autoCompletarUsuarioOrigemCursor,

  autoCompletarId_UsuarioDestino: state.autoCompletar.autoCompletarId_UsuarioDestino,
  autoCompletarUsuarioDestino: state.autoCompletar.autoCompletarUsuarioDestino,
  autoCompletarUsuarioDestinoEnter: state.autoCompletar.autoCompletarUsuarioDestinoEnter,
  autoCompletarUsuarioDestinoScroll: state.autoCompletar.autoCompletarUsuarioDestinoScroll,
  autoCompletarUsuarioDestinoCursor: state.autoCompletar.autoCompletarUsuarioDestinoCursor,

  autoCompletarId_CartaoCorp: state.autoCompletar.autoCompletarId_CartaoCorp,
  autoCompletarCartaoCorp: state.autoCompletar.autoCompletarCartaoCorp,
  autoCompletarCartaoCorpEnter: state.autoCompletar.autoCompletarCartaoCorpEnter,
  autoCompletarCartaoCorpScroll: state.autoCompletar.autoCompletarCartaoCorpScroll,
  autoCompletarCartaoCorpCursor: state.autoCompletar.autoCompletarCartaoCorpCursor,

  autoCompletarId_Titular: state.autoCompletar.autoCompletarId_Titular,
  autoCompletarTitular: state.autoCompletar.autoCompletarTitular,
  autoCompletarTitularEnter: state.autoCompletar.autoCompletarTitularEnter,
  autoCompletarTitularScroll: state.autoCompletar.autoCompletarTitularScroll,
  autoCompletarTitularCursor: state.autoCompletar.autoCompletarTitularCursor,

  autoCompletarId_TipoCartao: state.autoCompletar.autoCompletarId_TipoCartao,
  autoCompletarTipoCartao: state.autoCompletar.autoCompletarTipoCartao,
  autoCompletarTipoCartaoEnter: state.autoCompletar.autoCompletarTipoCartaoEnter,
  autoCompletarTipoCartaoScroll: state.autoCompletar.autoCompletarTipoCartaoScroll,
  autoCompletarTipoCartaoCursor: state.autoCompletar.autoCompletarTipoCartaoCursor,

  autoCompletarId_Ramoatividade: state.autoCompletar.autoCompletarId_Ramoatividade,
  autoCompletarRamoatividade: state.autoCompletar.autoCompletarRamoatividade,
  autoCompletarRamoatividadeEnter: state.autoCompletar.autoCompletarRamoatividadeEnter,
  autoCompletarRamoatividadeScroll: state.autoCompletar.autoCompletarRamoatividadeScroll,
  autoCompletarRamoatividadeCursor: state.autoCompletar.autoCompletarRamoatividadeCursor,

  autoCompletarId_Aeroporto: state.autoCompletar.autoCompletarId_Aeroporto,
  autoCompletarAeroporto: state.autoCompletar.autoCompletarAeroporto,
  autoCompletarAeroportoEnter: state.autoCompletar.autoCompletarAeroportoEnter,
  autoCompletarAeroportoScroll: state.autoCompletar.autoCompletarAeroportoScroll,
  autoCompletarAeroportoCursor: state.autoCompletar.autoCompletarAeroportoCursor,

  autoCompletarId_Aeroporto_Origem: state.autoCompletar.autoCompletarId_Aeroporto_Origem,
  autoCompletarAeroporto_Origem: state.autoCompletar.autoCompletarAeroporto_Origem,
  autoCompletarAeroporto_OrigemEnter: state.autoCompletar.autoCompletarAeroporto_OrigemEnter,
  autoCompletarAeroporto_OrigemScroll: state.autoCompletar.autoCompletarAeroporto_OrigemScroll,
  autoCompletarAeroporto_OrigemCursor: state.autoCompletar.autoCompletarAeroporto_OrigemCursor,

  autoCompletarId_Aeroporto_Destino: state.autoCompletar.autoCompletarId_Aeroporto_Destino,
  autoCompletarAeroporto_Destino: state.autoCompletar.autoCompletarAeroporto_Destino,
  autoCompletarAeroporto_DestinoEnter: state.autoCompletar.autoCompletarAeroporto_DestinoEnter,
  autoCompletarAeroporto_DestinoScroll: state.autoCompletar.autoCompletarAeroporto_DestinoScroll,
  autoCompletarAeroporto_DestinoCursor: state.autoCompletar.autoCompletarAeroporto_DestinoCursor,

  ////// PROSERVICO //////

  autoCompletarStep06_Id_Pfisica: state.autoCompletar.autoCompletarStep06_Id_Pfisica,
  autoCompletarStep06_Pfisica: state.autoCompletar.autoCompletarStep06_Pfisica,
  autoCompletarStep06_PfisicaEnter: state.autoCompletar.autoCompletarStep06_PfisicaEnter,
  autoCompletarStep06_PfisicaCursor: state.autoCompletar.autoCompletarStep06_PfisicaCursor,
  autoCompletarStep06_PfisicaScroll: state.autoCompletar.autoCompletarStep06_PfisicaScroll,

  autoCompletarStep06_Id_Pjuridica: state.autoCompletar.autoCompletarStep06_Id_Pjuridica,
  autoCompletarStep06_Pjuridica: state.autoCompletar.autoCompletarStep06_Pjuridica,
  autoCompletarStep06_PjuridicaEnter: state.autoCompletar.autoCompletarStep06_PjuridicaEnter,
  autoCompletarStep06_PjuridicaCursor: state.autoCompletar.autoCompletarStep06_PjuridicaCursor,
  autoCompletarStep06_PjuridicaScroll: state.autoCompletar.autoCompletarStep06_PjuridicaScroll,

  autoCompletarNomeReservaPFisica: state.autoCompletar.autoCompletarNomeReservaPFisica,
  autoCompletarNomeReservaAcompanhante: state.autoCompletar.autoCompletarNomeReservaAcompanhante,
});
export default connect(() => (mapState))(AutoCompletarV2);
