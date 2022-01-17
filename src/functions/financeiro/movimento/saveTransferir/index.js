import api from '../../../../services/api';
import { checkValidation } from '../../../sistema';
import { showMSG } from '../../../../components';

const saveTransferir = async (props, form) => {
  if (checkValidation()) {
    const { history } = props;
    const url = '/TsmMOVIMENTO/GRAVA';
    const { pagar, receber } = form;

    showMSG('Movimento', 'Transferencia realizada com sucesso.', 'sucess', 3000);

    await api.put(url, pagar, { auth: props.auth });
    await api.put(url, receber, { auth: props.auth });

    history.push('/financeiro/movimento');
  }
};

export default saveTransferir;
