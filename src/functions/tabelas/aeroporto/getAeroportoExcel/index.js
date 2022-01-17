import api from '../../../../services/api';
import { showMSG } from '../../../../components';
import { getDocument } from '../../../sistema';

const getAeroportoExcel = async (props) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  ////// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_AEROPORTO_FILTRO');
  const url = '/TsmAEROPORTO/EXCEL';
  const response = await api.post(url, data, { auth: props.auth });

  ////// Download do documento //////
  getDocument(response);
};

export default getAeroportoExcel;
