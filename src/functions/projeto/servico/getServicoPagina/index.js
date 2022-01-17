import api from '../../../../services/api';

const getServicoPagina = async (props, id) => {
  const { dispatch } = props;
  const url = '/TsmPROSERVICO/PAGINA';
  const data = { id_projeto: id };
  const Pagina = await api.post(url, data, { auth: props.auth });
  dispatch({ type: '@GET_PROSERVICO_PAGINA', payload: Pagina.data });
  dispatch({ type: '@SET_NOMEPROJETO', payload: Pagina.data.projeto });
  dispatch({ type: '@SET_PROSERVICO_FLAG_TRUE' });
};

export default getServicoPagina;
