import api from '../../../services/api';
import { showMSG } from '../../../components';
import * as sistema from '../../sistema';

///////// GET RAMO ATIVIDADE - LISTA /////
/////////////////////////////////
export const getRamoAtividadeLista = async (props) => {
  ////// RECEBE DADOS API ////////
  const url = '/TsmRAMOATIVIDADE/LISTA/';
  const Info = await api.get(url, { auth: props.auth });
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@GET_RAMOATIVIDADE_LISTA', payload: Info.data });
};

///////// PAGINA ////////////////
/////////////////////////////////
export const editRamoAtividade = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/tabelas/ramo-atividade/ficha/${id}`;
  props.history.push(page);
};
export const consultaRamoAtividade = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/tabelas/ramo-atividade/consulta/${id}`;
  props.history.push(page);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveRamoAtividadeFiltro = async (props, formDados) => {
  ////// CONSTANTES
  const { dispatch } = props;
  const {
    descricao, situacao, alt_dhsis_maior, alt_dhsis_menor,
  } = formDados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('TABELAS_RAMOATIVIDADE_FILTRO', JSON.stringify(formDados));

  ////// ATIVA FILTRO //////
  if (descricao !== '' || situacao !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '') {
    dispatch({ type: '@SET_RAMOATIVIDADE_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_RAMOATIVIDADE_FILTRO_INATIVO' });
  }

  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_RAMOATIVIDADE_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  sistema.toggleFiltro(props, 'tabela-ramoatividade-filtro');
};
export const setFieldsRamoAtividadeFiltro = (data) => {
  document.getElementById('ramoatividade-filtro-descricao').value = data.descricao;
  document.getElementById('ramoatividade-filtro-situacao').value = data.situacao;
  document.getElementById('ramoatividade-filtro-data-maior').value = data.alt_dhsis_maior.replace(/[/]/g, '-');
  document.getElementById('ramoatividade-filtro-data-menor').value = data.alt_dhsis_menor.replace(/[/]/g, '-');
};

export const resetFieldsRamoAtividadeFiltro = async (props) => {
  document.getElementById('ramoatividade-filtro-descricao').value = '';
  document.getElementById('ramoatividade-filtro-situacao').value = '';
  document.getElementById('ramoatividade-filtro-data-maior').value = '';
  document.getElementById('ramoatividade-filtro-data-menor').value = '';

  const { dispatch } = props;
  dispatch({ type: '@RESET_RAMOATIVIDADE_FILTRO' });

  await saveRamoAtividadeFiltro(props, false);
};

///////// COOKIE ////////////////
/////////////////////////////////
//export const recebeCookie = async (nome, props) => {
//const cookie = sistema.getCookie(nome);
//const { dispatch } = props;

//if (cookie) {
//////// ATUALIZA CAMPOS //////
//var obj = JSON.parse(cookie);
//setFieldsRamoAtividadeFiltro(obj);

//////// ATUALIZA FILTRO //////
//await dispatch({ type: '@NEW_RAMOATIVIDADE_FILTRO', payload: JSON.parse(cookie) });

//////// ATIVA FILTRO //////
//if( obj.descricao !== "" ||  obj.situacao !== "" || obj.alt_dhsis_maior !== "" || obj.alt_dhsis_menor !== "" ) {
//dispatch({ type: '@SET_RAMOATIVIDADE_FILTRO_ATIVO', payload: cookie });
//} else {
//dispatch({ type: '@SET_RAMOATIVIDADE_FILTRO_INATIVO', payload: cookie });
//}
//}
//}

///////// PESQUISA //////////////
/////////////////////////////////
export const pesquisaRamoAtividade = async (props) => {
  const pesquisa = document.getElementById('ramoatividade-pesquisa').value;
  const newPesquisa = {
    chave: pesquisa, descricao: '', situacao: '', alt_dhsis_maior: '', alt_dhsis_menor: '',
  };

  const { dispatch } = props;
  await dispatch({ type: '@NEW_RAMOATIVIDADE_FILTRO', payload: newPesquisa });
  dispatch({ type: '@SET_RAMOATIVIDADE_FILTRO_FLAG_TRUE' });
};

///////// FICHA /////////////////
/////////////////////////////////
export const getRamoAtividadeFicha = async (props, id) => {
  if (id) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmRAMOATIVIDADE/FICHA/${id}`;
    const RamoAtividadeFicha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_RAMOATIVIDADE_FICHA', payload: RamoAtividadeFicha.data });
  }
};

export const saveRamoAtividade = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmRAMOATIVIDADE/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
    ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmRAMOATIVIDADE/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Ramo Atividade', 'Cadastro realizado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      const page = '/tabelas/ramo-atividade';
      props.history.push(page);
    }
  }
};

export const resetFieldsRamoAtividadeFicha = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_RAMOATIVIDADE_FICHA' });
};

///////// EXCEL /////////////////
/////////////////////////////////
export const getRamoAtividadeExcel = async (props) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  ////// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_RAMOATIVIDADE_FILTRO');
  const url = '/TsmRAMOATIVIDADE/EXCEL';

  //const filtro = {
  //chave: props.filtroData.chave,
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
export const getConsultaRamoAtividade = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmRAMOATIVIDADE/FICHA/${id}`;
    const Dados = await api.get(url, { auth: props.auth });
    const Ficha = Dados.data;
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@SET_RAMOATIVIDADE_CONSULTA', payload: Ficha });
  }
};
