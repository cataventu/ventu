import api from '../../../../services/api';
import { showMSG } from '../../../../components';

const saveReplicar = async (props, id_Origem, id_Destino) => {
  const UserID = props.user.id;

  const data = {
    usuario_origem: parseInt(id_Origem, 10),
    usuario_destino: parseInt(id_Destino, 10),
    usuario: UserID,
  };

  ////// Envia requisição API //////
  const url = '/TsmUSUARIO/REPLICA';
  const response = await api.post(url, data, { auth: props.auth });

  if (response.data.retorno === 0) {
    ////// Notificação falha //////
    showMSG('Error', response.data.msgerro, 'error', 2500);
  } else {
    ////// Notificação Sucesso //////
    showMSG('Usuário', 'Permissões replicadas com sucesso!', 'success', 2500);
    props.history.push('/sistema/usuario');
  }
};

export default saveReplicar;
