import api from '../../../services/api';
import { showMSG } from '../../../components';
import * as sistema from '../../sistema';

///////// GET MUNICIPIO - LISTA /////
/////////////////////////////////
export const getMunicipioLista = async (props) => {
  ////// RECEBE DADOS API ////////
  const url = '/TsmMUNICIPIO/LISTA/';
  const Info = await api.get(url, { auth: props.auth });
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@GET_MUNICIPIO_LISTA', payload: Info.data });
};

///////// PAGINA ////////////////
/////////////////////////////////

export const editMunicipio = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/tabelas/municipio/ficha/${id}`;
  props.history.push(page);
};

export const consultaMunicipio = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/tabelas/municipio/consulta/${id}`;
  props.history.push(page);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveMunicipioFiltro = async (props, formDados) => {
  ////// CONSTANTES
  const { dispatch } = props;
  const {
    pais, municipio, uf, situacao, alt_dhsis_maior, alt_dhsis_menor,
  } = formDados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('TABELAS_MUNICIPIO_FILTRO', JSON.stringify(formDados));

  ////// ATIVA FILTRO //////
  if (pais !== '' || municipio !== '' || uf !== '' || situacao !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '') {
    dispatch({ type: '@SET_MUNICIPIO_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_MUNICIPIO_FILTRO_INATIVO' });
  }

  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_MUNICIPIO_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  sistema.toggleFiltro(props, 'tabela-municipio-filtro');
};

export const setFieldsMunicipioFiltro = (data) => {
  document.getElementById('municipio-filtro-pais').value = data.pais;
  document.getElementById('municipio-filtro-municipio').value = data.municipio;
  document.getElementById('municipio-filtro-uf').value = data.uf;
  document.getElementById('municipio-filtro-situacao').value = data.situacao;
  document.getElementById('municipio-filtro-data-maior').value = data.alt_dhsis_maior.replace(/[/]/g, '-');
  document.getElementById('municipio-filtro-data-menor').value = data.alt_dhsis_menor.replace(/[/]/g, '-');
};

export const resetFieldsMunicipioFiltro = async (props) => {
  document.getElementById('municipio-filtro-pais').value = '';
  document.getElementById('municipio-filtro-municipio').value = '';
  document.getElementById('municipio-filtro-uf').value = '';
  document.getElementById('municipio-filtro-situacao').value = '';
  document.getElementById('municipio-filtro-data-maior').value = '';
  document.getElementById('municipio-filtro-data-menor').value = '';

  const { dispatch } = props;
  dispatch({ type: '@RESET_MUNICIPIO_FILTRO' });

  await saveMunicipioFiltro(props, false);
};

/////////// COOKIE ////////////////
///////////////////////////////////
//export const recebeCookie = async (nome, props) => {
//const cookie = sistema.getCookie(nome);
//const { dispatch } = props;

//if (cookie) {
//////// ATUALIZA CAMPOS //////
//var obj = JSON.parse(cookie);
//setFieldsMunicipioFiltro(obj);

//////// ATUALIZA FILTRO //////
//await dispatch({ type: '@NEW_MUNICIPIO_FILTRO', payload: JSON.parse(cookie) });

//////// ATIVA FILTRO //////
//if( obj.pais !== "" || obj.municipio !== "" || obj.uf !== "" || obj.situacao !== "" || obj.alt_dhsis_maior !== "" || obj.alt_dhsis_menor !== "" ) {
//dispatch({ type: '@SET_MUNICIPIO_FILTRO_ATIVO', payload: cookie });
//} else {
//dispatch({ type: '@SET_MUNICIPIO_FILTRO_INATIVO', payload: cookie });
//}
//}
//}
///////// PESQUISA //////////////
/////////////////////////////////
export const pesquisaMunicipio = async (props) => {
  const pesquisa = document.getElementById('municipio-pesquisa').value;
  const newPesquisa = {
    chave: pesquisa, pais: '', municipio: '', uf: '', situacao: '', alt_dhsis_maior: '', alt_dhsis_menor: '',
  };

  const { dispatch } = props;
  await dispatch({ type: '@NEW_MUNICIPIO_FILTRO', payload: newPesquisa });
  dispatch({ type: '@SET_MUNICIPIO_FILTRO_FLAG_TRUE' });
};

///////// FICHA /////////////////
/////////////////////////////////
export const getMunicipioFicha = async (props, id) => {
  if (id) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmMUNICIPIO/FICHA/${id}`;
    const MunicipioFicha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_MUNICIPIO_FICHA', payload: MunicipioFicha.data });
  }
};
export const saveMunicipio = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
    ////// Envia requisição API //////
      const url = '/TsmMUNICIPIO/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
      ////// NOVO REGISTRO //////
    } else {
    ////// Envia requisição API //////
      const url = '/TsmMUNICIPIO/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
    ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
    ////// Notificação Sucesso //////
      showMSG('Municipio', 'Cadastro realizado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      const page = '/tabelas/municipio';
      props.history.push(page);
    }
  }
};

export const resetMunicipioFicha = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_MUNICIPIO_FICHA' });
};

///////// EXCEL /////////////////
/////////////////////////////////
export const getMunicipioExcel = async (props) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  ////// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_MUNICIPIO_FILTRO');
  const url = '/TsmMUNICIPIO/EXCEL';

  //const filtro = {
  //chave: props.filtroData.chave,
  //pais: props.filtroData.pais,
  //municipio: props.filtroData.municipio,
  //uf: props.filtroData.uf,
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
export const getConsultaMunicipio = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmMUNICIPIO/FICHA/${id}`;
    const Dados = await api.get(url, { auth: props.auth });
    const Ficha = Dados.data;
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@SET_MUNICIPIO_CONSULTA', payload: Ficha });
  }
};
