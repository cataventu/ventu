import api from '../../../../services/api';

const getAeroportoLista = async (props) => {
  const url = '/TsmAEROPORTO/LISTA';
  const Info = await api.get(url, { auth: props.auth });
  const { dispatch } = props;
  dispatch({ type: '@GET_AEROPORTO_LISTA', payload: Info.data });
};

export default getAeroportoLista;
