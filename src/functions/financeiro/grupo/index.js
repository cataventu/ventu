import api from '../../../services/api';
import { showMSG } from '../../../components';
import * as sistema from '../../sistema';

///////// PAGINA ////////////////
/////////////////////////////////

export const editGrupo = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/grupo/ficha/${id}`;
  props.history.push(page);
};

export const consultaGrupo = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/grupo/consulta/${id}`;
  props.history.push(page);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveGrupoFiltro = async (props, formDados) => {
  ////// CONSTANTES
  const { dispatch } = props;
  const {
    tipo, descricao, situacao, alt_dhsis_maior, alt_dhsis_menor,
  } = formDados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('TABELAS_GRUPO_FILTRO', JSON.stringify(formDados));

  ////// ATIVA FILTRO //////
  if (tipo !== '' || descricao !== '' || situacao !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '') {
    dispatch({ type: '@SET_GRUPO_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_GRUPO_FILTRO_INATIVO' });
  }
  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_GRUPO_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  sistema.toggleFiltro(props, 'tabela-grupo-filtro');
};
export const setFieldsGrupoFiltro = (data) => {
  document.getElementById('grupo-filtro-tipo').value = data.tipo;
  document.getElementById('grupo-filtro-descricao').value = data.descricao;
  document.getElementById('grupo-filtro-situacao').value = data.situacao;
  document.getElementById('grupo-filtro-data-maior').value = data.alt_dhsis_maior.replace(/[/]/g, '-');
  document.getElementById('grupo-filtro-data-menor').value = data.alt_dhsis_menor.replace(/[/]/g, '-');
};

export const resetFieldsGrupoFiltro = async (props) => {
  document.getElementById('grupo-filtro-tipo').value = '';
  document.getElementById('grupo-filtro-descricao').value = '';
  document.getElementById('grupo-filtro-situacao').value = '';
  document.getElementById('grupo-filtro-data-maior').value = '';
  document.getElementById('grupo-filtro-data-menor').value = '';

  const { dispatch } = props;
  dispatch({ type: '@RESET_GRUPO_FILTRO' });

  await saveGrupoFiltro(props, false);
};

///////// COOKIE ////////////////
/////////////////////////////////
//export const recebeCookie = async (nome, props) => {
//const cookie = sistema.getCookie(nome);
//const { dispatch } = props;

//if (cookie) {
//////// ATUALIZA CAMPOS //////
//var obj = JSON.parse(cookie);
//setFieldsGrupoFiltro(obj);

//////// ATUALIZA FILTRO //////
//await dispatch({ type: '@NEW_GRUPO_FILTRO', payload: JSON.parse(cookie) });

//////// ATIVA FILTRO //////
//if( obj.descricao !== "" || obj.situacao !== "" || obj.alt_dhsis_maior !== "" || obj.alt_dhsis_menor !== "" ) {
//dispatch({ type: '@SET_GRUPO_FILTRO_ATIVO', payload: cookie });
//} else {
//dispatch({ type: '@SET_GRUPO_FILTRO_INATIVO', payload: cookie });
//}
//}
//}

///////// PESQUISA //////////////
/////////////////////////////////
export const pesquisaGrupo = async (props) => {
  const pesquisa = document.getElementById('grupo-pesquisa').value;
  const newPesquisa = {
    chave: pesquisa, tipo: '', descricao: '', situacao: '', alt_dhsis_maior: '', alt_dhsis_menor: '',
  };

  const { dispatch } = props;
  await dispatch({ type: '@NEW_GRUPO_FILTRO', payload: newPesquisa });
  dispatch({ type: '@SET_GRUPO_FILTRO_FLAG_TRUE' });
};

///////// FICHA /////////////////
/////////////////////////////////
export const getGrupoFicha = async (props, id) => {
  if (id) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmGRUPO/FICHA/${id}`;
    const GrupoFicha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_GRUPO_FICHA', payload: GrupoFicha.data });
  }
};

export const saveGrupo = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmGRUPO/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
    ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmGRUPO/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Grupo', 'Cadastro realizado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      const page = '/financeiro/grupo';
      props.history.push(page);
    }
  }
};

export const resetFieldsGrupoFicha = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_GRUPO_FICHA' });
};

///////// EXCEL /////////////////
/////////////////////////////////
export const getGrupoExcel = async (props) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  ////// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_GRUPO_FILTRO');
  const url = '/TsmGRUPO/EXCEL';

  //const filtro = {
  //chave: props.filtroData.chave,
  //tipo: props.filtroData.tipo,
  //descricao: props.filtroData.descricao,
  //situacao: props.filtroData.situacao,
  //alt_dhsis_maior: sistema.formatData(props.filtroData.alt_dhsis_maior),
  //alt_dhsis_menor: sistema.formatData(props.filtroData.alt_dhsis_menor)
  //}

  //const response = await api.post(url, filtro,
  //{ auth: props.auth })
  //.catch(err => console.log(err));

  const response = await api.post(url, data, { auth: props.auth });

  ////// Download do documento //////
  sistema.getDocument(response);
};

///////// CONSULTA //////////////
/////////////////////////////////
export const getConsultaGrupo = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmGRUPO/FICHA/${id}`;
    const Dados = await api.get(url, { auth: props.auth });

    const Ficha = Dados.data;

    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@SET_GRUPO_CONSULTA', payload: Ficha });
  }
};
