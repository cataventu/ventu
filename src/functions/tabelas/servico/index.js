import api from '../../../services/api';
import { showMSG } from '../../../components';
import * as sistema from '../../sistema';

///////// PAGINA ////////////////
/////////////////////////////////
export const editServico = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/tabelas/servico/ficha/${id}`;
  props.history.push(page);
};

export const consultaServico = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/tabelas/servico/consulta/${id}`;
  props.history.push(page);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveServicoFiltro = async (props, formDados) => {
  ////// CONSTANTES
  const { dispatch } = props;
  const {
    tipo, descricao, situacao, alt_dhsis_maior, alt_dhsis_menor,
  } = formDados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('TABELAS_SERVICO_FILTRO', JSON.stringify(formDados));

  ////// ATIVA FILTRO //////
  if (tipo !== '' || descricao !== '' || situacao !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '') {
    dispatch({ type: '@SET_SERVICO_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_SERVICO_FILTRO_INATIVO' });
  }

  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_SERVICO_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  sistema.toggleFiltro(props, 'tabela-servico-filtro');
};

export const setFieldsServicoFiltro = (data) => {
  document.getElementById('servico-filtro-tipo').getElementsByTagName('option')[0].selected = 'selected';
  document.getElementById('servico-filtro-descricao').value = data.descricao;
  document.getElementById('servico-filtro-situacao').value = data.situacao;
  document.getElementById('servico-filtro-data-maior').value = data.alt_dhsis_maior.replace(/[/]/g, '-');
  document.getElementById('servico-filtro-data-menor').value = data.alt_dhsis_menor.replace(/[/]/g, '-');
};

export const resetFieldsServicoFiltro = async (props) => {
  document.getElementById('servico-filtro-tipo').value = '';
  document.getElementById('servico-filtro-descricao').value = '';
  document.getElementById('servico-filtro-situacao').value = '';
  document.getElementById('servico-filtro-data-maior').value = '';
  document.getElementById('servico-filtro-data-menor').value = '';

  const { dispatch } = props;
  dispatch({ type: '@RESET_SERVICO_FILTRO' });

  await saveServicoFiltro(props, false);
};

///////// COOKIE ////////////////
/////////////////////////////////
//export const recebeCookie = async (nome, props) => {
//const cookie = sistema.getCookie(nome);
//const { dispatch } = props;

//if (cookie) {
//////// ATUALIZA CAMPOS //////
//var obj = JSON.parse(cookie);
//setFieldsServicoFiltro(obj);

//////// ATUALIZA FILTRO //////
//await dispatch({ type: '@NEW_SERVICO_FILTRO', payload: JSON.parse(cookie) });

//////// ATIVA FILTRO //////
//if( obj.tipo !== "" || obj.descricao !== "" || obj.situacao !== "" || obj.alt_dhsis_maior !== "" || obj.alt_dhsis_menor !== "" ) {
//dispatch({ type: '@SET_SERVICO_FILTRO_ATIVO', payload: cookie });
//} else {
//dispatch({ type: '@SET_SERVICO_FILTRO_INATIVO', payload: cookie });
//}
//}
//}

///////// PESQUISA //////////////
/////////////////////////////////
export const pesquisaServico = async (props) => {
  const pesquisa = document.getElementById('servico-pesquisa').value;
  const newPesquisa = {
    chave: pesquisa, tipo: '', descricao: '', situacao: '', alt_dhsis_maior: '', alt_dhsis_menor: '',
  };

  const { dispatch } = props;
  await dispatch({ type: '@NEW_SERVICO_FILTRO', payload: newPesquisa });
  dispatch({ type: '@SET_SERVICO_FILTRO_FLAG_TRUE' });
};

///////// FICHA /////////////////
/////////////////////////////////
export const getServicoFicha = async (props, id) => {
  if (id) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmSERVICO/FICHA/${id}`;
    const servicoFicha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_SERVICO_FICHA', payload: servicoFicha.data });
  }
};

export const saveServico = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmSERVICO/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
    ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmSERVICO/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Servico', 'Cadastro realizado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      const page = '/tabelas/servico';
      props.history.push(page);
    }
  }
};

export const resetFieldsServicoFicha = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_SERVICO_FICHA' });
};

///////// EXCEL /////////////////
/////////////////////////////////
export const getServicoExcel = async (props) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  ////// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_SERVICO_FILTRO');
  const url = '/TsmSERVICO/EXCEL';

  const response = await api.post(url, data, { auth: props.auth });

  ////// Download do documento //////
  sistema.getDocument(response);
};
///////// CONSULTA //////////////
/////////////////////////////////
export const getConsultaServico = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmSERVICO/FICHA/${id}`;
    const Dados = await api.get(url, { auth: props.auth });

    const Ficha = Dados.data;

    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@SET_SERVICO_CONSULTA', payload: Ficha });
  }
};
