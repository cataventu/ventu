import api from '../../../../services/api';
import { showMSG } from '../../../../components';
import { getDocument } from '../../../sistema';

///////// EXCEL /////////////////
/////////////////////////////////
export const getFechamentoAnualExcel = async (props, data) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 30000);

  ////// Envia requisição API //////
  const url = '/TsmFIN_FECANUAL/EXCEL';

  const response = await api.post(url, data,
    { auth: props.auth });

  ////// Download do documento //////
  getDocument(response);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveFechamentoAnualFiltro = async (props) => {
  const inputContas = document.getElementById('fechamento-anual-contas');

  const arrayIDContas = [];
  inputContas.forEach((item) => {
    if (item.selected) {
      arrayIDContas.push(item.value);
    }
  });

  const newIDContas = JSON.stringify(arrayIDContas).replace(/","/g, ',').replace('[', '').replace(']', '')
    .replace(/"/g, '');

  const newData = parseInt(document.getElementById('fechamento-anual-data').value, 10);
  const newAno = parseInt(document.getElementById('fechamento-anual-ano').value, 10);

  ////// ATUALIZA STORE //////
  const filtroData = {
    id_contas: newIDContas,
    data: newData,
    ano: newAno,
  };

  ////// DOWNLOAD EXCEL
  getFechamentoAnualExcel(props, filtroData);
};
