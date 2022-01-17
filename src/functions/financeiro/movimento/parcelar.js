import api from '../../../services/api';
import { showMSG } from '../../../components';
//import * as sistema from '../../sistema';

///////// FICHA /////////////////
/////////////////////////////////
export const getParcelamentoFicha = async (props, id) => {
  if (id) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmMOVIMENTO/PARCELAMENTO_FICHA/${id}`;

    const ficha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_PARCELAMENTO_FICHA', payload: ficha.data });
  }
};

export const resetParcelamentoFicha = async (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_PARCELAMENTO_FICHA' });
};

export const saveParcelar = async (props, dadosForm) => {
  let { id } = dadosForm;
  if (id === '' || Number.isNaN(id)) { id = '0'; }

  ///////// Envia requisição API //////
  const url = '/TsmMOVIMENTO/PARCELAMENTO_GRAVA';
  const response = await api.put(url, dadosForm, { auth: props.auth });
  if (response.data.retorno === 0) {
    ////////// Notificação falha //////
    showMSG('Error', response.data.msgerro, 'error', 2500);
  } else {
    ////// Notificação Sucesso //////
    showMSG('Parcelar', 'Cadastro realizado com sucesso!', 'success', 2500);
    //////////// REDIRECT //////
    const page = '/financeiro/movimento';
    props.history.push(page);
  }
};
