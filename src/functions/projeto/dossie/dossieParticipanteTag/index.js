import api from '../../../../services/api';

const dossieParticipanteTag = async (props, id) => {
  const url = `/TsmDOSSIE/PARTICIPANTE/${id}/TAG`;
  const pagina = await api.get(url, { auth: props.auth });
  return pagina;
};

export default dossieParticipanteTag;
