import api from '../../../../services/api';

const dossieConsulta = async (props, id) => {
  const url = `/TsmDOSSIE/PROJETO/${id}`;
  const ficha = await api.get(url, { auth: props.auth });
  return ficha.data;
};

export default dossieConsulta;
