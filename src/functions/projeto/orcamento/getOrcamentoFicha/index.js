import api from '../../../../services/api';

const getOrcamentoFicha = async (props, id) => {
  const url = `/TsmORCAMENTO/FICHA/${id}`;
  const ficha = await api.get(url, { auth: props.auth });
  return ficha.data;
};

export default getOrcamentoFicha;
