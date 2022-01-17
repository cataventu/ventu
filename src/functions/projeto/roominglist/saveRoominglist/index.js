import api from '../../../../services/api';
import { showMSG } from '../../../../components';

const saveProServico = async (props, form) => {
  const { id_projeto } = form;
  let response = '';

  ////// Envia requisição API //////
  const url = '/tsmROOMINGLIST/GRAVA';
  response = await api.put(url, form, { auth: props.auth });

  if (response.data.retorno === 0) {
    ////// Notificação falha //////
    showMSG('Error', response.data.msgerro, 'error', 4000);
  } else {
    ////// Notificação Sucesso //////
    showMSG('Projeto', 'Cadastro realizado com sucesso!', 'success', 2500);

    const page = `/projeto/painel/${id_projeto}/rooming-list`;
    props.history.push(page);
  }
  return response.data;
};

export default saveProServico;
