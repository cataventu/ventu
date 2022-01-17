import api from '../../../../services/api';
import { showMSG } from '../../../../components';
import { getDocument } from '../../index';

const getUsuarioExcel = async (props) => {
  //// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  //// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_USUARIO_FILTRO');
  const url = '/TsmUSUARIO/EXCEL';
  const response = await api.post(url, data, { auth: props.auth });

  //// Download do documento //////
  getDocument(response);
};

export default getUsuarioExcel;
