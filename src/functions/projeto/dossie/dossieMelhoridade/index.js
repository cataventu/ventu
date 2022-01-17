import api from '../../../../services/api';

const dossieMelhoridade = async (props, id) => {
  const url = `/TsmDOSSIE/MELHORIDADE/${id}`;
  const pagina = await api.get(url, { auth: props.auth });
  return pagina;
};

export default dossieMelhoridade;
