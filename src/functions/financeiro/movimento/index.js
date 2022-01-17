import api from '../../../services/api';
import { showMSG } from '../../../components';
import * as sistema from '../../sistema';

import duplicarMovimento from './duplicarMovimento';
import editMovimento from './editMovimento';
import getCambio from './getCambio';
import saveTransferir from './saveTransferir';

export {
  duplicarMovimento,
  editMovimento,
  getCambio,
  saveTransferir,
};

///////// PAGINA ////////////////
/////////////////////////////////

export const agruparMovimento = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/movimento/agrupar/${id}`;
  props.history.push(page);
};

export const parcelarMovimento = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/movimento/parcelar/${id}`;
  props.history.push(page);
};

export const consultaMovimento = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/movimento/consulta/${id}`;
  props.history.push(page);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveMovimentoFiltro = async (props, formDados) => {
  ////// CONSTANTES
  const { dispatch } = props;

  const {
    status, transacao, nome_pessoa, id_projeto, projeto, id_proservico, proservico, subgrupo, conta, moeda, cartaocorp, descricao, situacao, alt_dhsis_maior, alt_dhsis_menor, dt_vencimento_maior, dt_vencimento_menor, agrupamento,
  } = formDados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('TABELAS_MOVIMENTO_FILTRO', JSON.stringify(formDados));

  ////// ATIVA FILTRO //////
  if (status !== '' || transacao !== '' || nome_pessoa !== '' || id_projeto !== '' || projeto !== '' || id_proservico !== '' || proservico !== '' || subgrupo !== '' || conta !== '' || moeda !== '' || cartaocorp !== '' || descricao !== '' || situacao !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '' || dt_vencimento_maior !== '' || dt_vencimento_menor !== '' || agrupamento !== '') {
    dispatch({ type: '@SET_MOVIMENTO_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_MOVIMENTO_FILTRO_INATIVO' });
  }
  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_MOVIMENTO_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  sistema.toggleFiltro(props, 'tabela-movimento-filtro');
};

///////// PESQUISA //////////////
/////////////////////////////////
export const pesquisaMovimento = async (props) => {
  const pesquisa = document.getElementById('movimento-pesquisa').value;
  const newPesquisa = {
    chave: pesquisa, status: '', transacao: '', nome_pessoa: '', id_projeto: '', projeto: '', id_proservico: '', proservico: '', subgrupo: '', conta: '', moeda: '', cartaocorp: '', descricao: '', alt_dhsis_maior: '', alt_dhsis_menor: '', agrupamento: '',
  };

  const { dispatch } = props;
  await dispatch({ type: '@NEW_MOVIMENTO_FILTRO', payload: newPesquisa });
  dispatch({ type: '@SET_MOVIMENTO_FILTRO_FLAG_TRUE' });
};

///////// FICHA /////////////////
/////////////////////////////////
export const getMovimentoFicha = async (props, id) => {
  if (id) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmMOVIMENTO/FICHA/${id}`;

    const movimentoFicha = await api.get(url,
      { auth: props.auth });
      ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_MOVIMENTO_FICHA', payload: movimentoFicha.data });
  }
};

export const saveMovimento = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ///////// Envia requisição API //////
      const url = '/TsmMOVIMENTO/GRAVA';
      response = await api.put(url, dadosForm,
        { auth: props.auth });
      ///////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmMOVIMENTO/INCLUI';
      response = await api.post(url, dadosForm,
        { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Movimento', 'Cadastro realizado com sucesso!', 'success', 2500);
      //////////// REDIRECT //////
      const page = '/financeiro/movimento';
      props.history.push(page);
    }
  }
};

export const resetFieldsMovimentoFicha = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_MOVIMENTO_FICHA' });
  dispatch({ type: '@RESET_AUTOCOMPLETAR' });
};

/////// EXCEL /////////////////
///////////////////////////////
export const getMovimentoExcel = async (props) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  ////// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_MOVIMENTO_FILTRO');
  const url = '/TsmMOVIMENTO/EXCEL';

  const response = await api.post(url, data,
    { auth: props.auth });

  ////// Download do documento //////
  sistema.getDocument(response);
};

   ////// DASHBOARD ////////
   export const getMovimentoDashboard = async (props) => {
    
   
    ////// RECEBE DADOS API ////////
    const url = `/TsmMOVIMENTO/DASHBOARD/`;
    const dashboardListaData = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    await dispatch({ type: '@GET_MOVIMENTO_DASHBOARD', payload: dashboardListaData.data });
  
  };