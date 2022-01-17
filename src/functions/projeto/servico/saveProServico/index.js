import api from '../../../../services/api';
import { showMSG } from '../../../../components';
/// import { checkValidation } from '../../../sistema';

const saveProServico = async (props, form) => {
  //if ( checkValidation() ) {
  const { id, id_projeto } = form;

  let Id;
  let response;

  id === '' || Number.isNaN(id) ? Id = 0 : Id = id;

  ////// EDITAR //////
  if (Id > 0) {
    ////// Envia requisição API //////
    const url = '/TsmPROSERVICO/GRAVA';
    response = await api.put(url, form, { auth: props.auth });
    ////// NOVO REGISTRO //////
  } else {
    ////// Envia requisição API //////
    const url = '/TsmPROSERVICO/INCLUI';
    response = await api.post(url, form, { auth: props.auth });
  }

  if (response.data.retorno === 0) {
    ////// Notificação falha //////
    showMSG('Error', response.data.msgerro, 'error', 4000);
  } else {
    ////// Notificação Sucesso //////
    showMSG('Projeto', 'Cadastro realizado com sucesso!', 'success', 2500);

    const page = `/projeto/painel/${id_projeto}/servicos`;
    props.history.push(page);
  }
  return response.data;
  //}
};

export default saveProServico;
