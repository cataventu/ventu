import api from '../../../services/api';
import { showMSG } from '../../../components';
import * as sistema from '../../sistema';

///////// PAGINA ////////////////
/////////////////////////////////

export const editCartaoCorp = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/cartao-corporativo/ficha/${id}`;
  props.history.push(page);
};

export const consultaCartaoCorp = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/cartao-corporativo/consulta/${id}`;
  props.history.push(page);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveCartaoCorpFiltro = async (props, formDados) => {
  ////// CONSTANTES
  const { dispatch } = props;
  const { descricao, alt_dhsis_maior, alt_dhsis_menor } = formDados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('TABELAS_CARTAOCORP_FILTRO', JSON.stringify(formDados));

  ////// ATIVA FILTRO //////
  if (descricao !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '') {
    dispatch({ type: '@SET_CARTAOCORP_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_CARTAOCORP_FILTRO_INATIVO' });
  }
  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_CARTAOCORP_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  sistema.toggleFiltro(props, 'tabela-cartao-corp-filtro');
};

///////// FICHA /////////////////
/////////////////////////////////
export const getCartaoCorpFicha = async (props, id) => {
  if (id) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmCARTAOCORP/FICHA/${id}`;
    const ficha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_CARTAOCORP_FICHA', payload: ficha.data });
  }
};

export const saveCartaoCorp = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmCARTAOCORP/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
    ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmCARTAOCORP/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Conta', 'Cadastro realizado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      const page = '/financeiro/cartao-corporativo';
      props.history.push(page);
    }
  }
};

export const resetCartaoCorpFicha = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_CARTAOCORP_FICHA' });
  dispatch({ type: '@RESET_CARTAOCORP_CONSULTA' });
};

///////// EXCEL /////////////////
/////////////////////////////////
export const getCartaoCorpExcel = async (props) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  ////// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_CARTAOCORP_FILTRO');
  const url = '/TsmCARTAOCORP/EXCEL';

  const response = await api.post(url, data, { auth: props.auth });

  ////// Download do documento //////
  sistema.getDocument(response);
};

///////// CONSULTA //////////////
/////////////////////////////////
export const getConsultaCartaoCorp = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmCARTAOCORP/FICHA/${id}`;
    const Dados = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@SET_CARTAOCORP_CONSULTA', payload: Dados.data });
  }
};
