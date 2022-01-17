import api from '../../../../services/api';

const dossieParticipante_par_nome_completo = async (props, id) => {
  const url = `/TsmDOSSIE/PARTICIPANTE/${id}/PAR_NOME_COMPLETO`;
  const pagina = await api.get(url, { auth: props.auth });
  return pagina;
};

export default dossieParticipante_par_nome_completo;
