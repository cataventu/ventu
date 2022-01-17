import api from '../../../../services/api';
import { showMSG } from '../../../../components';
import { checkValidation } from '../../../sistema';

const saveAnexo = async (props, form) => {
  if (checkValidation()) {
    const url = '/TsmANEXO/GRAVA';
    const response = await api.put(url, form, { auth: props.auth });
    const { retorno, msgerro } = response.data;

    if (retorno === 0) {
      showMSG('Error', msgerro, 'error', 2500);
    } else {
      showMSG('Tempos & Movimentos', 'Cadastro realizado com sucesso!', 'success', 2500);

      const { history } = props;
      const { id: id_projeto, idTempoMov } = props.match.params;

      const page = `/projeto/painel/${id_projeto}/tempos-movimentos/ficha/${idTempoMov}/anexo`;
      history.push(page);
    }
  }
};

export default saveAnexo;
