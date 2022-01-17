import api from '../../../services/api';
import { showMSG } from '../../../components';
import * as sistema from '../../sistema';

///////// GET PAIS - LISTA /////
////////////////////////////////
export const getPaisLista = async (props) => {
  ////// RECEBE DADOS API ////////
  const url = '/TsmPAIS/LISTA/PAIS';
  const Info = await api.get(url, { auth: props.auth });
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@GET_PAIS_LISTA', payload: Info.data });
};

///////// PAGINA ////////////////
/////////////////////////////////
export const editPais = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/tabelas/pais/ficha/${id}`;
  props.history.push(page);
};

export const consultaPais = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/tabelas/pais/consulta/${id}`;
  props.history.push(page);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const savePaisFiltro = async (props, formDados) => {
  ////// CONSTANTES
  const { dispatch } = props;
  const {
    pais, sigla, nacionalidade, situacao, alt_dhsis_maior, alt_dhsis_menor,
  } = formDados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('TABELAS_PAIS_FILTRO', JSON.stringify(formDados));

  ////// ATIVA FILTRO //////
  if (pais !== '' || sigla !== '' || nacionalidade !== '' || situacao !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '') {
    dispatch({ type: '@SET_PAIS_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_PAIS_FILTRO_INATIVO' });
  }
  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_PAIS_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  sistema.toggleFiltro(props, 'tabela-pais-filtro');
};

export const setFieldsPaisFiltro = (data) => {
  document.getElementById('pais-filtro-pais').value = data.pais;
  document.getElementById('pais-filtro-sigla').value = data.sigla;
  document.getElementById('pais-filtro-nacionalidade').value = data.nacionalidade;
  document.getElementById('pais-filtro-situacao').value = data.situacao;
  document.getElementById('pais-filtro-data-maior').value = data.alt_dhsis_maior.replace(/[/]/g, '-');
  document.getElementById('pais-filtro-data-menor').value = data.alt_dhsis_maior.replace(/[/]/g, '-');
};

export const resetFieldsPaisFiltro = async (props) => {
  document.getElementById('pais-filtro-pais').value = '';
  document.getElementById('pais-filtro-sigla').value = '';
  document.getElementById('pais-filtro-nacionalidade').value = '';
  document.getElementById('pais-filtro-situacao').value = '';
  document.getElementById('pais-filtro-data-maior').value = '';
  document.getElementById('pais-filtro-data-menor').value = '';

  const { dispatch } = props;
  dispatch({ type: '@RESET_PAIS_FILTRO' });

  await savePaisFiltro(props, false);
};

///////// COOKIE ////////////////
/////////////////////////////////
//export const recebeCookie = async (nome, props) => {
//const cookie = sistema.getCookie(nome);
//const { dispatch } = props;

//if (cookie) {
//////// ATUALIZA CAMPOS //////
//var obj = JSON.parse(cookie);
//setFieldsPaisFiltro(obj);

//////// ATUALIZA FILTRO //////
//await dispatch({ type: '@NEW_PAIS_FILTRO', payload: JSON.parse(cookie) });

//////// ATIVA FILTRO //////
//if( obj.pais !== "" || obj.sigla !== "" || obj.nacionalidade !== "" || obj.situacao !== "" || obj.alt_dhsis_maior !== "" || obj.alt_dhsis_menor !== "" ) {
//dispatch({ type: '@SET_PAIS_FILTRO_ATIVO', payload: cookie });
//} else {
//dispatch({ type: '@SET_PAIS_FILTRO_INATIVO', payload: cookie });
//}
//}

//}

///////// PESQUISA //////////////
/////////////////////////////////
export const pesquisaPais = async (props) => {
  const pesquisa = document.getElementById('pais-pesquisa').value;
  const newPesquisa = {
    chave: pesquisa, pais: '', sigla: '', nacionalidade: '', situacao: '', alt_dhsis_maior: '', alt_dhsis_menor: '',
  };

  const { dispatch } = props;
  await dispatch({ type: '@NEW_PAIS_FILTRO', payload: newPesquisa });
  dispatch({ type: '@SET_PAIS_FILTRO_FLAG_TRUE' });
};

///////// FICHA /////////////////
/////////////////////////////////
export const getPaisFicha = async (props, id) => {
  if (id) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmPAIS/FICHA/${id}`;
    const PaisFicha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_PAIS_FICHA', payload: PaisFicha.data });
  }
};

export const savePais = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmPAIS/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
    ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmPAIS/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }
    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Pais', 'Cadastro realizado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      const page = '/tabelas/pais';
      props.history.push(page);
    }
  }
};

export const resetPaisFicha = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_PAIS_FICHA' });
};

///////// EXCEL /////////////////
/////////////////////////////////
export const getPaisExcel = async (props) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  ////// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_PAIS_FILTRO');
  const url = '/TsmPAIS/EXCEL';

  //const filtro = {
  //chave: props.filtroData.chave,
  //pais: props.filtroData.pais,
  //sigla: props.filtroData.sigla,
  //nacionalidade: props.filtroData.nacionalidade,
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
export const getConsultaPais = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmPAIS/FICHA/${id}`;
    const Dados = await api.get(url, { auth: props.auth });
    const Ficha = Dados.data;

    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@SET_CONSULTA_PAIS', payload: Ficha });
  }
};
