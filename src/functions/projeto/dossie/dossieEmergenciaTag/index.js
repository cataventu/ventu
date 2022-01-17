import api from '../../../../services/api';

const dossieEmergenciaTag = async (props, id) => {
  const url = `/TsmDOSSIE/EMERGENCIA/${id}/TAG`;
  const pagina = await api.get(url, { auth: props.auth });
  return pagina;
};

export default dossieEmergenciaTag;
