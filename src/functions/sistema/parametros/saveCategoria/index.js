import api from '../../../../services/api';
import { showMSG } from '../../../../components';

const saveCategoria = async (props, form) => {
  let response = '';
  ////// Envia requisição API //////
  const url = '/TsmPARAMETRO/RPARCAT_GRAVA';
  response = await api.put(url, form, { auth: props.auth });

  const { retorno, msgerro } = response.data;

  if (retorno === 0) {
    ////// Notificação falha //////
    showMSG('Error', msgerro, 'error', 2500);
  } else {
    ////// Notificação Sucesso //////
    showMSG('Parâmetro: Categoria', 'Cadastro realizado com sucesso!', 'success', 2500);

    const page = '/sistema/parametros/categoria';
    props.history.push(page);
  }
};

export default saveCategoria;
