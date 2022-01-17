import api from '../../../../services/api';

const dossieAereo = async (props, id) => {
  const url = `/TsmDOSSIE/AEREO/${id}`;
  const pagina = await api.get(url, { auth: props.auth });
  return pagina;
};

export default dossieAereo;
