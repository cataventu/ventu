import api from '../../../services/api';
import { showMSG } from '../../../components';

import editCategoria from './editCategoria';
import saveCategoria from './saveCategoria';

export {
  editCategoria,
  saveCategoria,
};

///////// FICHA FIXO ////////

export const getParametrosFixoFicha = async (props) => {
  ////// RECEBE DADOS API ////////
  const url = '/TsmPARAMETRO/FIXO_FICHA/';
  const Ficha = await api.get(url,
    { auth: props.auth });

  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@GET_PARAMETRO_FIXO_FICHA', payload: Ficha.data });
};

export const saveParametrosFixo = async (props, dadosForm) => {
  let response = '';

  ////// EDITAR //////

  ////// Envia requisição API //////
  const url = '/TsmPARAMETRO/FIXO_GRAVA';
  response = await api.put(url, dadosForm, { auth: props.auth });

  if (response.data.retorno === 0) {
    ////// Notificação falha //////
    showMSG('Error', response.data.msgerro, 'error', 2500);
  } else {
  ////// Notificação Sucesso //////
    showMSG('Parâmetro: Fixo', 'Cadastro realizado com sucesso!', 'success', 2500);
    ////// REDIRECT //////
    //const page = "/sistema/parametros/ficha/movimento";
    //props.history.push(page);
    //}
  }
};

///////// FICHA MOVIMENTO ////////////

export const getParametrosMovimentoFicha = async (props) => {
  ////// RECEBE DADOS API ////////
  const url = '/TsmPARAMETRO/MOVIMENTO_FICHA/';
  const Ficha = await api.get(url, { auth: props.auth });

  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@GET_PARAMETRO_MOVIMENTO_FICHA', payload: Ficha.data });
};

export const saveParametrosMovimento = async (props, dadosForm) => {
  let response = '';

  ////// EDITAR //////

  ////// Envia requisição API //////
  const url = '/TsmPARAMETRO/MOVIMENTO_GRAVA/';
  response = await api.put(url, dadosForm, { auth: props.auth });

  if (response.data.retorno === 0) {
    ////// Notificação falha //////
    showMSG('Error', response.data.msgerro, 'error', 2500);
  } else {
    ////// Notificação Sucesso //////
    showMSG('Parâmetro: Movimento', 'Cadastro realizado com sucesso!', 'success', 2500);
  }
};

///////// FICHA CONSOLIDADOR ////////////

export const getParametrosConsolidadorFicha = async (props) => {
  ////// RECEBE DADOS API ////////
  const url = '/TsmPARAMETRO/CONSOLIDADOR_FICHA/';
  const Ficha = await api.get(url, { auth: props.auth });

  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@GET_PARAMETRO_CONSOLIDADOR_FICHA', payload: Ficha.data });
};

export const saveParametrosConsolidador = async (props, dadosForm) => {
  ////// Envia requisição API //////
  const url = '/TsmPARAMETRO/CONSOLIDADOR_GRAVA/';
  const response = await api.put(url, dadosForm, { auth: props.auth });
  if (response.data.retorno === 0) {
  ////// Notificação falha //////
    showMSG('Error', response.data.msgerro, 'error', 2500);
  } else {
    ////// Notificação Sucesso //////
    showMSG('Parâmetro: Consolidador', 'Cadastro realizado com sucesso!', 'success', 2500);
  }
};

///////// PAGINA GRUPO ///////////
///////////////////////////////////

export const getParametroGrupoPagina = async (props) => {
  ////// RECEBE DADOS API ////////
  const url = '/TsmPARAMETRO/RPARGRP_PAGINA/';

  const Pagina = await api.get(url,
    { auth: props.auth });

  //// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@RESET_PARAMETRO_GRUPO_FICHA', payload: Pagina.data });
  dispatch({ type: '@GET_PARAMETRO_GRUPO_PAGINA', payload: Pagina.data });
};

export const editGrupo = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/sistema/parametros/grupo/ficha/${id}`;
  props.history.push(page);
};

export const consultaGrupo = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/sistema/parametros/grupo/consulta/${id}`;
  props.history.push(page);
};

///////// FICHA GRUPO ////////////

export const getParametrosGrupoFicha = async (props, id) => {
  ////// RECEBE DADOS API ////////
  const url = `/TsmPARAMETRO/RPARGRP_FICHA/${id}`;
  const Ficha = await api.get(url, { auth: props.auth });

  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@GET_PARAMETRO_GRUPO_FICHA', payload: Ficha.data });
};

export const saveParametrosGrupo = async (props, dadosForm) => {
  let response = '';

  ////// EDITAR //////

  ////// Envia requisição API //////
  const url = '/TsmPARAMETRO/RPARGRP_GRAVA/';
  response = await api.put(url, dadosForm,
    { auth: props.auth });

  if (response.data.retorno === 0) {
    ////// Notificação falha //////
    showMSG('Error', response.data.msgerro, 'error', 2500);
  } else {
  ////// Notificação Sucesso //////
    showMSG('Parâmetro: Grupo', 'Cadastro realizado com sucesso!', 'success', 2500);
    ////// REDIRECT //////
    const page = '/sistema/parametros/grupo';
    props.history.push(page);
  }
};

///////// CONSULTA //////////////
/////////////////////////////////
export const getConsultaGrupo = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmPARAMETRO/RPARGRP_FICHA/${id}`;
    const Dados = await api.get(url,
      { auth: props.auth });

    const Ficha = Dados.data;

    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@SET_PARAMETRO_GRUPO_CONSULTA', payload: Ficha });
  }
};
