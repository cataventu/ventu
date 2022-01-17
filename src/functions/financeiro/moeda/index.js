import api from '../../../services/api';
import { showMSG } from '../../../components';
import * as sistema from '../../sistema';

///////// PAGINA ////////////////
/////////////////////////////////
export const editMoeda = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/moeda/ficha/${id}`;
  props.history.push(page);
};

export const consultaMoeda = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/moeda/consulta/${id}`;
  props.history.push(page);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveMoedaFiltro = async (props, formDados) => {
  ////// CONSTANTES
  const { dispatch } = props;
  const {
    descricao, situacao, alt_dhsis_maior, alt_dhsis_menor,
  } = formDados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('TABELAS_MOEDA_FILTRO', JSON.stringify(formDados));

  ////// ATIVA FILTRO //////
  if (descricao !== '' || situacao !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '') {
    dispatch({ type: '@SET_MOEDA_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_MOEDA_FILTRO_INATIVO' });
  }
  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_MOEDA_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  sistema.toggleFiltro(props, 'tabela-moeda-filtro');
};

export const setFieldsMoedaFiltro = (data) => {
  document.getElementById('moeda-filtro-descricao').value = data.descricao;
  document.getElementById('moeda-filtro-situacao').value = data.situacao;
  document.getElementById('moeda-filtro-data-maior').value = data.alt_dhsis_maior.replace(/[/]/g, '-');
  document.getElementById('moeda-filtro-data-menor').value = data.alt_dhsis_menor.replace(/[/]/g, '-');
};

export const resetFieldsMoedaFiltro = async (props) => {
  document.getElementById('moeda-filtro-descricao').value = '';
  document.getElementById('moeda-filtro-situacao').value = '';
  document.getElementById('moeda-filtro-data-maior').value = '';
  document.getElementById('moeda-filtro-data-menor').value = '';

  const { dispatch } = props;
  dispatch({ type: '@RESET_MOEDA_FILTRO' });

  await saveMoedaFiltro(props, false);
};

///////// COOKIE ////////////////
/////////////////////////////////
//export const recebeCookie = async (nome, props) => {
//const cookie = sistema.getCookie(nome);
//const { dispatch } = props;

//if (cookie) {
//////// ATUALIZA CAMPOS //////
//var obj = JSON.parse(cookie);
//setFieldsMoedaFiltro(obj);

//////// ATUALIZA FILTRO //////
//await dispatch({ type: '@NEW_MOEDA_FILTRO', payload: JSON.parse(cookie) });

//////// ATIVA FILTRO //////
//if( obj.descricao !== "" || obj.situacao !== "" || obj.alt_dhsis_maior !== "" || obj.alt_dhsis_menor !== "" ) {
//dispatch({ type: '@SET_MOEDA_FILTRO_ATIVO', payload: cookie });
//} else {
//dispatch({ type: '@SET_MOEDA_FILTRO_INATIVO', payload: cookie });
//}
//}
//}
///////// PESQUISA //////////////
/////////////////////////////////
export const pesquisaMoeda = async (props) => {
  const pesquisa = document.getElementById('moeda-pesquisa').value;
  const newPesquisa = {
    chave: pesquisa, descricao: '', situacao: '', alt_dhsis_maior: '', alt_dhsis_menor: '',
  };

  const { dispatch } = props;
  await dispatch({ type: '@NEW_MOEDA_FILTRO', payload: newPesquisa });
  dispatch({ type: '@SET_MOEDA_FILTRO_FLAG_TRUE' });
};

///////// FICHA /////////////////
/////////////////////////////////
export const getMoedaFicha = async (props, id) => {
  if (id) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmMOEDA/FICHA/${id}`;
    const moedaFicha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_MOEDA_FICHA', payload: moedaFicha.data });
  }
};

export const saveMoeda = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmMOEDA/GRAVA';
      response = await api.put(url, dadosForm,
        { auth: props.auth });
    ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmMOEDA/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Moeda', 'Cadastro realizado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      const page = '/financeiro/moeda';
      props.history.push(page);
    }
  }
};

export const resetFieldsMoedaFicha = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_MOEDA_FICHA' });
};

///////// EXCEL /////////////////
/////////////////////////////////
export const getMoedaExcel = async (props) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  ////// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_MOEDA_FILTRO');
  const url = '/TsmMOEDA/EXCEL';

  const response = await api.post(url, data, { auth: props.auth });

  ////// Download do documento //////
  sistema.getDocument(response);
};

///////// CONSULTA //////////////
/////////////////////////////////
export const getConsultaMoeda = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmMOEDA/FICHA/${id}`;
    const Dados = await api.get(url, { auth: props.auth });

    const Ficha = Dados.data;

    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@SET_MOEDA_CONSULTA', payload: Ficha });
  }
};
