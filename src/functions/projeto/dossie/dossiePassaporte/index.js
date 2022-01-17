import api from '../../../../services/api';

const dossiePassaporte = async (props, id) => {
  const url = `/TsmDOSSIE/PASSAPORTE/${id}`;
  const pagina = await api.get(url, { auth: props.auth });
  return pagina;
};

export default dossiePassaporte;
