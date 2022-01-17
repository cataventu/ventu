import api from '../../../../services/api';

const dossieFornecedor = async (props, id) => {
  const url = `/TsmDOSSIE/FORNECEDOR/${id}`;
  const pagina = await api.get(url, { auth: props.auth });
  return pagina;
};

export default dossieFornecedor;
