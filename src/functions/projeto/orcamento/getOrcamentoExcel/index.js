import api from '../../../../services/api';
import { showMSG } from '../../../../components';
import { getDocument } from '../../../sistema';

const getOrcamentoExcel = async (props, id) => {
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 20000);
  const url = `/TsmORCAMENTO/EXCEL/${id}`;
  const planilha = await api.get(url, { auth: props.auth });
  getDocument(planilha);
};

export default getOrcamentoExcel;
