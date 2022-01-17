import api from '../../../services/api';
import { showMSG } from '../../../components';
import * as sistema from '../../sistema';

///////// PAGINA ////////////////
/////////////////////////////////

export const editCartao = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/tabelas/tipo-cartao/ficha/${id}`;
  props.history.push(page);
};

export const consultaCartao = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/tabelas/tipo-cartao/consulta/${id}`;
  props.history.push(page);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveCartaoFiltro = async (props, formDados) => {
  ////// CONSTANTES
  const { dispatch } = props;
  const {
    tipo, descricao, situacao, alt_dhsis_maior, alt_dhsis_menor,
  } = formDados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('TABELAS_CARTAO_FILTRO', JSON.stringify(formDados));

  ////// ATIVA FILTRO //////
  if (tipo !== '' || descricao !== '' || situacao !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '') {
    dispatch({ type: '@SET_CARTAO_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_CARTAO_FILTRO_INATIVO' });
  }

  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_CARTAO_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  sistema.toggleFiltro(props, 'tabela-cartao-filtro');
};

export const setFieldsCartaoFiltro = (data) => {
  document.getElementById('cartao-filtro-tipo').getElementsByTagName('option')[0].selected = 'selected';
  document.getElementById('cartao-filtro-descricao').value = data.descricao;
  document.getElementById('cartao-filtro-situacao').value = data.situacao;
  document.getElementById('cartao-filtro-data-maior').value = data.alt_dhsis_maior.replace(/[/]/g, '-');
  document.getElementById('cartao-filtro-data-menor').value = data.alt_dhsis_menor.replace(/[/]/g, '-');
};

export const resetFieldsCartaoFiltro = async (props) => {
  document.getElementById('cartao-filtro-tipo').value = '';
  document.getElementById('cartao-filtro-descricao').value = '';
  document.getElementById('cartao-filtro-situacao').value = '';
  document.getElementById('cartao-filtro-data-maior').value = '';
  document.getElementById('cartao-filtro-data-menor').value = '';

  const { dispatch } = props;
  dispatch({ type: '@RESET_CARTAO_FILTRO' });

  await saveCartaoFiltro(props, false);
};

///////// PESQUISA //////////////
/////////////////////////////////
export const pesquisaCartao = async (props) => {
  const pesquisa = document.getElementById('cartao-pesquisa').value;
  const newPesquisa = {
    chave: pesquisa, tipo: '', descricao: '', situacao: '', alt_dhsis_maior: '', alt_dhsis_menor: '',
  };

  const { dispatch } = props;
  await dispatch({ type: '@NEW_CARTAO_FILTRO', payload: newPesquisa });
  dispatch({ type: '@SET_CARTAO_FILTRO_FLAG_TRUE' });
};

///////// FICHA /////////////////
/////////////////////////////////
export const getCartaoFicha = async (props, id) => {
  if (id) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmTIPOCARTAO/FICHA/${id}`;
    const cartaoFicha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_CARTAO_FICHA', payload: cartaoFicha.data });
  }
};

export const saveCartao = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;

    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmTIPOCARTAO/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
    ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmTIPOCARTAO/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Cartão', 'Cadastro realizado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      const page = '/tabelas/tipo-cartao';
      props.history.push(page);
    }
  }
};

export const resetCartaoFicha = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_CARTAO_FICHA' });
};

///////// EXCEL /////////////////
/////////////////////////////////
export const getCartaoExcel = async (props) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  ////// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_TIPOCARTAO_FILTRO');
  const url = '/TsmTIPOCARTAO/EXCEL';

  const response = await api.post(url, data, { auth: props.auth });

  ////// Download do documento //////
  sistema.getDocument(response);
};
///////// CONSULTA //////////////
/////////////////////////////////
export const getConsultaCartao = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmTIPOCARTAO/FICHA/${id}`;
    const Dados = await api.get(url, { auth: props.auth });
    const Ficha = Dados.data;
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@SET_CARTAO_CONSULTA', payload: Ficha });
  }
};
