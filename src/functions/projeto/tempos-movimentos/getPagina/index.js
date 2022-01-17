import api from '../../../../services/api';

const getTempoMovPagina = async (props, form) => {
  const url = '/TsmTEMPOMOV/PAGINA';
  const Pagina = await api.post(url, form, { auth: props.auth });
  return Pagina;
};

export default getTempoMovPagina;
