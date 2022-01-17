import api from '../../../services/api';
import { showMSG } from '../../../components';
import {
  getDados, hideModalFixo, toggleFiltro, formatDataInput, checkValidation, getDocument,
} from '../../sistema';

///////// PAGINA ////////////////
/////////////////////////////////

export const editFixo = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/fixo/ficha/${id}`;
  props.history.push(page);
};
export const consultaFixo = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/fixo/consulta/${id}`;
  props.history.push(page);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveFixoFiltro = async (props, formDados) => {
  ////// CONSTANTES
  const { dispatch } = props;
  const {
    transacao, nome_pessoa, alt_dhsis_maior, alt_dhsis_menor,
  } = formDados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('TABELAS_FIXO_FILTRO', JSON.stringify(formDados));

  ////// ATIVA FILTRO //////
  if (transacao !== '' || nome_pessoa !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '') {
    dispatch({ type: '@SET_FIXO_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_FIXO_FILTRO_INATIVO' });
  }
  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_FIXO_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  toggleFiltro(props, 'tabela-fixo-filtro');
};

export const setFieldsFixoFiltro = (data) => {
  document.getElementById('fixo-filtro-transacao').value = data.transacao;
  document.getElementById('fixo-filtro-nome-pessoa').value = data.nome_pessoa;
  document.getElementById('fixo-filtro-data-maior').value = formatDataInput(data.alt_dhsis_maior);
  document.getElementById('fixo-filtro-data-menor').value = formatDataInput(data.alt_dhsis_menor);
};

export const resetFieldsFixoFiltro = async (props) => {
  document.getElementById('fixo-filtro-transacao').value = '';
  document.getElementById('fixo-filtro-nome-pessoa').value = '';
  document.getElementById('fixo-filtro-data-maior').value = '';
  document.getElementById('fixo-filtro-data-menor').value = '';

  const { dispatch } = props;
  dispatch({ type: '@RESET_FIXO_FILTRO' });

  await saveFixoFiltro(props, false);
};

///////// PESQUISA //////////////
/////////////////////////////////
export const pesquisaFixo = async (props) => {
  const pesquisa = document.getElementById('fixo-pesquisa').value;
  const newPesquisa = {
    chave: pesquisa, transacao: '', nome_pessoa: '', alt_dhsis_maior: '', alt_dhsis_menor: '',
  };

  const { dispatch } = props;
  await dispatch({ type: '@NEW_FIXO_FILTRO', payload: newPesquisa });
  dispatch({ type: '@SET_FIXO_FILTRO_FLAG_TRUE' });
};

///////// FICHA /////////////////
/////////////////////////////////
export const getFixoFicha = async (props, id) => {
  if (id) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmFIXO/FICHA/${id}`;
    const fixoFicha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_FIXO_FICHA', payload: fixoFicha.data });
  }
};

export const saveFixo = async (props, dadosForm) => {
  if (checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmFIXO/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
    ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmFIXO/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Fixo', 'Cadastro realizado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      const page = '/financeiro/fixo';
      props.history.push(page);
    }
  }
};

export const resetFieldsFixoFicha = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_FIXO_FICHA' });
};

///////// EXCEL /////////////////
/////////////////////////////////
export const getFixoExcel = async (props) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  ////// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_FIXO_FILTRO');
  const url = '/TsmFIXO/EXCEL';

  const response = await api.post(url, data, { auth: props.auth });

  ////// Download do documento //////
  getDocument(response);
};

///////// CONSULTA //////////////
/////////////////////////////////
export const getConsultaFixo = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmFIXO/FICHA/${id}`;
    const Dados = await api.get(url, { auth: props.auth });

    const Ficha = Dados.data;

    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@SET_FIXO_CONSULTA', payload: Ficha });
  }
};

///////// GERAR FIXO ////////////
/////////////////////////////////
export const gerarFixo = async (props) => {
  ////// RECEBE DADOS API ////////
  const { id } = props.user;
  const url = `/TsmFIXO/GERA/${id}`;

  const response = await api.get(url, { auth: props.auth });

  if (response.data.retorno === 0) {
    ////// Notificação falha //////
    showMSG('Error', response.data.msgerro, 'error', 2500);
  } else {
    ////// Notificação Sucesso //////
    getDados(props, '/TsmPARAMETRO/FIXO_FICHA', '@GET_PARAM_FIXO_FICHA');
    showMSG('Fixo', 'Movimentos gerados com sucesso!', 'success', 2500);
  }

  hideModalFixo(props);
};
