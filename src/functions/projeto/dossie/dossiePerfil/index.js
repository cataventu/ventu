import api from '../../../../services/api';

const dossiePerfil = async (props, id, _tempcampo_regs) => {
  const url = `/TsmDOSSIE/PERFIL/${id}/${_tempcampo_regs}`;
  const pagina = await api.get(url, { auth: props.auth });
  return pagina;
};

export default dossiePerfil;
