import api from '../../../../services/api';

const getConsultaAeroporto = async (props, id) => {
  const url = `/TsmAEROPORTO/FICHA/${id}`;
  const Dados = await api.get(url, { auth: props.auth });
  const Ficha = Dados.data;
  return Ficha;
};

export default getConsultaAeroporto;
