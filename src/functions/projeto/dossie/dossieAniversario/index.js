import api from '../../../../services/api';

const dossieAniversario = async (props, id) => {
  const url = `/TsmDOSSIE/ANIVERSARIO/${id}`;
  const pagina = await api.get(url, { auth: props.auth });
  return pagina;
};

export default dossieAniversario;
