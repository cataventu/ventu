import api from '../../../../services/api';

const dossieTM = async (props, id) => {
  const url = `/TsmDOSSIE/TEMPOMOV/${id}`;
  const pagina = await api.get(url, { auth: props.auth });
  return pagina;
};

export default dossieTM;
