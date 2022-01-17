import api from '../../../../services/api';

const getROrcamentoFicha = async (props, id) => {
  const url = `/TsmRORCAMENTO/FICHA/${id}`;
  const ficha = await api.get(url, { auth: props.auth });
  return ficha.data;
};

export default getROrcamentoFicha;
