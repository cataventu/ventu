import api from '../../../services/api';
import { showMSG } from '../../../components';
import * as sistema from '../../sistema';

///////// PAGINA ////////////////
/////////////////////////////////

export const editCambio = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/cambio/ficha/${id}`;
  props.history.push(page);
};

export const consultaCambio = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/cambio/consulta/${id}`;
  props.history.push(page);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveCambioFiltro = async (props, formDados) => {
  ////// CONSTANTES
  const { dispatch } = props;
  const {
    moeda, situacao, alt_dhsis_maior, alt_dhsis_menor,
  } = formDados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('TABELAS_CAMBIO_FILTRO', JSON.stringify(formDados));

  ////// ATIVA FILTRO //////
  if (moeda !== '' || situacao !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '') {
    dispatch({ type: '@SET_CAMBIO_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_CAMBIO_FILTRO_INATIVO' });
  }
  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_CAMBIO_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  sistema.toggleFiltro(props, 'tabela-cambio-filtro');
};

export const setFieldsCambioFiltro = (data) => {
  document.getElementById('cambio-filtro-moeda').value = data.moeda;
  document.getElementById('cambio-filtro-situacao').value = data.situacao;
  document.getElementById('cambio-filtro-data-maior').value = data.alt_dhsis_maior.replace(/[/]/g, '-');
  document.getElementById('cambio-filtro-data-menor').value = data.alt_dhsis_menor.replace(/[/]/g, '-');
};

export const resetFieldsCambioFiltro = async (props) => {
  document.getElementById('cambio-filtro-moeda').value = '';
  document.getElementById('cambio-filtro-situacao').value = '';
  document.getElementById('cambio-filtro-data-maior').value = '';
  document.getElementById('cambio-filtro-data-menor').value = '';

  const { dispatch } = props;
  dispatch({ type: '@RESET_CAMBIO_FILTRO' });

  await saveCambioFiltro(props, false);
};
///////// COOKIE ////////////////
/////////////////////////////////
//export const recebeCookie = async (nome, props) => {
//const cookie = sistema.getCookie(nome);
//const { dispatch } = props;

//if (cookie) {
//////// ATUALIZA CAMPOS //////
//var obj = JSON.parse(cookie);
//setFieldsCambioFiltro(obj);

//////// ATUALIZA FILTRO //////
//await dispatch({ type: '@NEW_CAMBIO_FILTRO', payload: JSON.parse(cookie) });

//////// ATIVA FILTRO //////
//if( obj.moeda !== "" || obj.alt_dhsis_maior !== "" || obj.alt_dhsis_menor !== "" ) {
//dispatch({ type: '@SET_CAMBIO_FILTRO_ATIVO', payload: cookie });
//} else {
//dispatch({ type: '@SET_CAMBIO_FILTRO_INATIVO', payload: cookie });
//}
//}
//}
///////// PESQUISA //////////////
/////////////////////////////////
export const pesquisaCambio = async (props) => {
  const pesquisa = document.getElementById('cambio-pesquisa').value;
  const newPesquisa = {
    chave: pesquisa, moeda: '', alt_dhsis_maior: '', alt_dhsis_menor: '',
  };

  const { dispatch } = props;
  await dispatch({ type: '@NEW_CAMBIO_FILTRO', payload: newPesquisa });
  dispatch({ type: '@SET_CAMBIO_FILTRO_FLAG_TRUE' });
};

///////// FICHA /////////////////
/////////////////////////////////
export const getCambioFicha = async (props, id) => {
  if (id) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmCAMBIO/FICHA/${id}`;
    const cambioFicha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_CAMBIO_FICHA', payload: cambioFicha.data });
  }
};

export const saveCambio = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmCAMBIO/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
    ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmCAMBIO/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }
    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Câmbio', 'Cadastro realizado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      const page = '/financeiro/cambio';
      props.history.push(page);
    }
  }
};
export const resetFieldsCambioFicha = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_CAMBIO_FICHA' });
};

export const getCambioBacen = async (props, data, bacen) => {
  ////// RECEBE DADOS API ////////
  const dadosForm = {
    data,
    bacen,
  };
  let response = '';
  const url = '/TsmCAMBIO/BACEN';
  response = await api.post(url, dadosForm, { auth: props.auth });
  return response;
};

///////// EXCEL /////////////////
/////////////////////////////////
export const getCambioExcel = async (props) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  ////// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_CAMBIO_FILTRO');
  const url = '/TsmCAMBIO/EXCEL';

  const response = await api.post(url, data, { auth: props.auth });

  ////// Download do documento //////
  sistema.getDocument(response);
};

///////// CONSULTA //////////////
/////////////////////////////////
export const getConsultaCambio = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmCAMBIO/FICHA/${id}`;
    const Dados = await api.get(url, { auth: props.auth });

    const Ficha = Dados.data;

    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@SET_CAMBIO_CONSULTA', payload: Ficha });
  }
};
