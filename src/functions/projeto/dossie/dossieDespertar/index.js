import api from '../../../../services/api';

const dossieDespertar = async (props, id) => {
  const url = `/TsmDOSSIE/DESPERTAR/${id}`;
  const pagina = await api.get(url, { auth: props.auth });
  return pagina;
};

export default dossieDespertar;
