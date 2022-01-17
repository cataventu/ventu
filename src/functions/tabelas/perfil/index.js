import api from '../../../services/api';
import { showMSG } from '../../../components';
import * as sistema from '../../sistema';

///////// PAGINA ////////////////
/////////////////////////////////
export const editPerfil = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/tabelas/perfil/ficha/${id}`;
  props.history.push(page);
};

export const consultaPerfil = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/tabelas/perfil/consulta/${id}`;
  props.history.push(page);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const savePerfilFiltro = async (props, formDados) => {
  ////// CONSTANTES
  const { dispatch } = props;
  const {
    tipo, descricao, situacao, alt_dhsis_maior, alt_dhsis_menor,
  } = formDados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('TABELAS_PERFIL_FILTRO', JSON.stringify(formDados));

  ////// ATIVA FILTRO //////
  if (tipo !== '' || descricao !== '' || situacao !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '') {
    dispatch({ type: '@SET_PERFIL_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_PERFIL_FILTRO_INATIVO' });
  }

  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_PERFIL_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  sistema.toggleFiltro(props, 'tabela-perfil-filtro');
};

export const setFieldsPerfilFiltro = (data) => {
  document.getElementById('perfil-filtro-tipo').getElementsByTagName('option')[0].selected = 'selected';
  document.getElementById('perfil-filtro-descricao').value = data.descricao;
  document.getElementById('perfil-filtro-situacao').value = data.situacao;
  document.getElementById('perfil-filtro-data-maior').value = data.alt_dhsis_maior.replace(/[/]/g, '-');
  document.getElementById('perfil-filtro-data-menor').value = data.alt_dhsis_menor.replace(/[/]/g, '-');
};

export const resetFieldsPerfilFiltro = async (props) => {
  document.getElementById('perfil-filtro-tipo').value = '';
  document.getElementById('perfil-filtro-descricao').value = '';
  document.getElementById('perfil-filtro-situacao').value = '';
  document.getElementById('perfil-filtro-data-maior').value = '';
  document.getElementById('perfil-filtro-data-menor').value = '';

  const { dispatch } = props;
  dispatch({ type: '@RESET_PERFIL_FILTRO' });

  await savePerfilFiltro(props, false);
};
///////// COOKIE ////////////////
/////////////////////////////////
//export const recebeCookie = async (nome, props) => {
//const cookie = sistema.getCookie(nome);
//const { dispatch } = props;

//if (cookie) {
//////// ATUALIZA CAMPOS //////
//var obj = JSON.parse(cookie);
//setFieldsPerfilFiltro(obj);

//////// ATUALIZA FILTRO //////
//await dispatch({ type: '@NEW_PERFIL_FILTRO', payload: JSON.parse(cookie) });

//////// ATIVA FILTRO //////
//if( obj.tipo !== "" || obj.descricao !== "" || obj.situacao !== "" || obj.alt_dhsis_maior !== "" || obj.alt_dhsis_menor !== "" ) {
//dispatch({ type: '@SET_PERFIL_FILTRO_ATIVO', payload: cookie });
//} else {
//dispatch({ type: '@SET_PERFIL_FILTRO_INATIVO', payload: cookie });
//}
//}

//}

///////// PESQUISA //////////////
/////////////////////////////////
export const pesquisaPerfil = async (props) => {
  const pesquisa = document.getElementById('perfil-pesquisa').value;
  const newPesquisa = {
    chave: pesquisa, tipo: '', descricao: '', situacao: '', alt_dhsis_maior: '', alt_dhsis_menor: '',
  };

  const { dispatch } = props;
  await dispatch({ type: '@NEW_PERFIL_FILTRO', payload: newPesquisa });
  dispatch({ type: '@SET_PERFIL_FILTRO_FLAG_TRUE' });
};

///////// FICHA /////////////////
/////////////////////////////////
export const getPerfilFicha = async (props, id) => {
  if (id) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmPERFIL/FICHA/${id}`;
    const perfilFicha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_PERFIL_FICHA', payload: perfilFicha.data });
  }
};

export const savePerfil = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmPERFIL/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
    ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmPERFIL/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Perfil', 'Cadastro realizado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      const page = '/tabelas/perfil';
      props.history.push(page);
    }
  }
};
export const resetPerfilFicha = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_PERFIL_FICHA' });
};

///////// EXCEL /////////////////
/////////////////////////////////
export const getPerfilExcel = async (props) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  ////// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_PERFIL_FILTRO');
  const url = '/TsmPERFIL/EXCEL';

  const response = await api.post(url, data, { auth: props.auth });
  ////// Download do documento //////
  sistema.getDocument(response);
};
///////// CONSULTA //////////////
/////////////////////////////////
export const getConsultaPerfil = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmPERFIL/FICHA/${id}`;
    const Dados = await api.get(url, { auth: props.auth });
    const Ficha = Dados.data;

    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@SET_CONSULTA_PERFIL', payload: Ficha });
  }
};
