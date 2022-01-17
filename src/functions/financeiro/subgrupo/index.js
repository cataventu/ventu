import api from '../../../services/api';
import { showMSG } from '../../../components';
import * as sistema from '../../sistema';

///////// PAGINA ////////////////
/////////////////////////////////
export const editSubGrupo = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/subgrupo/ficha/${id}`;
  props.history.push(page);
};
export const consultaSubGrupo = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/subgrupo/consulta/${id}`;
  props.history.push(page);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveSubGrupoFiltro = async (props, formDados) => {
  ////// CONSTANTES
  const { dispatch } = props;
  const {
    grupo, descricao, situacao, alt_dhsis_maior, alt_dhsis_menor,
  } = formDados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('TABELAS_SUBGRUPO_FILTRO', JSON.stringify(formDados));

  ////// ATIVA FILTRO //////
  if (grupo !== '' || descricao !== '' || situacao !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '') {
    dispatch({ type: '@SET_SUBGRUPO_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_SUBGRUPO_FILTRO_INATIVO' });
  }
  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_SUBGRUPO_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  sistema.toggleFiltro(props, 'tabela-subgrupo-filtro');
};

export const setFieldsSubGrupoFiltro = (data) => {
  document.getElementById('subgrupo-filtro-grupo').value = data.grupo;
  document.getElementById('subgrupo-filtro-descricao').value = data.descricao;
  document.getElementById('subgrupo-filtro-situacao').value = data.situacao;
  document.getElementById('subgrupo-filtro-data-maior').value = data.alt_dhsis_maior.replace(/[/]/g, '-');
  document.getElementById('subgrupo-filtro-data-menor').value = data.alt_dhsis_menor.replace(/[/]/g, '-');
};

export const resetFieldsSubGrupoFiltro = async (props) => {
  document.getElementById('subgrupo-filtro-grupo').value = '';
  document.getElementById('subgrupo-filtro-descricao').value = '';
  document.getElementById('subgrupo-filtro-situacao').value = '';
  document.getElementById('subgrupo-filtro-data-maior').value = '';
  document.getElementById('subgrupo-filtro-data-menor').value = '';

  const { dispatch } = props;
  dispatch({ type: '@RESET_SUBGRUPO_FILTRO' });

  await saveSubGrupoFiltro(props, false);
};

///////// COOKIE ////////////////
/////////////////////////////////
//export const recebeCookie = async (nome, props) => {
//const cookie = sistema.getCookie(nome);
//const { dispatch } = props;

//if (cookie) {
//////// ATUALIZA CAMPOS //////
//var obj = JSON.parse(cookie);
//setFieldsSubGrupoFiltro(obj);

//////// ATUALIZA FILTRO //////
//await dispatch({ type: '@NEW_SUBGRUPO_FILTRO', payload: JSON.parse(cookie) });

//////// ATIVA FILTRO //////
//if( obj.grupo !== "" || obj.descricao !== "" || obj.situacao !== "" || obj.alt_dhsis_maior !== "" || obj.alt_dhsis_menor !== "" ) {
//dispatch({ type: '@SET_SUBGRUPO_FILTRO_ATIVO', payload: cookie });
//} else {
//dispatch({ type: '@SET_SUBGRUPO_FILTRO_INATIVO', payload: cookie });
//}
//}
//}

///////// PESQUISA //////////////
/////////////////////////////////
export const pesquisaSubGrupo = async (props) => {
  const pesquisa = document.getElementById('subgrupo-pesquisa').value;
  const newPesquisa = {
    chave: pesquisa, grupo: '', descricao: '', situacao: '', alt_dhsis_maior: '', alt_dhsis_menor: '',
  };

  const { dispatch } = props;
  await dispatch({ type: '@NEW_SUBGRUPO_FILTRO', payload: newPesquisa });
  dispatch({ type: '@SET_SUBGRUPO_FILTRO_FLAG_TRUE' });
};

///////// FICHA /////////////////
/////////////////////////////////
export const getSubGrupoFicha = async (props, id) => {
  if (id) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmSUBGRUPO/FICHA/${id}`;
    const subGrupoFicha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_SUBGRUPO_FICHA', payload: subGrupoFicha.data });
  }
};

export const saveSubGrupo = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmSUBGRUPO/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
    ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmSUBGRUPO/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }
    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('SubGrupo', 'Cadastro realizado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      const page = '/financeiro/subgrupo';
      props.history.push(page);
    }
  }
};
export const resetFieldsSubGrupoFicha = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_SUBGRUPO_FICHA' });
};

///////// EXCEL /////////////////
/////////////////////////////////
export const getSubGrupoExcel = async (props) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  ////// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_SUBGRUPO_FILTRO');
  const url = '/TsmSUBGRUPO/EXCEL';

  //const filtro = {
  //chave: props.filtroData.chave,
  //grupo: props.filtroData.grupo,
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
export const getConsultaSubGrupo = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmSUBGRUPO/FICHA/${id}`;
    const Dados = await api.get(url, { auth: props.auth });

    const Ficha = Dados.data;

    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@SET_SUBGRUPO_CONSULTA', payload: Ficha });
  }
};
