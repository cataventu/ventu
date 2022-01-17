import api from '../../../../services/api';
import { showMSG } from '../../../../components';
import { getDocument } from '../../../sistema';

///////// EXCEL /////////////////
/////////////////////////////////
export const getFechamentoMensalExcel = async (props, data) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 30000);

  ////// Envia requisição API //////
  const url = '/TsmFIN_FECMENSAL/EXCEL';

  const response = await api.post(url, data,
    { auth: props.auth });

  ////// Download do documento //////
  getDocument(response);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveFechamentoMensalFiltro = async (props) => {
  const inputContas = document.getElementById('fechamento-mensal-contas');

  const arrayIDContas = [];
  inputContas.forEach((item) => {
    if (item.selected) {
      arrayIDContas.push(item.value);
    }
  });

  const newIDContas = JSON.stringify(arrayIDContas).replace(/","/g, ',').replace('[', '').replace(']', '')
    .replace(/"/g, '');

  const newData = parseInt(document.getElementById('fechamento-mensal-data').value, 10);

  const newMes = parseInt(document.getElementById('fechamento-mensal-mes').value, 10);
  const newAno = parseInt(document.getElementById('fechamento-mensal-ano').value, 10);

  ////// ATUALIZA STORE //////
  const filtroData = {
    id_contas: newIDContas,
    data: newData,
    mes: newMes,
    ano: newAno,
  };

  ////// DOWNLOAD EXCEL
  getFechamentoMensalExcel(props, filtroData);
};
