import api from '../../../../services/api';

const getOrcamentoPagina = async (props, form) => {
  const url = '/TsmORCAMENTO/PAGINA';
  const Pagina = await api.post(url, form, { auth: props.auth });
  return Pagina.data;
};

export default getOrcamentoPagina;
