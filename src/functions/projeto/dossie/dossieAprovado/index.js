import api from '../../../../services/api';

const dossieAprovado = async (props, id) => {
  const url = `/TsmDOSSIE/APROVADO/${id}`;
  const ficha = await api.get(url, { auth: props.auth });
  return ficha.data;
};

export default dossieAprovado;
