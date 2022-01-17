import api from '../../../../services/api';

const getAeroportoFicha = async (props, id) => {
  const url = `/TsmAEROPORTO/FICHA/${id}`;
  const Ficha = await api.get(url, { auth: props.auth });
  return Ficha.data;
};

export default getAeroportoFicha;
