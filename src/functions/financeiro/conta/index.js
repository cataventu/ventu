import api from '../../../services/api';
import { showMSG } from '../../../components';
import * as sistema from '../../sistema';

///////// PAGINA ////////////////
/////////////////////////////////

export const editConta = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/conta/ficha/${id}`;
  props.history.push(page);
};

export const consultaConta = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/conta/consulta/${id}`;
  props.history.push(page);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveContaFiltro = async (props, formDados) => {
  ////// CONSTANTES
  const { dispatch } = props;
  const {
    descricao, moeda, situacao, alt_dhsis_maior, alt_dhsis_menor,
  } = formDados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('TABELAS_CONTA_FILTRO', JSON.stringify(formDados));

  ////// ATIVA FILTRO //////
  if (descricao !== '' || moeda !== '' || situacao !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '') {
    dispatch({ type: '@SET_CONTA_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_CONTA_FILTRO_INATIVO' });
  }
  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_CONTA_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  sistema.toggleFiltro(props, 'tabela-conta-filtro');
};

export const setFieldsContaFiltro = (data) => {
  document.getElementById('conta-filtro-descricao').value = data.descricao;
  document.getElementById('conta-filtro-moeda').value = data.moeda;
  document.getElementById('conta-filtro-situacao').value = data.situacao;
  document.getElementById('conta-filtro-data-maior').value = data.alt_dhsis_maior.replace(/[/]/g, '-');
  document.getElementById('conta-filtro-data-menor').value = data.alt_dhsis_menor.replace(/[/]/g, '-');
};

export const resetFieldsContaFiltro = async (props) => {
  document.getElementById('conta-filtro-descricao').value = '';
  document.getElementById('conta-filtro-moeda').value = '';
  document.getElementById('conta-filtro-situacao').value = '';
  document.getElementById('conta-filtro-data-maior').value = '';
  document.getElementById('conta-filtro-data-menor').value = '';

  const { dispatch } = props;
  dispatch({ type: '@RESET_CONTA_FILTRO' });

  await saveContaFiltro(props, false);
};

///////// COOKIE ////////////////
/////////////////////////////////
//export const recebeCookie = async (nome, props) => {
//const cookie = sistema.getCookie(nome);
//const { dispatch } = props;

//if (cookie) {
//////// ATUALIZA CAMPOS //////
//var obj = JSON.parse(cookie);
//setFieldsContaFiltro(obj);

//////// ATUALIZA FILTRO //////
//await dispatch({ type: '@NEW_CONTA_FILTRO', payload: JSON.parse(cookie) });

//////// ATIVA FILTRO //////
//if( obj.descricao !== "" || obj.moeda !== "" || obj.banco_nome !== "" || obj.situacao !== "" || obj.alt_dhsis_maior !== "" || obj.alt_dhsis_menor !== "" ) {
//dispatch({ type: '@SET_CONTA_FILTRO_ATIVO', payload: cookie });
//} else {
//dispatch({ type: '@SET_CONTA_FILTRO_INATIVO', payload: cookie });
//}
//}
//}

///////// PESQUISA //////////////
/////////////////////////////////
export const pesquisaConta = async (props) => {
  const pesquisa = document.getElementById('conta-pesquisa').value;
  const newPesquisa = {
    chave: pesquisa, descricao: '', moeda: '', padrao: '', situacao: '', alt_dhsis_maior: '', alt_dhsis_menor: '',
  };

  const { dispatch } = props;
  await dispatch({ type: '@NEW_CONTA_FILTRO', payload: newPesquisa });
  dispatch({ type: '@SET_CONTA_FILTRO_FLAG_TRUE' });
};

///////// FICHA /////////////////
/////////////////////////////////
export const getContaFicha = async (props, id) => {
  if (id) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmCONTA/FICHA/${id}`;
    const contaFicha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_CONTA_FICHA', payload: contaFicha.data });
  }
};

export const saveConta = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmCONTA/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
    ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmCONTA/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Conta', 'Cadastro realizado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      const page = '/financeiro/conta';
      props.history.push(page);
    }
  }
};
export const resetFieldsContaFicha = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_CONTA_FICHA' });
};

///////// EXCEL /////////////////
/////////////////////////////////
export const getContaExcel = async (props) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  ////// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_CONTA_FILTRO');
  const url = '/TsmCONTA/EXCEL';

  const response = await api.post(url, data, { auth: props.auth });

  ////// Download do documento //////
  sistema.getDocument(response);
};
///////// CONSULTA //////////////
/////////////////////////////////
export const getConsultaConta = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmCONTA/FICHA/${id}`;
    const Dados = await api.get(url, { auth: props.auth });

    const Ficha = Dados.data;

    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@SET_CONTA_CONSULTA', payload: Ficha });
  }
};
