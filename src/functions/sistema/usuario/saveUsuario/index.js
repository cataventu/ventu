import api from '../../../../services/api';
import { showMSG } from '../../../../components';

const saveUsuario = async (props, ficha) => {
  const url = '/TsmUSUARIO/GRAVA';
  const response = await api.put(url, ficha, { auth: props.auth });
  const { retorno, msgerro } = response.data;
  if (retorno === 0) {
    showMSG('Error', msgerro, 'error', 2500);
  } else {
    showMSG('Usuário', 'Cadastro realizado com sucesso!', 'success', 2500);
    const page = '/sistema/usuario';
    props.history.push(page);
  }
};

export default saveUsuario;
