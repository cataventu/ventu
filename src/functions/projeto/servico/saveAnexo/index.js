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
      showMSG('Serviço', 'Cadastro realizado com sucesso!', 'success', 2500);

      const { history } = props;
      const { id: id_projeto, idServico } = props.match.params;

      const page = `/projeto/painel/${id_projeto}/servicos/ficha/${idServico}/anexo`;
      history.push(page);
    }
  }
};

export default saveAnexo;
