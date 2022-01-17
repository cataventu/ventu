import api from '../../../../services/api';

const getOrcamentoAprovado = async (props, id) => {
  const url = `/TsmORCAMENTO/APROVADO/${id}`;
  const ficha = await api.get(url, { auth: props.auth });
  return ficha.data;
};

export default getOrcamentoAprovado;
