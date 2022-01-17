import api from '../../../services/api';
import { showMSG } from '../../../components';
import * as sistema from '../../sistema';

///////// PAGINA ////////////////
/////////////////////////////////
export const editProfissao = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/tabelas/profissao/ficha/${id}`;
  props.history.push(page);
};
export const consultaProfissao = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/tabelas/profissao/consulta/${id}`;
  props.history.push(page);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveProfissaoFiltro = async (props, formDados) => {
  ////// CONSTANTES
  const { dispatch } = props;
  const {
    descricao, situacao, alt_dhsis_maior, alt_dhsis_menor,
  } = formDados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('TABELAS_PROFISSAO_FILTRO', JSON.stringify(formDados));

  ////// ATIVA FILTRO //////
  if (descricao !== '' || situacao !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '') {
    dispatch({ type: '@SET_PROFISSAO_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_PROFISSAO_FILTRO_INATIVO' });
  }

  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_PROFISSAO_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  sistema.toggleFiltro(props, 'tabela-profissao-filtro');
};
export const setFieldsProfissaoFiltro = (data) => {
  document.getElementById('profissao-filtro-descricao').value = data.descricao;
  document.getElementById('profissao-filtro-situacao').value = data.situacao;
  document.getElementById('profissao-filtro-data-maior').value = data.alt_dhsis_maior.replace(/[/]/g, '-');
  document.getElementById('profissao-filtro-data-menor').value = data.alt_dhsis_menor.replace(/[/]/g, '-');
};

export const resetFieldsProfissaoFiltro = async (props) => {
  document.getElementById('profissao-filtro-descricao').value = '';
  document.getElementById('profissao-filtro-situacao').value = '';
  document.getElementById('profissao-filtro-data-maior').value = '';
  document.getElementById('profissao-filtro-data-menor').value = '';

  const { dispatch } = props;
  dispatch({ type: '@RESET_PROFISSAO_FILTRO' });

  await saveProfissaoFiltro(props, false);
};

///////// COOKIE ////////////////
/////////////////////////////////
//export const recebeCookie = async (nome, props) => {
//const cookie = sistema.getCookie(nome);
//const { dispatch } = props;

//if (cookie) {
//////// ATUALIZA CAMPOS //////
//var obj = JSON.parse(cookie);
//setFieldsProfissaoFiltro(obj);

//////// ATUALIZA FILTRO //////
//await dispatch({ type: '@NEW_PROFISSAO_FILTRO', payload: JSON.parse(cookie) });

//////// ATIVA FILTRO //////
//if( obj.descricao !== "" ||  obj.situacao !== "" || obj.alt_dhsis_maior !== "" || obj.alt_dhsis_menor !== "" ) {
//dispatch({ type: '@SET_PROFISSAO_FILTRO_ATIVO', payload: cookie });
//} else {
//dispatch({ type: '@SET_PROFISSAO_FILTRO_INATIVO', payload: cookie });
//}
//}
//}

///////// PESQUISA //////////////
/////////////////////////////////
export const pesquisaProfissao = async (props) => {
  const pesquisa = document.getElementById('profissao-pesquisa').value;
  const newPesquisa = {
    chave: pesquisa, descricao: '', situacao: '', alt_dhsis_maior: '', alt_dhsis_menor: '',
  };

  const { dispatch } = props;
  await dispatch({ type: '@NEW_PROFISSAO_FILTRO', payload: newPesquisa });
  dispatch({ type: '@SET_PROFISSAO_FILTRO_FLAG_TRUE' });
};

///////// FICHA /////////////////
/////////////////////////////////
export const getProfissaoFicha = async (props, id) => {
  if (id) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmPROFISSAO/FICHA/${id}`;
    const profissaoFicha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_PROFISSAO_FICHA', payload: profissaoFicha.data });
  }
};

export const saveProfissao = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmPROFISSAO/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
    ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmPROFISSAO/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Profissão', 'Cadastro realizado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      const page = '/tabelas/profissao';
      props.history.push(page);
    }
  }
};

export const resetProfissaoFicha = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_PROFISSAO_FICHA' });
};

///////// EXCEL /////////////////
/////////////////////////////////
export const getProfissaoExcel = async (props) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  ////// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_PROFISSAO_FILTRO');
  const url = '/TsmPROFISSAO/EXCEL';

  const response = await api.post(url, data, { auth: props.auth });

  ////// Download do documento //////
  sistema.getDocument(response);
};

///////// CONSULTA //////////////
/////////////////////////////////
export const getConsultaProfissao = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmPROFISSAO/FICHA/${id}`;
    const Dados = await api.get(url, { auth: props.auth });
    const Ficha = Dados.data;
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@SET_PROFISSAO_CONSULTA', payload: Ficha });
  }
};
