import api from '../../../../services/api';
import { showMSG } from '../../../../components';
import { checkValidation } from '../../../sistema';

const saveAeroporto = async (props, dadosForm) => {
  if (checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmAEROPORTO/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
      ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmAEROPORTO/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Aeroporto', 'Cadastro realizado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      const page = '/tabelas/aeroporto';
      props.history.push(page);
    }
  }
};

export default saveAeroporto;
